"use client"
import { getTodaysPresentation } from "@/utils/functions"
import Image from "next/image"
import { useRouter } from "next/navigation"
import MainPageTextAndImages from "@/views/MainPageTextAndImages"
import Button from "@/components/Button"

export default function Home() {
  const todaysPresentation = getTodaysPresentation()

  const router = useRouter()

  return (
    <div className="flex h-dvh w-full flex-col gap-8 overflow-x-hidden overflow-y-auto">
      <div className="relative flex h-full min-h-full w-full flex-col gap-8 pt-16 pl-12 md:pl-18">
        <div className="relative h-3/4 w-full">
          <Image
            src="/images/StHelensHeaderImage.jpg"
            alt="April 1980  Phreatic eruption of Mount St. Helens from Weyerhaeuser road on ridge between South and North Fork Toutle Rivers"
            fill
            className="object-cover"
            priority={true}
          />
        </div>
        <div className="flex h-1/4 w-full max-w-[800px] flex-col justify-start gap-4">
          <h2 className="text-light-gray text-4xl font-black drop-shadow-md md:text-8xl">
            The Smoking Mountain
          </h2>

          <h3 className="text-tangerine-dark text-xl md:text-2xl">
            Lawetlat&apos;la - Mount St. Helens
          </h3>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={() => {
            const releaseDate = todaysPresentation?.release_date
            router.push(`/slides/${releaseDate}`)
          }}
        >
          View Today's Presentation
        </Button>
      </div>
      <MainPageTextAndImages />
      <div className="flex size-full flex-col items-center justify-center gap-8 p-8">
        {!!todaysPresentation ? (
          <>
            <Button
              onClick={() => {
                const releaseDate = todaysPresentation?.release_date
                router.push(`/slides/${releaseDate}`)
              }}
            >
              View Today's Presentation
            </Button>
          </>
        ) : (
          <span className="text-tangerine flex size-full flex-grow items-center justify-center text-center text-2xl">
            <p>First presentation will release on March 20th.</p>
          </span>
        )}
      </div>
    </div>
  )
}
