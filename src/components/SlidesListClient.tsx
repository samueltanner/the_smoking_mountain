"use client"

import { presentationDays } from "@/data/presentationDays"
import PresentationThumbnail from "@/components/PresentationThumbnail"
import dayjs from "dayjs"
import { useRouter, useSearchParams } from "next/navigation"

export default function SlidesListClient() {
  const router = useRouter()
  let today = dayjs()

  return (
    <div className="flex h-dvh w-full flex-col gap-16 overflow-x-hidden overflow-y-auto p-8 pl-12 md:pl-20">
      <div className="flex size-full flex-wrap gap-8">
        {presentationDays.map((presentation) => (
          <PresentationThumbnail
            key={presentation.release_date}
            presentation={presentation}
          />
        ))}
      </div>
    </div>
  )
}
