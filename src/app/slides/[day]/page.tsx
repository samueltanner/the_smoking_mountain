"use client"
import Button from "@/components/Button"
import GoogleSlideWrapper from "@/components/GoogleSlideWrapper"
import { presentationDays } from "@/data/presentationDays"
import {
  formatDateForUrl,
  getTodaysPresentation,
  parseDateFromUrl,
} from "@/utils/functions"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
const INTRO_DELAY = 0.75
const DayPresentationPage = ({
  params,
}: {
  params: Promise<{ day: string }>
}) => {
  const [releaseDate, setReleaseDate] = useState("")

  const router = useRouter()

  useEffect(() => {
    const handleGetDay = async () => {
      const day = (await params).day
      const parsedDate = parseDateFromUrl(day.split("_").join("-"))
      const formattedDate = formatDateForUrl(parsedDate)

      setReleaseDate(formattedDate)
    }
    handleGetDay()
  }, [params, presentationDays])

  const {
    todaysPresentation,
    tomorrowsPresentationReleaseDate,
    yesterdaysPresentationReleaseDate,
  } = getTodaysPresentation(releaseDate)

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
    <div className="flex h-dvh w-full flex-col gap-16 overflow-auto p-8 md:pl-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={releaseDate ? { opacity: 1 } : { opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: INTRO_DELAY }}
        className="font-header flex items-center justify-center gap-2 text-2xl font-bold text-white"
      >
        <h3 className="font-header text-tangerine flex items-center justify-center gap-2 text-2xl">
          {todaysPresentation?.date}
          {todaysPresentation?.year ? `, ${todaysPresentation?.year}` : ""}{" "}
          {todaysPresentation?.weekday}
        </h3>
      </motion.div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={releaseDate ? { opacity: 1 } : { opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: INTRO_DELAY }}
        >
          <GoogleSlideWrapper
            presentationUrl={todaysPresentation?.presentation_url}
          />
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={releaseDate ? { opacity: 1 } : { opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: INTRO_DELAY }}
        className="flex flex-col gap-4 px-12 font-normal text-white"
      >
        <span className="font-bold">{todaysPresentation?.notes}</span>
      </motion.div>

      <div className="flex justify-around">
        <Button
          onClick={() =>
            router.push(`/slides/${yesterdaysPresentationReleaseDate}`)
          }
        >
          <p className="text-sm font-semibold">Previous Presentation</p>
        </Button>
        <Button
          onClick={() =>
            router.push(`/slides/${tomorrowsPresentationReleaseDate}`)
          }
        >
          <p className="text-sm font-semibold">Next Presentation</p>
        </Button>
      </div>
    </div>
  )
}

export default DayPresentationPage
