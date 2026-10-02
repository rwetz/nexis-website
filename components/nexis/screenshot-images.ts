import type { StaticImageData } from "next/image";
import welcome from "@/assets/welcome.webp";
import editor from "@/assets/editor.webp";
import spotlight from "@/assets/spotlight.webp";
import ai from "@/assets/ai.webp";
import terminal from "@/assets/terminal.webp";
import documentsEditor from "@/assets/documents-editor.webp";
import sourceControl from "@/assets/source-control.webp";
import atlas from "@/assets/atlas.webp";
import svgStudio from "@/assets/svg-studio.webp";
import orb from "@/assets/orb.webp";
import features from "@/assets/features.webp";
import shortcuts from "@/assets/shortcuts.webp";

// Maps the filenames in SCREENSHOTS (lib/content.ts §7) to statically
// imported images so next/image can size + blur-placeholder them.
// Captured from the real app by Nexis's e2e/specs/screenshots.test.ts.
export const SCREENSHOT_IMAGES: Record<string, StaticImageData> = {
  "welcome.webp": welcome,
  "editor.webp": editor,
  "spotlight.webp": spotlight,
  "ai.webp": ai,
  "terminal.webp": terminal,
  "documents-editor.webp": documentsEditor,
  "source-control.webp": sourceControl,
  "atlas.webp": atlas,
  "svg-studio.webp": svgStudio,
  "orb.webp": orb,
  "features.webp": features,
  "shortcuts.webp": shortcuts,
};
