import { test, expect } from "vitest";
import { z } from "../index.js";

test("safeParseAsync with abortEarly: true should stop at first error", async () => {
  const schema = z.string().min(5).email();

  // "a" fails min(5) and email
  const result = await schema.safeParseAsync("a", { abortEarly: true });

  expect(result.success).toBe(false);
  if (!result.success) {
    expect(result.error.issues.length).toBe(1);
    expect(result.error.issues[0].code).toBe("too_small");
  }
});

test("safeParseAsync with abortEarly: false (default) should collect detection all errors", async () => {
  const schema = z.string().min(5).email();

  // "a" fails min(5) and email
  const result = await schema.safeParseAsync("a");

  expect(result.success).toBe(false);
  if (!result.success) {
    // min(5) and email both fail
    expect(result.error.issues.length).toBeGreaterThan(1);
  }
});

test("safeParse with abortEarly: true should stop at first error", () => {
  const schema = z.string().min(5).email();

  // "a" fails min(5) and email
  const result = schema.safeParse("a", { abortEarly: true });

  expect(result.success).toBe(false);
  if (!result.success) {
    expect(result.error.issues.length).toBe(1);
    expect(result.error.issues[0].code).toBe("too_small");
  }
});
