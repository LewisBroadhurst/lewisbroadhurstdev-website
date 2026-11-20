import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// The steps theme.css adds to Tailwind's scales; keep in step with it. Unnamed here, tailwind-merge
// would read `shadow-dialog` as a shadow colour and drop it beside `shadow-black`.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["2xs"],
      leading: ["display"],
      tracking: ["caps"],
      shadow: ["popover", "dialog"],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
