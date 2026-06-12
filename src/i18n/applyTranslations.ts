import en from "@/i18n/en";
import { getNestedValue } from "@/i18n";

export function applyTranslations(): void {
  document.documentElement.lang = "en";

  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (!key) return;
    const value = getNestedValue(en, key);
    if (!value) return;
    if (el.dataset.i18nHtml === "true") {
      el.innerHTML = value;
    } else {
      el.textContent = value;
    }
  });

  document.querySelectorAll<HTMLElement>("[data-i18n-aria]").forEach((el) => {
    const key = el.dataset.i18nAria;
    if (!key) return;
    const value = getNestedValue(en, key);
    if (value) el.setAttribute("aria-label", value);
  });

  document.querySelectorAll<HTMLElement>("[data-i18n-hotspot]").forEach((el) => {
    const key = el.dataset.i18nHotspot;
    if (!key) return;
    const [layer, id] = key.includes(":")
      ? (key.split(":") as [string, string])
      : ["nature", key];
    const title = getNestedValue(en, `layers.${layer}.${id}Title`);
    const body = getNestedValue(en, `layers.${layer}.${id}Body`);
    if (title) {
      el.dataset.title = title;
      el.setAttribute("aria-label", title);
    }
    if (body) el.dataset.body = body;
  });
}
