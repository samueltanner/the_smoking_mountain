"use client"
import { Fragment, useEffect, useMemo, useRef, type ReactNode } from "react"
import { useRouter } from "next/navigation"

function findScrollableAncestor(el: HTMLElement): HTMLElement | Window {
  let node: HTMLElement | null = el.parentElement
  while (node) {
    const { overflowY } = window.getComputedStyle(node)
    if (
      (overflowY === "auto" || overflowY === "scroll") &&
      node.scrollHeight > node.clientHeight
    ) {
      return node
    }
    node = node.parentElement
  }
  return window
}

const MAX_TRANSLATE_PCT = 8
const MAX_SNIPPETS = 3
const SNIPPET_MAX_LEN = 180

type Snippet = { text: string; matched: string[] }

function clipAroundMatch(line: string, matchIndex: number, maxLen: number): string {
  if (line.length <= maxLen) return line
  const half = Math.floor(maxLen / 2)
  let start = Math.max(0, matchIndex - half)
  let end = Math.min(line.length, start + maxLen)
  start = Math.max(0, end - maxLen)
  if (start > 0) {
    const space = line.indexOf(" ", start)
    if (space !== -1 && space < start + 20) start = space + 1
  }
  if (end < line.length) {
    const space = line.lastIndexOf(" ", end)
    if (space !== -1 && space > end - 20) end = space
  }
  return (
    (start > 0 ? "…" : "") +
    line.slice(start, end) +
    (end < line.length ? "…" : "")
  )
}

function findSnippets(text: string, query: string): Snippet[] {
  const q = query.trim().toLowerCase()
  if (!text || !q) return []
  const words = q.split(/\s+/).filter(Boolean)
  if (words.length === 0) return []

  const lines = text.split(/\n+/)
  type Match = { line: string; matched: Set<string>; firstIndex: number }
  const out: Match[] = []

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (line.length < 3) continue
    const lower = line.toLowerCase()
    const matched = new Set<string>()
    let firstIndex = Infinity
    for (const w of words) {
      const idx = lower.indexOf(w)
      if (idx !== -1) {
        matched.add(w)
        if (idx < firstIndex) firstIndex = idx
      }
    }
    if (matched.size > 0) {
      out.push({ line, matched, firstIndex })
    }
  }

  out.sort(
    (a, b) => b.matched.size - a.matched.size || a.firstIndex - b.firstIndex,
  )

  return out.slice(0, MAX_SNIPPETS).map((m) => ({
    text: clipAroundMatch(m.line, m.firstIndex, SNIPPET_MAX_LEN),
    matched: [...m.matched],
  }))
}

function highlight(text: string, words: string[]): ReactNode[] {
  if (words.length === 0) return [text]
  const lower = text.toLowerCase()
  type Range = { start: number; end: number }
  const ranges: Range[] = []
  for (const w of words) {
    let idx = lower.indexOf(w)
    while (idx !== -1) {
      ranges.push({ start: idx, end: idx + w.length })
      idx = lower.indexOf(w, idx + w.length)
    }
  }
  if (ranges.length === 0) return [text]
  ranges.sort((a, b) => a.start - b.start)
  const merged: Range[] = []
  for (const r of ranges) {
    const last = merged[merged.length - 1]
    if (last && r.start <= last.end) {
      last.end = Math.max(last.end, r.end)
    } else {
      merged.push({ ...r })
    }
  }
  const nodes: ReactNode[] = []
  let cursor = 0
  for (const { start, end } of merged) {
    if (start > cursor) nodes.push(text.slice(cursor, start))
    nodes.push(
      <mark
        key={`${start}-${end}`}
        className="bg-tangerine/90 rounded-sm px-0.5 text-white"
      >
        {text.slice(start, end)}
      </mark>,
    )
    cursor = end
  }
  if (cursor < text.length) nodes.push(text.slice(cursor))
  return nodes
}

export default function PresentationThumbnail({
  presentation,
  query = "",
  text = "",
}: {
  presentation: any
  query?: string
  text?: string
}) {
  const router = useRouter()
  const cardRef = useRef<HTMLButtonElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const img = imgRef.current
    if (!card || !img) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const scroller = findScrollableAncestor(card)
    let rafId = 0

    const update = () => {
      rafId = 0
      const cardRect = card.getBoundingClientRect()
      let viewportTop: number
      let viewportHeight: number
      if (scroller === window) {
        viewportTop = 0
        viewportHeight = window.innerHeight
      } else {
        const rect = (scroller as HTMLElement).getBoundingClientRect()
        viewportTop = rect.top
        viewportHeight = (scroller as HTMLElement).clientHeight
      }
      const cardCenter = cardRect.top + cardRect.height / 2 - viewportTop
      const normalized = (cardCenter / viewportHeight) * 2 - 1
      const clamped = Math.max(-1, Math.min(1, normalized))
      img.style.transform = `translate3d(0, ${(-clamped * MAX_TRANSLATE_PCT).toFixed(3)}%, 0)`
    }

    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(update)
    }

    update()
    scroller.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })

    return () => {
      scroller.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const augmentedText = useMemo(() => {
    const meta = [
      presentation?.title,
      presentation?.date && presentation?.year
        ? `${presentation.date}, ${presentation.year}`
        : presentation?.date,
      presentation?.day_count,
      presentation?.weekday,
    ]
      .filter(Boolean)
      .join("\n")
    return `${meta}\n${text}`
  }, [presentation, text])

  const snippets = useMemo(
    () => findSnippets(augmentedText, query),
    [augmentedText, query],
  )

  const hasQuery = query.trim().length > 0

  if (!presentation?.presentation_id) return null

  let route = `/slides/${presentation.release_date}`

  const title = `${presentation.date}${presentation?.year ? `, ${presentation.year}` : ""}`

  return (
    <button
      ref={cardRef}
      className="group flex h-[300px] w-full max-w-[600px] cursor-pointer flex-col gap-3"
      onClick={() => {
        router.push(route)
      }}
    >
      <div className="group-hover:ring-tangerine-dark group-hover:ring-offset-dark-blue fade-in-out relative flex h-[85%] w-full overflow-hidden rounded-xl group-hover:ring-4 group-hover:ring-offset-4">
        <img
          ref={imgRef}
          src={`/images/ThumbnailPhotos/${presentation.release_date}.jpg`}
          alt={presentation.title}
          className="absolute inset-x-0 top-[-10%] h-[120%] w-full rounded-xl object-cover will-change-transform"
          loading="lazy"
        />
        {hasQuery && snippets.length > 0 && (
          <div className="pointer-events-none absolute inset-0 z-10 flex flex-col gap-2 overflow-hidden bg-black/70 p-4 text-start text-sm leading-snug text-white backdrop-blur-[2px]">
            {snippets.map((snippet, i) => (
              <p key={i} className="line-clamp-3">
                {highlight(snippet.text, snippet.matched).map((node, j) => (
                  <Fragment key={j}>{node}</Fragment>
                ))}
              </p>
            ))}
          </div>
        )}
      </div>
      <h2 className="group-hover:text-tangerine-dark fade-in-out overflow-hidden text-start text-lg leading-tight font-bold break-all text-white">
        {title}
      </h2>
    </button>
  )
}
