import fs from "node:fs"
import path from "node:path"

function tokenize(content: string): string[] {
  return content
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 2 && w.length <= 40)
}

function normalizeLines(content: string): string {
  return content
    .split(/\r?\n/)
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n")
}

type BuildResult = {
  searchIndex: Record<string, string>
  presentationText: Record<string, string>
}

function build(): BuildResult {
  const dir = path.join(
    process.cwd(),
    "src/data/plain-text-presentations",
  )
  let files: string[]
  try {
    files = fs.readdirSync(dir)
  } catch {
    return { searchIndex: {}, presentationText: {} }
  }

  const words: Record<string, Set<string>> = {}
  const lines: Record<string, string[]> = {}

  for (const file of files) {
    if (!file.endsWith(".txt")) continue
    const match = file.match(/^(Day [\d-]+)/)
    if (!match) continue
    const dayCount = match[1]
    const content = fs.readFileSync(path.join(dir, file), "utf-8")

    if (!words[dayCount]) words[dayCount] = new Set()
    for (const w of tokenize(content)) words[dayCount].add(w)

    if (!lines[dayCount]) lines[dayCount] = []
    lines[dayCount].push(normalizeLines(content))
  }

  const searchIndex: Record<string, string> = {}
  for (const [key, set] of Object.entries(words)) {
    searchIndex[key] = ` ${[...set].sort().join(" ")} `
  }

  const presentationText: Record<string, string> = {}
  for (const [key, arr] of Object.entries(lines)) {
    presentationText[key] = arr.join("\n")
  }

  return { searchIndex, presentationText }
}

const data = build()
export const searchIndex = data.searchIndex
export const presentationText = data.presentationText
