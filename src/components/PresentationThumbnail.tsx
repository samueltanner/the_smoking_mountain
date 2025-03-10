"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"

const PresentationThumbnail = ({
  presentation,
  isAll,
}: {
  presentation: any
  isAll: boolean
}) => {
  const router = useRouter()
  if (!presentation?.presentation_id) return null
  const title = `${presentation.date}${presentation?.year ? `, ${presentation.year}` : ""}`
  let route = `/slides/${presentation.release_date}`
  if (isAll) {
    route = `/slides/${presentation.release_date}?all=true`
  }
  return (
    <button
      className="group flex w-[200px] max-w-[200px] cursor-pointer flex-col gap-2"
      onClick={() => {
        router.push(route)
      }}
    >
      <Image
        src={`/images/slide_thumbnails/${presentation.presentation_id}.jpg`}
        alt={presentation.title}
        width={0}
        height={0}
        sizes="100vw"
        style={{
          objectFit: "cover",
          width: "200px",
          height: "200px",
        }}
        className="rounded-xl"
        priority={true}
      />

      <h2 className="group-hover:text-tangerine-dark fade-in-out overflow-hidden text-start text-lg leading-tight font-bold break-all text-white">
        {title}
      </h2>
    </button>
  )
}

export default PresentationThumbnail
