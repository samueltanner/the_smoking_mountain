import dayjs from "dayjs"
import presentationDays from "@/data/presentation_days.json"



export const getTodaysPresentation = (dateOverride?: string, allowFuture: boolean = false) => {
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




  if (!todaysPresentation) {
    for (let i = presentationDays.length - 1; i >= 0; i--) {
      const presentationDate = dayjs(`${currentYear}-${presentationDays[i].release_date}`, "YYYY-MM-DD")

      if (presentationDate.isBefore(targetDate, "day")) {
        todaysPresentation = presentationDays[i]
        break
      }
    }
  }

  return todaysPresentation
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
