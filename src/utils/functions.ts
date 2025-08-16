import dayjs from "dayjs"
import { presentationDays } from "@/data/presentationDays"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)


export const getTodaysPresentation = (dateOverride?: string, allowFuture: boolean = true) => {
  const currentYear = dayjs().year()

  const date = dayjs(`${currentYear}-${dateOverride || dayjs().format("MM-DD")}`, "YYYY-MM-DD")
  const today = dayjs(`${currentYear}-${dayjs().format("MM-DD")}`, "YYYY-MM-DD")


  let targetDate = date
  if (!allowFuture && date.isAfter(today, "day")) {
    targetDate = today
  }



  let todaysPresentation = presentationDays.find(
    (presentation) => presentation.release_date === targetDate.format("MM-DD")
  )
  const todaysPresentationIndex = presentationDays.findIndex(
    (presentation) => presentation.release_date === targetDate.format("MM-DD")
  )

  let tomorrowsPresentationIndex = todaysPresentationIndex + 1
  let yesterdaysPresentationIndex = todaysPresentationIndex - 1
  if (tomorrowsPresentationIndex >= presentationDays.length) {
    tomorrowsPresentationIndex = 0
  }
  if (yesterdaysPresentationIndex < 0) {
    yesterdaysPresentationIndex = presentationDays.length - 1
  }

  if (!todaysPresentation) {
    for (let i = presentationDays.length - 1; i >= 0; i--) {
      const presentationDate = dayjs(`${currentYear}-${presentationDays[i].release_date}`, "YYYY-MM-DD")

      if (presentationDate.isBefore(targetDate, "day")) {
        todaysPresentation = presentationDays[i]
        break
      }
    }
  }

  const tomorrowsPresentation = presentationDays[tomorrowsPresentationIndex]
  const tomorrowsPresentationReleaseDate = tomorrowsPresentation.release_date
  const yesterdaysPresentation = presentationDays[yesterdaysPresentationIndex]
  const yesterdaysPresentationReleaseDate = yesterdaysPresentation.release_date

  return {
    todaysPresentation,
    tomorrowsPresentationReleaseDate,
    yesterdaysPresentationReleaseDate,
  }
}


export const formatDateForUrl = (date?: string) => {
  if (!date) return ""
  const dateObj = dayjs(date)
  return dateObj.format("MM-DD")
}

export const parseDateFromUrl = (date?: string) => {
  if (!date) return ""
  const dateObj = dayjs(date, "MM-DD")
  return dateObj.format("MMM D")
}

export function getGoogleSlidesEmbedUrl(slideUrl: string): string | null {
  const match = slideUrl.match(/presentation\/d\/([^/]+)/);
  if (!match) return null;

  const presentationId = match[1];
  return `https://docs.google.com/presentation/d/${presentationId}/embed?start=false&loop=false&delayms=3000#slide=id.p`;
}
