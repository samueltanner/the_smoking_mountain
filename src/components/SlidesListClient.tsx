"use client"

import { useMemo, useState } from "react"
import { MagnifyingGlass, X } from "@phosphor-icons/react"
import { presentationDays } from "@/data/presentationDays"
import PresentationThumbnail from "@/components/PresentationThumbnail"

type Presentation = (typeof presentationDays)[number]

type Props = {
  searchIndex: Record<string, string>
  presentationText: Record<string, string>
}

function buildHaystack(p: Presentation, indexed: string | undefined): string {
  const meta = [p.day_count, p.date, p.year, p.weekday, p.title]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
  return ` ${meta} ${indexed ?? ""}`
}

function matches(haystack: string, words: string[]): boolean {
  return words.every((w) => haystack.includes(` ${w}`))
}

export default function SlidesListClient({
  searchIndex,
  presentationText,
}: Props) {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return presentationDays
    const words = q.split(/\s+/)
    return presentationDays.filter((p) =>
      matches(buildHaystack(p, searchIndex[p.day_count]), words),
    )
  }, [query, searchIndex])

  const hasQuery = query.trim().length > 0

  return (
    <div className="flex h-dvh w-full grow flex-col overflow-x-hidden overflow-y-auto">
      <div className="bg-dark-blue/90 sticky top-0 z-20 px-8 pt-8 pb-5 pl-12 backdrop-blur-md md:pl-20">
        <div className="relative w-full max-w-2xl">
          <MagnifyingGlass
            aria-hidden="true"
            weight="bold"
            className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-white/40"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across all presentations…"
            aria-label="Search presentations"
            className="focus:ring-tangerine/40 focus:border-tangerine/60 w-full rounded-full border border-white/10 bg-white/5 py-3 pr-12 pl-12 text-base text-white transition-shadow placeholder:text-white/40 focus:ring-4 focus:outline-none [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
          />
          {hasQuery && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-full p-1.5 text-white/50 transition hover:bg-white/10 hover:text-white"
            >
              <X aria-hidden="true" weight="bold" className="h-4 w-4" />
            </button>
          )}
        </div>
        {hasQuery && (
          <p className="mt-3 pl-3 text-sm text-white/50 tabular-nums">
            {filtered.length === 0
              ? "No presentations match your search."
              : `Showing ${filtered.length} of ${presentationDays.length} presentations`}
          </p>
        )}
      </div>

      <div className="flex flex-wrap content-start gap-8 px-8 pt-8 pb-12 pl-12 md:pl-20">
        {filtered.length === 0 && hasQuery ? (
          <div className="flex w-full flex-col items-center gap-4 py-20 text-white/60">
            <p>Nothing matches &ldquo;{query}&rdquo;.</p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="bg-tangerine hover:bg-tangerine-light fade-in-out cursor-pointer rounded-full px-5 py-2 text-sm font-medium text-white"
            >
              Clear search
            </button>
          </div>
        ) : (
          filtered.map((presentation) => (
            <PresentationThumbnail
              key={presentation.release_date}
              presentation={presentation}
              query={query}
              text={presentationText[presentation.day_count]}
            />
          ))
        )}
      </div>
    </div>
  )
}
