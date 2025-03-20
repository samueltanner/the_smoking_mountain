"use client"
import GoogleSlideWrapper from "@/components/GoogleSlideWrapper"
import { formatDateForUrl, getTodaysPresentation, parseDateFromUrl } from "@/utils/functions"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const DayPresentationPage = ({
  params,
}: {
  params: Promise<{ day: string }>
}) => {
  const [releaseDate, setReleaseDate] = useState("")
  const searchParams = useSearchParams()
  const isAll = searchParams.get("all")
  const router = useRouter()

  useEffect(() => {
    const handleGetDay = async () => {
      const day = (await params).day
      const parsedDate = parseDateFromUrl(day.split("_").join("-"))
      const formattedDate = formatDateForUrl(parsedDate)
      console.log(formattedDate)
      setReleaseDate(formattedDate)
    }
    handleGetDay()
  }, [params])

  console.log(releaseDate)
  const todaysPresentation = getTodaysPresentation(
    releaseDate,
    isAll === "true",
  )

  if (!todaysPresentation) {
    return (
      <div className="flex h-dvh w-full flex-col items-center justify-center gap-8 text-center text-white">
        <p className="text-2xl">This presentation is not available yet</p>
        <button
          onClick={() => router.push("/slides")}
          className="bg-tangerine hover:bg-tangerine-light fade-in-out cursor-pointer rounded-full px-4 py-2 text-white"
        >
          Return Home
        </button>
      </div>
    )
  }
  return (
    <div className="flex h-dvh w-full flex-col gap-16 overflow-auto p-8 pl-20">
      <div className="font-header flex items-center justify-center gap-2 text-2xl text-white">

        <span className="font-bold">{todaysPresentation?.date}</span>
        <span className="font-bold">{todaysPresentation?.year}</span>
        <span className="font-bold">{todaysPresentation?.weekday}</span>
      </div>

      <GoogleSlideWrapper
        presentationUrl={todaysPresentation?.presentation_url}
      />
      <div className="flex flex-col gap-4 px-12 font-normal text-white">
        <span className="font-bold">{todaysPresentation?.notes}</span>
      </div>
    </div>
  )
}

export default DayPresentationPage
