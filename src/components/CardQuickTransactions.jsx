import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Box } from '@mui/material'

export default function CardQuickTransactions({icon, title, description}) {
  return (
    <Box className="grid grid-cols-[1fr_3fr_1fr] h-40 cursor-pointer bg-neutral-50 shadow-md rounded-md border-1 border-gray-100 transition-transform duration-300 hover:-translate-y-2">
              <Box>
                <Box className="inline-flex items-center justify-center p-3 rounded-tr-full rounded-bl-full rounded-br-full bg-amber-100 ">
                  {icon}
                </Box>
              </Box>
              <Box>
                <Box className="flex flex-col mt-7 gap-y-1">
                  <span className='text-[28px] font-semibold'>{title}</span>
                  <span className='text-[15px] text-gray-600'>{description}</span>
                </Box>
              </Box>
              <Box>
                <Box className="flex items-center justify-center h-full">
                  <ArrowForwardIosIcon sx={{fontSize:40, color:'gray'}}/>
                </Box>
              </Box>
            </Box>
  )
}
