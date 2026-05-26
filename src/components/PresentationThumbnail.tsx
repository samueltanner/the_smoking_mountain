"use client"
import { useEffect, useRef } from "react"
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

export default function PresentationThumbnail({
  presentation,
}: {
  presentation: any
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
      </div>
      <h2 className="group-hover:text-tangerine-dark fade-in-out overflow-hidden text-start text-lg leading-tight font-bold break-all text-white">
        {title}
      </h2>
    </button>
  )
}
