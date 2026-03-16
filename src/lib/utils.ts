import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Safely parse a fetch Response as JSON, falling back to raw text on parse failure
export async function safeParseJSON(res: Response): Promise<{ error?: string; [key: string]: unknown }> {
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    return { error: text || `Request failed with status ${res.status}` }
  }
}
