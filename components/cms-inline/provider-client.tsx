"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useCmsInlineSessionOptional } from "@/components/cms-inline/session-client";
import type { CmsChange } from "@/lib/cms/types";
import { getByPath, setByPath, updateListAtPath } from "@/lib/cms/revision-engine/diff";

type SaveStatus = "idle" | "unsaved" | "saving" | "saved" | "failed" | "published";

type CmsInlineContextValue = {
  isEditMode: boolean;
  toggleEditMode: () => void;
  pageSlug: string;
  version: number;
  content: Record<string, unknown>;
  status: SaveStatus;
  setLinkEditMode: (value: boolean) => void;
  isLinkEditMode: boolean;
  setField: (change: CmsChange) => void;
  addListItem: (path: string, value: unknown) => void;
  updateListItem: (path: string, index: number, value: unknown) => void;
  removeListItem: (path: string, index: number) => void;
  moveListItem: (path: string, fromIndex: number, toIndex: number) => void;
  getField: (path: string) => unknown;
  save: () => Promise<void>;
  reset: () => void;
  publish: () => Promise<void>;
};

const CmsInlineContext = createContext<CmsInlineContextValue | null>(null);

export function CmsInlineProvider({
  initialContent,
  pageSlug,
  scopeKey,
  syncChromeOnSave = false,
  initialVersion,
  initialEditMode = false,
  children,
}: {
  initialContent: Record<string, unknown>;
  pageSlug: string;
  scopeKey?: string;
  syncChromeOnSave?: boolean;
  initialVersion: number;
  initialEditMode?: boolean;
  children: React.ReactNode;
}) {
  const session = useCmsInlineSessionOptional();
  const resolvedScopeKey = scopeKey ?? `page-${pageSlug}`;
  const [isEditModeLocal, setIsEditMode] = useState(initialEditMode);
  const [isLinkEditModeLocal, setLinkEditMode] = useState(false);
  const [content, setContent] = useState(initialContent);
  const [baseContent, setBaseContent] = useState(initialContent);
  const [version, setVersion] = useState(initialVersion);
  const [changes, setChanges] = useState<CmsChange[]>([]);
  const [status, setStatus] = useState<SaveStatus>("idle");
  const isEditMode = session?.isEditMode ?? isEditModeLocal;
  const isLinkEditMode = session?.isLinkEditMode ?? isLinkEditModeLocal;

  const upsertChange = (change: CmsChange, identity: string) => {
    setChanges((prev) => {
      const rest = prev.filter((item) => {
        const key =
          item.op === "set"
            ? `set:${item.path}`
            : item.op === "list_add"
              ? `list_add:${item.path}:${JSON.stringify(item.value)}`
              : item.op === "list_update"
                ? `list_update:${item.path}:${item.index}`
                : item.op === "list_remove"
                  ? `list_remove:${item.path}:${item.index}`
                  : `list_move:${item.path}:${item.fromIndex}:${item.toIndex}`;
        return key !== identity;
      });
      return [...rest, change];
    });
  };

  const setField = (change: CmsChange) => {
    if (change.op !== "set") return;
    setContent((prev) => setByPath(prev, change.path, change.value));
    upsertChange(change, `set:${change.path}`);
    setStatus("unsaved");
  };

  const addListItem = (path: string, value: unknown) => {
    setContent((prev) => updateListAtPath(prev, path, { kind: "add", value }));
    upsertChange({ op: "list_add", path, value }, `list_add:${path}:${JSON.stringify(value)}`);
    setStatus("unsaved");
  };

  const updateListItem = (path: string, index: number, value: unknown) => {
    setContent((prev) => updateListAtPath(prev, path, { kind: "update", index, value }));
    upsertChange({ op: "list_update", path, index, value }, `list_update:${path}:${index}`);
    setStatus("unsaved");
  };

  const removeListItem = (path: string, index: number) => {
    setContent((prev) => updateListAtPath(prev, path, { kind: "remove", index }));
    upsertChange({ op: "list_remove", path, index }, `list_remove:${path}:${index}`);
    setStatus("unsaved");
  };

  const moveListItem = (path: string, fromIndex: number, toIndex: number) => {
    setContent((prev) => updateListAtPath(prev, path, { kind: "move", fromIndex, toIndex }));
    upsertChange({ op: "list_move", path, fromIndex, toIndex }, `list_move:${path}:${fromIndex}:${toIndex}`);
    setStatus("unsaved");
  };

  const reset = useCallback(() => {
    setContent(baseContent);
    setChanges([]);
    setStatus("idle");
  }, [baseContent]);

  const saveSelf = useCallback(async () => {
    if (!changes.length) return true;
    setStatus("saving");

    try {
      const response = await fetch(`/api/admin/cms/pages/${pageSlug}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ expectedVersion: version, changes }),
      });

      const payload = (await response.json()) as { data?: { version?: number; content?: Record<string, unknown>; skipped?: boolean } };
      if (!response.ok) throw new Error("save-failed");
      if (payload.data?.skipped) {
        setStatus("saved");
        return true;
      }
      setVersion(payload.data?.version ?? version + 1);
      if (payload.data?.content) {
        setContent(payload.data.content);
        setBaseContent(payload.data.content);
      }
      setChanges([]);
      setStatus("saved");
      return true;
    } catch {
      setStatus("failed");
      return false;
    }
  }, [changes, pageSlug, version]);

  const save = useCallback(async () => {
    if (!changes.length && !(session && syncChromeOnSave)) {
      toast.info("No changes to save.");
      return;
    }

    if (session && syncChromeOnSave) {
      const result = await session.saveCascade(resolvedScopeKey);
      if (result) {
        toast.success("Changes saved successfully.");
      } else {
        setStatus("failed");
        toast.error("Failed to save changes.");
      }
      return;
    }

    const result = await saveSelf();
    if (result) {
      toast.success("Changes saved successfully.");
    } else {
      toast.error("Failed to save changes.");
    }
  }, [changes.length, resolvedScopeKey, saveSelf, session, syncChromeOnSave]);

  const publish = useCallback(async () => {
    setStatus("saving");
    try {
      const response = await fetch(`/api/admin/cms/pages/${pageSlug}/publish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ advancedMode: false }),
      });
      if (!response.ok) throw new Error("publish-failed");
      setStatus("published");
    } catch {
      setStatus("failed");
    }
  }, [pageSlug]);

  useEffect(() => {
    if (!session) return;
    session.registerScope(resolvedScopeKey, {
      save: saveSelf,
      reset,
      isDirty: () => changes.length > 0,
      getStatus: () => status,
    });
    return () => {
      session.unregisterScope(resolvedScopeKey);
    };
  }, [changes.length, reset, resolvedScopeKey, saveSelf, session, status]);

  const value = useMemo<CmsInlineContextValue>(
    () => ({
      isEditMode,
      toggleEditMode: () => {
        if (session) {
          session.toggleEditMode();
          return;
        }
        setIsEditMode((prev) => !prev);
      },
      pageSlug,
      version,
      content,
      status,
      isLinkEditMode,
      setLinkEditMode: (value) => {
        if (session) {
          session.setLinkEditMode(value);
          return;
        }
        setLinkEditMode(value);
      },
      setField,
      addListItem,
      updateListItem,
      removeListItem,
      moveListItem,
      getField: (path) => getByPath(content, path),
      save,
      reset,
      publish,
    }),
    [isEditMode, pageSlug, version, content, status, isLinkEditMode, session, save, reset, publish],
  );

  return <CmsInlineContext.Provider value={value}>{children}</CmsInlineContext.Provider>;
}

export function useCmsInline() {
  const context = useContext(CmsInlineContext);
  if (!context) {
    throw new Error("useCmsInline must be used inside CmsInlineProvider");
  }
  return context;
}

export function useCmsInlineOptional() {
  return useContext(CmsInlineContext);
}
