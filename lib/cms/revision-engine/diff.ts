function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function getByPath(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export function setByPath(
  obj: Record<string, unknown>,
  path: string,
  value: unknown,
): Record<string, unknown> {
  const next = deepClone(obj);
  const keys = path.split(".");
  let cursor: Record<string, unknown> = next;

  for (let i = 0; i < keys.length - 1; i += 1) {
    const k = keys[i];
    const existing = cursor[k];
    if (!existing || typeof existing !== "object") {
      cursor[k] = {};
    }
    cursor = cursor[k] as Record<string, unknown>;
  }

  cursor[keys[keys.length - 1]] = value;
  return next;
}

export function updateListAtPath(
  obj: Record<string, unknown>,
  path: string,
  operation:
    | { kind: "add"; value: unknown }
    | { kind: "update"; index: number; value: unknown }
    | { kind: "remove"; index: number }
    | { kind: "move"; fromIndex: number; toIndex: number },
) {
  const current = getByPath(obj, path);
  if (!Array.isArray(current)) {
    throw new Error("INVALID_LIST_PATH");
  }

  const nextList = [...current];
  switch (operation.kind) {
    case "add":
      nextList.push(operation.value);
      break;
    case "update":
      if (operation.index < 0 || operation.index >= nextList.length) throw new Error("INVALID_LIST_INDEX");
      nextList[operation.index] = operation.value;
      break;
    case "remove":
      if (operation.index < 0 || operation.index >= nextList.length) throw new Error("INVALID_LIST_INDEX");
      nextList.splice(operation.index, 1);
      break;
    case "move":
      if (
        operation.fromIndex < 0 ||
        operation.fromIndex >= nextList.length ||
        operation.toIndex < 0 ||
        operation.toIndex >= nextList.length
      ) {
        throw new Error("INVALID_LIST_INDEX");
      }
      if (operation.fromIndex !== operation.toIndex) {
        const [item] = nextList.splice(operation.fromIndex, 1);
        nextList.splice(operation.toIndex, 0, item);
      }
      break;
  }

  return setByPath(obj, path, nextList);
}

export function diffPaths(
  before: Record<string, unknown>,
  after: Record<string, unknown>,
  requestedPaths: string[],
) {
  return requestedPaths
    .map((path) => {
      const prev = getByPath(before, path);
      const next = getByPath(after, path);
      if (JSON.stringify(prev) === JSON.stringify(next)) return null;
      return { path, before: prev, after: next };
    })
    .filter((item): item is { path: string; before: unknown; after: unknown } => item !== null);
}
