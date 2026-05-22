"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

export const CMS_CHROME_SCOPE_KEY = "chrome-home";

type SaveStatus = "idle" | "unsaved" | "saving" | "saved" | "failed" | "published";

type CmsScopeControls = {
  save: () => Promise<boolean>;
  reset: () => void;
  isDirty: () => boolean;
  getStatus: () => SaveStatus;
};

type CmsInlineSessionValue = {
  isEditMode: boolean;
  toggleEditMode: () => void;
  setEditMode: (value: boolean) => void;
  isLinkEditMode: boolean;
  setLinkEditMode: (value: boolean) => void;
  registerScope: (scopeKey: string, controls: CmsScopeControls) => void;
  unregisterScope: (scopeKey: string) => void;
  saveCascade: (primaryScopeKey: string) => Promise<boolean>;
};

const CmsInlineSessionContext = createContext<CmsInlineSessionValue | null>(null);

export function CmsInlineSessionProvider({
  initialEditMode = false,
  children,
}: {
  initialEditMode?: boolean;
  children: React.ReactNode;
}) {
  const [isEditMode, setEditMode] = useState(initialEditMode);
  const [isLinkEditMode, setLinkEditMode] = useState(false);
  const scopesRef = useRef(new Map<string, CmsScopeControls>());

  const registerScope = useCallback((scopeKey: string, controls: CmsScopeControls) => {
    scopesRef.current.set(scopeKey, controls);
  }, []);

  const unregisterScope = useCallback((scopeKey: string) => {
    scopesRef.current.delete(scopeKey);
  }, []);

  const saveScopeIfDirty = useCallback(async (scopeKey: string) => {
    const scope = scopesRef.current.get(scopeKey);
    if (!scope) return true;
    if (!scope.isDirty()) return true;
    return scope.save();
  }, []);

  const saveCascade = useCallback(
    async (primaryScopeKey: string) => {
      const primaryResult = await saveScopeIfDirty(primaryScopeKey);
      if (!primaryResult) return false;

      if (primaryScopeKey !== CMS_CHROME_SCOPE_KEY) {
        return saveScopeIfDirty(CMS_CHROME_SCOPE_KEY);
      }

      return true;
    },
    [saveScopeIfDirty],
  );

  const value = useMemo<CmsInlineSessionValue>(
    () => ({
      isEditMode,
      toggleEditMode: () => setEditMode((prev) => !prev),
      setEditMode,
      isLinkEditMode,
      setLinkEditMode,
      registerScope,
      unregisterScope,
      saveCascade,
    }),
    [isEditMode, isLinkEditMode, registerScope, unregisterScope, saveCascade],
  );

  return <CmsInlineSessionContext.Provider value={value}>{children}</CmsInlineSessionContext.Provider>;
}

export function useCmsInlineSessionOptional() {
  return useContext(CmsInlineSessionContext);
}

