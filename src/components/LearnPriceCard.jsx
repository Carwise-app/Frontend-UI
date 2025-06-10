import { Box, buttonBaseClasses } from '@mui/material'
import React from 'react'

export default function LearnPriceCard({content, onClick}) {
  return (
    <button onClick={onClick}>
      <Box className="py-4  rounded-lg duration-300 cursor-pointer text-sm font-medium min-w-[172px]
          bg-white border-1 border-black hover:border-[#dc143c] hover:bg-[#dc143c] hover:text-white"
      >
          <span className='flex justify-center'>{content}</span>
      </Box>
    </button>
  )
}
