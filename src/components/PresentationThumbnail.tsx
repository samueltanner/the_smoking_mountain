"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"

const PresentationThumbnail = ({ presentation }: { presentation: any }) => {
  const router = useRouter()
  if (!presentation?.presentation_id) return null
  const title = `${presentation.date}${presentation?.year ? `, ${presentation.year}` : ""}`
  return (
    <button
      className="group flex w-[200px] max-w-[200px] cursor-pointer flex-col gap-2"
      onClick={() => {
        router.push(`/slides/${presentation.release_date}`)
      }}
    >
      <Image
        src={`/images/slide_thumbnails/${presentation.presentation_id}.jpg`}
        alt={presentation.title}
        width={200}
        height={200}
        className="rounded-xl"
      />
      <h2 className="group-hover:text-tangerine-dark fade-in-out overflow-hidden text-start text-lg leading-tight font-bold break-all text-white">
        {title}
      </h2>
    </button>
  )
}

export default PresentationThumbnail
