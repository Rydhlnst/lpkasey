import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const TARGET_DIRS = [
  path.join(ROOT, "app", "(site)"),
  path.join(ROOT, "components", "sections"),
  path.join(ROOT, "components", "layout"),
];

function walkTsxFiles(dirPath: string, acc: string[] = []) {
  if (!fs.existsSync(dirPath)) return acc;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const next = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walkTsxFiles(next, acc);
      continue;
    }
    if (entry.isFile() && next.endsWith(".tsx")) {
      acc.push(next);
    }
  }
  return acc;
}

test("[AUDIT] no hardcoded <Link> in site/layout/sections user-facing surfaces", () => {
  const tsxFiles = TARGET_DIRS.flatMap((dir) => walkTsxFiles(dir));
  const offenders: string[] = [];

  for (const filePath of tsxFiles) {
    const source = fs.readFileSync(filePath, "utf8");
    if (source.includes("<Link")) {
      offenders.push(path.relative(ROOT, filePath));
    }
  }

  assert.deepEqual(
    offenders,
    [],
    `Hardcoded <Link> found in user-facing editable surfaces:\n${offenders.join("\n")}`,
  );
});

