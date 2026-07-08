import type { StaticImageData } from "next/image";
import ai from "@/assets/ai.png";
import editor from "@/assets/editor.png";
import features from "@/assets/features.png";
import markdown from "@/assets/markdown.png";
import settings from "@/assets/settings.png";
import shortcuts from "@/assets/shortcuts.png";
import terminal from "@/assets/terminal.png";
import welcome from "@/assets/welcome.png";

// Maps the filenames in SCREENSHOTS (lib/content.ts §7) to statically
// imported images so next/image can optimize + blur-placeholder them.
export const SCREENSHOT_IMAGES: Record<string, StaticImageData> = {
  "welcome.png": welcome,
  "editor.png": editor,
  "ai.png": ai,
  "terminal.png": terminal,
  "markdown.png": markdown,
  "features.png": features,
  "settings.png": settings,
  "shortcuts.png": shortcuts,
};
