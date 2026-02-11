import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Known two-word character display names (normalized key -> "First Second") */
const CHARACTER_DISPLAY_NAMES: Record<string, string> = {
  hutao: "Hu Tao",
  kamisatoayaka: "Kamisato Ayaka",
  raidenshogun: "Raiden Shogun",
  yaemiko: "Yae Miko",
  yunjin: "Yun Jin",
  kukishinobu: "Kuki Shinobu",
  kujousara: "Kujou Sara",
  shikanoinheizou: "Shikanoin Heizou",
  kaedeharakazuha: "Kaedehara Kazuha",
  sangonomiyakokomi: "Sangonomiya Kokomi",
  kamisatoayato: "Kamisato Ayato",
  aratakiitto: "Arataki Itto",
}

/** Display name for character keys: two-word names get a space (e.g. "Hu_Tao" or "HuTao" → "Hu Tao") */
export function formatCharacterDisplayName(key: string): string {
  if (!key || typeof key !== "string") return key
  const normalized = key.toLowerCase().replace(/\s+/g, "").replace(/_/g, "")
  if (CHARACTER_DISPLAY_NAMES[normalized]) return CHARACTER_DISPLAY_NAMES[normalized]
  return formatKeyWithSpaces(key)
}

/** Replaces underscores with spaces and splits camelCase (e.g. "EmblemOfSeveredFate" → "Emblem Of Severed Fate") */
export function formatKeyWithSpaces(key: string): string {
  if (!key || typeof key !== "string") return key
  return key
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .trim()
    .replace(/\s+/g, " ")
}

/** Display name for weapon keys */
export function formatWeaponDisplayName(key: string): string {
  return formatKeyWithSpaces(key)
}

/** Display name for artifact set keys */
export function formatArtifactSetDisplayName(setKey: string): string {
  return formatKeyWithSpaces(setKey)
}

/** Display name for material keys */
export function formatMaterialDisplayName(key: string): string {
  return formatKeyWithSpaces(key)
}
