import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import NavBar from "@/components/NavBar"

export const metadata: Metadata = {
  title: "The Smoking Mountain",
  description: "Mount St. Helens",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/ijg2fna.css"
        ></link>
        <link rel="stylesheet" href="https://use.typekit.net/pje1jwb.css" />
      </head>
      <body
        suppressHydrationWarning={true}
        className={`bg-dark-blue font-main relative flex h-svh w-svw flex-col items-center overflow-auto`}
      >
        <NavBar />
        {children}
      </body>
    </html>
  )
}
