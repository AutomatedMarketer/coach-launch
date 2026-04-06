/**
 * Extract identity names from Two Identities deliverable content.
 * Returns null for any name it cannot confidently extract.
 */
export function extractIdentityNames(content: string): {
  undesired: string | null
  aspiring: string | null
} {
  let undesired: string | null = null
  let aspiring: string | null = null

  // Split into PART 1 (Undesired) and PART 2 (Aspiring) sections
  const parts = content.split(/####?\s*PART\s*2/i)
  const part1 = parts[0] || ''
  const part2 = parts[1] || ''

  // Strategy: try multiple regex patterns in order of specificity

  // Pattern 1 (highest priority): "Selected Name:" — the format the template explicitly asks for
  // e.g., **Selected Name:** "The $300K Ceiling" or **Selected Name:** The Session-for-Session Swap
  const selectedNameRegex = /\*?\*?Selected\s+Name\*?\*?:?\s*\*?\*?\s*\[?\s*"?([^"*\n\]]+)"?\s*\]?\s*\*?\*?/i
  const part1Selected = part1.match(selectedNameRegex)
  if (part1Selected) {
    undesired = cleanName(part1Selected[1])
  }
  const part2Selected = part2.match(selectedNameRegex)
  if (part2Selected) {
    aspiring = cleanName(part2Selected[1])
  }

  // Pattern 2: "Name/Label:" or "Identity Name:" (older output format)
  if (!undesired || !aspiring) {
    const nameLabelRegex = /\*?\*?(?:Name\/Label|Identity Name)\*?\*?:?\s*\*?\*?\s*"?([^"*\n]+)"?\s*\*?\*?/i
    if (!undesired) {
      const match = part1.match(nameLabelRegex)
      if (match) undesired = cleanName(match[1])
    }
    if (!aspiring) {
      const match = part2.match(nameLabelRegex)
      if (match) aspiring = cleanName(match[1])
    }
  }

  // Pattern 3: "BEFORE (The ___)" / "AFTER (The ___)" in condensed section
  // Must be at start of line or after ** — NOT part of section headers like "BEFORE & AFTER (Sales Page Ready)"
  if (!undesired) {
    const beforeMatch = content.match(/(?:^|\n)\s*\*?\*?BEFORE\s*\((?:The\s+)?([^)]+)\)\s*\*?\*?\s*:?/im)
    if (beforeMatch) {
      const candidate = cleanName(beforeMatch[1])
      // Reject known false matches from section headers
      if (!candidate.toLowerCase().includes('sales page') && !candidate.toLowerCase().includes('copy-paste')) {
        undesired = candidate
        if (!undesired.toLowerCase().startsWith('the ')) {
          undesired = `The ${undesired}`
        }
      }
    }
  }
  if (!aspiring) {
    // Negative lookbehind: must NOT be preceded by "& " (rules out "BEFORE & AFTER (Sales Page Ready)")
    const afterMatch = content.match(/(?:^|\n)\s*\*?\*?AFTER\s*\((?:The\s+)?([^)]+)\)\s*\*?\*?\s*:?/im)
    if (afterMatch && !afterMatch[0].includes('& AFTER')) {
      const candidate = cleanName(afterMatch[1])
      if (!candidate.toLowerCase().includes('sales page') && !candidate.toLowerCase().includes('copy-paste')) {
        aspiring = candidate
        if (!aspiring.toLowerCase().startsWith('the ')) {
          aspiring = `The ${aspiring}`
        }
      }
    }
  }

  // Pattern 4: "The difference between [X] and [Y]" in the bridge statement
  if (!undesired || !aspiring) {
    const bridgeMatch = content.match(/difference between\s+(?:(?:the|a)\s+)?[""\u201C]?([^""\u201D]+?)[""\u201D]?\s+and\s+(?:(?:the|a)\s+)?[""\u201C]?([^""\u201D]+?)[""\u201D]?\s+is/i)
    if (bridgeMatch) {
      if (!undesired) undesired = bridgeMatch[1].trim()
      if (!aspiring) aspiring = bridgeMatch[2].trim()
    }
  }

  // Pattern 5: Brainstorm table fallback — pick the row with highest niche score (4 or 5)
  if (!undesired) {
    undesired = extractFromBrainstormTable(part1)
  }
  if (!aspiring) {
    aspiring = extractFromBrainstormTable(part2)
  }

  // Validate: names should be short (2-6 words) and look like identity labels
  if (undesired && undesired.split(/\s+/).length > 6) undesired = null
  if (aspiring && aspiring.split(/\s+/).length > 6) aspiring = null

  return { undesired, aspiring }
}

/** Clean extracted name: strip quotes, brackets, bold markers, and excess whitespace */
function cleanName(raw: string): string {
  return raw
    .trim()
    .replace(/^["'\u201C\u201D]|["'\u201C\u201D]$/g, '')
    .replace(/^\[|\]$/g, '')
    .replace(/\*+/g, '')
    .trim()
}

/**
 * Fallback: parse the brainstorm table and pick the highest-scoring name.
 * Table rows look like: | a | The $300K Ceiling | Metric + State | 5 |
 */
function extractFromBrainstormTable(section: string): string | null {
  const rowRegex = /\|\s*[a-e]\s*\|\s*(.+?)\s*\|\s*.+?\s*\|\s*(\d)\s*\|/gi
  let best: { name: string; score: number } | null = null
  let match: RegExpExecArray | null

  while ((match = rowRegex.exec(section)) !== null) {
    const name = cleanName(match[1])
    const score = parseInt(match[2], 10)
    if (score >= 4 && (!best || score > best.score)) {
      best = { name, score }
    }
  }

  return best ? best.name : null
}
