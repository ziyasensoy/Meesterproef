export function escapeAttr(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function getRequiredElement<T extends HTMLElement>(
  id: string,
): T | null {
  return document.getElementById(id) as T | null;
}

import en from "@/i18n/en";
import { getNestedValue } from "@/i18n";

export function getHotspotData(el: HTMLElement): {
  title: string;
  body: string;
} {
  const cachedTitle = el.dataset.title ?? "";
  const cachedBody = el.dataset.body ?? "";
  if (cachedTitle && cachedBody) {
    return { title: cachedTitle, body: cachedBody };
  }

  const key = el.dataset.i18nHotspot;
  if (!key) {
    return { title: cachedTitle, body: cachedBody };
  }

  const [layer, id] = key.includes(":")
    ? (key.split(":") as [string, string])
    : ["nature", key];

  return {
    title:
      cachedTitle ||
      getNestedValue(en, `layers.${layer}.${id}Title`) ||
      "",
    body:
      cachedBody || getNestedValue(en, `layers.${layer}.${id}Body`) || "",
  };
}
