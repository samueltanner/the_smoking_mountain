"use client"
import { getTodaysPresentation } from "@/utils/functions"
import { List, X } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const NavBar = () => {
  const router = useRouter()
  const todaysPresentation = getTodaysPresentation()
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (path: string) => {
    router.push(path)
    setIsOpen(false)
  }

  return (
    <div className="fixed top-2 left-2 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full bg-black p-2"
      >
        {isOpen ? (
          <X className="hover:text-tangerine fade-in-out z-[100] size-8 text-white" />
        ) : (
          <List className="hover:text-tangerine fade-in-out size-8 text-white drop-shadow-sm" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 left-0 -z-10 flex items-center justify-center bg-white"
            initial={{ opacity: 0, width: 0, height: 0 }}
            animate={{ opacity: 1, width: "100vw", height: "100vh" }}
            exit={{
              opacity: 0,
              width: 0,
              height: 0,
              transition: { delay: 0.25, duration: 0.75 },
            }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="*:hover:text-tangerine flex flex-col gap-8 text-xl font-bold text-black *:cursor-pointer *:disabled:cursor-not-allowed *:disabled:opacity-50 *:hover:disabled:text-black"
            >
              <button onClick={() => handleClick("/")} className="fade-in-out">
                Home
              </button>
              <button
                onClick={() =>
                  handleClick(`/slides/${todaysPresentation?.release_date}`)
                }
                disabled={!todaysPresentation}
                className="fade-in-out"
              >
                Today's Presentation
              </button>
              <button
                onClick={() => handleClick("/slides")}
                className="fade-in-out"
              >
                All Presentations
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default NavBar
