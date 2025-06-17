import { Box, buttonBaseClasses, Tooltip } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

export default function LearnPriceCard({content, onClick}) {

  const spanRef = useRef(null)
  const [isOverflowed, setIsOverflowed] = useState(false)

  useEffect(() => {
    const el = spanRef.current
    if (el) {
      setIsOverflowed(el.scrollWidth > el.offsetWidth)
    }
  }, [content])

  const TextElement = (
    <span
      ref={spanRef}
      className="block w-full max-w-[160px] mx-auto overflow-hidden whitespace-nowrap text-ellipsis text-center"
    >
      {content}
    </span>
  )

  return (

    <button onClick={onClick}>
      <Box className="py-4  rounded-lg duration-300 cursor-pointer text-sm font-medium min-w-[172px]
          bg-white border-1 border-black hover:border-[#dc143c] hover:bg-[#dc143c] hover:text-white"
      >
        {isOverflowed ? (
          <Tooltip title={content} arrow>
            {TextElement}
          </Tooltip>
        ) : (
          TextElement
        )}
      </Box>
    </button>
  )
}
