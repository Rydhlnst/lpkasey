import test from "node:test";
import assert from "node:assert/strict";
import { diffPaths, setByPath } from "@/lib/cms/revision-engine/diff";

test("[OK] [AC-01-HAPPY] setByPath updates nested field", () => {
  const base = { links: { navbarCta: { href: "/contact" } } };
  const next = setByPath(base, "links.navbarCta.href", "/about");
  assert.equal((next.links as { navbarCta: { href: string } }).navbarCta.href, "/about");
});

test("[ERR] [AC-01-EDGE-1] diffPaths returns empty when no changes", () => {
  const base = { a: { b: "x" } };
  const diff = diffPaths(base, base, ["a.b"]);
  assert.equal(diff.length, 0);
});
