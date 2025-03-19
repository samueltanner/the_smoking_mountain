"use client"

import { presentationDays } from "@/data/presentationDays"
import PresentationThumbnail from "@/components/PresentationThumbnail"
import dayjs from "dayjs"
import { useRouter, useSearchParams } from "next/navigation"

export default function SlidesListClient() {
  const router = useRouter()
  let today = dayjs()
  const params = useSearchParams()
  const isAll = params.get("all")

  if (isAll === "true") {
    today = dayjs("2025-07-04")
  }
  const currentMonth = today.format("MM")
  const currentDay = today.format("DD")

  const availablePresentations = presentationDays.filter((presentation) => {
    const [month, day] = presentation.release_date.split("-")
    return month < currentMonth || (month === currentMonth && day <= currentDay)
  })

  return (
    <div className="flex h-dvh w-full flex-col gap-16 overflow-x-hidden overflow-y-auto p-8 pl-20">
      <div className="flex size-full flex-wrap gap-8">
        {availablePresentations.length > 0 ? (
          availablePresentations.map((presentation) => (
            <PresentationThumbnail
              key={presentation.release_date}
              presentation={presentation}
              isAll={isAll === "true"}
            />
          ))
        ) : (
          <div className="flex size-full flex-grow flex-col items-center justify-center gap-8 text-center text-white">
            <p className="text-2xl">
              First presentation will release on{" "}
              {dayjs(presentationDays[0].release_date).format("MM/DD")}
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-tangerine hover:bg-tangerine-light fade-in-out cursor-pointer rounded-full px-4 py-2 text-white"
            >
              Return Home
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
