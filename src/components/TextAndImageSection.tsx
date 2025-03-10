"use client"
import Image from "next/image"
import { forwardRef, RefObject, useEffect, useRef, useState } from "react"
import { motion, useInView } from "motion/react"

const TextAndImageSection = forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode
    imageUrl: string
    secondaryImageUrl?: string
    className?: string
    imagePosition?: "left" | "right" | "top" | "bottom"
    imageWidthPct?: number
    altText?: string
    subText?: string
    secondaryAltText?: string
    secondarySubText?: string
  }
>(
  (
    {
      children,
      imageUrl,
      secondaryImageUrl,
      className = "bg-white rounded-3xl p-8",
      imagePosition = "right",
      imageWidthPct = 50,
      altText = "",
      subText = "",
      secondaryAltText = "",
      secondarySubText = "",
    },
    ref
  ) => {
    const imagePositionClass = {
      left: "flex-row-reverse",
      right: "flex-row",
      top: "flex-col-reverse",
      bottom: "flex-col",
    }
    const isInView = useInView(ref as RefObject<HTMLDivElement>, {
      amount: 0.1,
      once: true,
    })

    return (
      <motion.div
        ref={ref}
        className={`flex flex-col gap-8 ${className}`}
        animate={isInView ? "visible" : "hidden"}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 50 },
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        <div
          className={`flex flex-col gap-8 ${imagePositionClass[imagePosition]}`}
        >
          <div
            style={
              imagePosition === "top" || imagePosition === "bottom"
                ? {
                    width: `${imageWidthPct}%`,
                  }
                : {
                    width: `${100 - imageWidthPct}%`,
                  }
            }
            className="flex flex-col gap-8 items-center justify-center"
          >
            {children}
          </div>
          <div className="flex flex-row gap-4">
            <div
              className="flex flex-col gap-2 items-center justify-center flex-grow"
              style={{
                width: `${imageWidthPct}%`,
              }}
            >
              <span className="relative overflow-hidden rounded-2xl h-fit">
                <Image
                  src={imageUrl}
                  alt={altText}
                  className="w-full h-auto"
                  width={1000}
                  height={1000}
                  sizes={`${imageWidthPct}vw`}
                  style={{
                    minWidth: "1000px",
                  }}
                />
              </span>
              {subText && (
                <div className="text-md text-gray-500 w-full justify-center items-center flex">
                  <p>{subText}</p>
                </div>
              )}
            </div>
            {secondaryImageUrl && (
              <div
                className="flex flex-col gap-2 items-center justify-center"
                style={{
                  width: `${imageWidthPct}%`,
                }}
              >
                <span className="relative overflow-hidden rounded-2xl h-fit">
                  <Image
                    src={secondaryImageUrl}
                    alt={secondaryAltText}
                    className="w-full h-auto"
                    width={1000}
                    height={1000}
                    sizes={`${imageWidthPct}vw`}
                    style={{
                      minWidth: "1000px",
                    }}
                  />
                </span>
                {secondarySubText && (
                  <div className="text-md text-gray-500 w-full justify-center items-center flex">
                    <p>{secondarySubText}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    )
  }
)

TextAndImageSection.displayName = "TextAndImageSection"

export default TextAndImageSection
