import en, { type TranslationTree } from "./en";

export function getNestedValue(
  tree: TranslationTree,
  path: string,
): string | undefined {
  const parts = path.split(".");
  let current: unknown = tree;
  for (const part of parts) {
    if (current === null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : undefined;
}

export { en };
export type { TranslationTree };
