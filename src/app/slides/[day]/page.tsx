"use client"
import GoogleSlideWrapper from "@/components/GoogleSlideWrapper"
import { getTodaysPresentation, parseDateFromUrl } from "@/utils/functions"
import { useEffect, useState } from "react"

const DayPresentationPage = ({
  params,
}: {
  params: Promise<{ day: string }>
}) => {
  const [releaseDate, setReleaseDate] = useState("")

  useEffect(() => {
    const handleGetDay = async () => {
      const day = (await params).day
      const parsedDate = parseDateFromUrl(day.split("_").join("-"))
      setReleaseDate(parsedDate)
    }
    handleGetDay()
  }, [params])

  const todaysPresentation = getTodaysPresentation(releaseDate, true)

  return (
    <div className="flex h-dvh w-full flex-col gap-16 overflow-auto p-8 pl-20">
      <div className="font-header flex items-center justify-center gap-2 text-2xl text-white">
        <span className="font-bold">{todaysPresentation?.day_count},</span>
        <span className="font-bold">{todaysPresentation?.date}</span>
        <span className="font-bold">{todaysPresentation?.year}</span>
        <span className="font-bold">{todaysPresentation?.weekday}</span>
      </div>

      <GoogleSlideWrapper
        presentationUrl={todaysPresentation?.presentation_url}
      />
    </div>
  )
}

export default DayPresentationPage
