/**
 * Regenerates src/pages/JourneyPage.tsx from legacy/index.html (main content only).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import convertHtmlToJsx from "html-to-jsx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const legacyHtml = fs.readFileSync(
  path.join(root, "legacy", "index.html"),
  "utf8",
);

const mainMatch = legacyHtml.match(
  /<main\s+class="journey"[^>]*>([\s\S]*)<\/main>/i,
);
if (!mainMatch) {
  throw new Error("Could not find <main class=\"journey\"> in legacy/index.html");
}

let mainInner = mainMatch[1].trim();
let jsx = convertHtmlToJsx(mainInner);

const svgAttrMap = [
  ["stroke-width", "strokeWidth"],
  ["stroke-linecap", "strokeLinecap"],
  ["stroke-linejoin", "strokeLinejoin"],
  ["stroke-dasharray", "strokeDasharray"],
  ["stop-color", "stopColor"],
  ["stop-opacity", "stopOpacity"],
  ["font-size", "fontSize"],
  ["font-weight", "fontWeight"],
  ["font-family", "fontFamily"],
  ["text-anchor", "textAnchor"],
];
for (const [from, to] of svgAttrMap) {
  jsx = jsx.replaceAll(from, to);
}

jsx = jsx.replace(
  /style=\{\{-pinVh:\s*(\d+)\}\}/g,
  'style={{ "--pin-vh": $1 } as CSSProperties}',
);

jsx = jsx.replace(
  /<button className="scroll-hint"[\s\S]*?<\/button>/,
  "<ScrollHint />",
);

const output = `import type { CSSProperties } from "react";
import { InfoCard, JourneyChrome, ScrollHint } from "@/components/journey";
import { useExperience } from "@/hooks/useExperience";

export default function JourneyPage() {
  useExperience();

  return (
    <>
      <JourneyChrome />

      <main className="journey">
${jsx
  .split("\n")
  .map((line) => "        " + line)
  .join("\n")}
      </main>

      <InfoCard />
    </>
  );
}
`;

fs.writeFileSync(path.join(root, "src", "pages", "JourneyPage.tsx"), output);
console.log("Wrote src/pages/JourneyPage.tsx");
