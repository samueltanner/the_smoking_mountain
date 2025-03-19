"use client"
import { useRouter } from "next/navigation"

export default function PresentationThumbnail({
  presentation,
  isAll,
}: {
  presentation: any
  isAll: boolean
}) {
  const router = useRouter()
  if (!presentation?.presentation_id) return null

  let route = `/slides/${presentation.release_date}`
  if (isAll) {
    route = `/slides/${presentation.release_date}?all=true`
  }

  const title = `${presentation.date}${presentation?.year ? `, ${presentation.year}` : ""}`

  return (
    <button
      className="group flex h-[300px] w-full max-w-[600px] cursor-pointer flex-col gap-2"
      onClick={() => {
        router.push(route)
      }}
    >
      <div className="relative flex h-[90%] w-full">
        <img
          src={`/images/ThumbnailPhotos/${presentation.release_date}.jpg`}
          alt={presentation.title}
          className="h-full w-full rounded-xl object-cover"
          loading="lazy"
        />
      </div>
      <h2 className="group-hover:text-tangerine-dark fade-in-out overflow-hidden text-start text-lg leading-tight font-bold break-all text-white">
        {title}
      </h2>
    </button>
  )
}
