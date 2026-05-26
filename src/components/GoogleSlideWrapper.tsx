"use client"
import { useState } from "react"

const GoogleSlideWrapper = ({
  presentationUrl,
}: {
  presentationUrl?: string
}) => {
  const [interactive, setInteractive] = useState(false)

  return (
    <div
      className="relative mx-auto overflow-hidden rounded-3xl"
      style={{
        width: "min(100%, calc(100dvh * 16 / 9))",
        aspectRatio: "16 / 9",
      }}
      onMouseLeave={() => setInteractive(false)}
      onMouseEnter={() => setInteractive(true)}
    >
      <iframe
        src={presentationUrl}
        className="absolute inset-0 h-full w-full border-0"
        style={{ pointerEvents: interactive ? "auto" : "none" }}
        allowFullScreen
        loading="lazy"
        title="Google Slides Presentation"
      />
      {!interactive && (
        <button
          type="button"
          aria-label="Click to interact with slides"
          onClick={() => setInteractive(true)}
          className="absolute inset-0 cursor-pointer bg-transparent"
        />
      )}
    </div>
  )
}

export default GoogleSlideWrapper
