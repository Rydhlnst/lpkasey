import test from "node:test";
import assert from "node:assert/strict";
import { isSafeHref } from "@/lib/cms/validation/schemas";

test("[OK] [AC-02-HAPPY] allows safe protocols", () => {
  assert.equal(isSafeHref("https://example.com"), true);
  assert.equal(isSafeHref("mailto:hello@example.com"), true);
  assert.equal(isSafeHref("tel:+621234"), true);
  assert.equal(isSafeHref("/about"), true);
});

test("[ERR] [AC-02-EDGE-1] blocks javascript protocol", () => {
  assert.equal(isSafeHref("javascript:alert(1)"), false);
});
