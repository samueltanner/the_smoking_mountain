import { Suspense } from "react"
import SlidesListClient from "@/components/SlidesListClient"
import { searchIndex, presentationText } from "@/data/searchIndex"

export default function SlidesPage() {
  return (
    <Suspense fallback={<div>Loading slides...</div>}>
      <div className="w-full pb-12">
        <SlidesListClient
          searchIndex={searchIndex}
          presentationText={presentationText}
        />
      </div>
    </Suspense>
  )
}
