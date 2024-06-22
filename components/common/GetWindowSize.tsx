'use client'

import { useEffect, useState } from "react"

const GetWindowSize = () => {
const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 700 && window.innerHeight <= 700)
      console.log("xxxxxxxxxxx")
      console.log("setIsSmallScreen", isSmallScreen)
      console.log("height: " + window.innerHeight + " width: " + window.innerWidth)
      console.log(window.innerHeight <= 600)
      console.log(window.innerWidth <= 600)
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div>
        {isSmallScreen ? (
            <div>
                <div>this is sp</div>
            </div>
        ) : (
            <div>this is PC</div>
        )}
    </div>
  )
}

export default GetWindowSize