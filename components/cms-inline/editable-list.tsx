"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCmsInline } from "@/components/cms-inline/provider-client";

export function EditableList({
  path,
  fallback,
}: {
  path: string;
  fallback: string[];
}) {
  const { isEditMode, getField, addListItem, updateListItem, removeListItem, moveListItem } = useCmsInline();
  const list = (getField(path) as string[] | undefined) ?? fallback;

  if (!isEditMode) {
    return (
      <>
        {list.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </>
    );
  }

  return (
    <>
      {list.map((item, index) => (
        <li key={`${path}-${index}`} className="flex list-none items-center gap-2">
          <Input
            value={item}
            onChange={(event) => updateListItem(path, index, event.target.value)}
            className="border-cyan-500/60 bg-cyan-50/40"
          />
          <Button type="button" size="sm" variant="outline" onClick={() => moveListItem(path, index, Math.max(0, index - 1))}>
            ?
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => moveListItem(path, index, Math.min(list.length - 1, index + 1))}
          >
            ?
          </Button>
          <Button type="button" size="sm" variant="destructive" onClick={() => removeListItem(path, index)}>
            Hapus
          </Button>
        </li>
      ))}
      <li className="list-none pt-2">
        <Button type="button" size="sm" className="bg-cyan-600 hover:bg-cyan-700" onClick={() => addListItem(path, "Item baru")}>
          Tambah Item
        </Button>
      </li>
    </>
  );
}
