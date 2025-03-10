import { Suspense } from "react"
import SlidesListClient from "@/components/SlidesListClient"

export default function SlidesPage() {
  return (
    <Suspense fallback={<div>Loading slides...</div>}>
      <SlidesListClient />
    </Suspense>
  )
}
