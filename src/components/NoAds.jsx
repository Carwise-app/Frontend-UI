import { Box } from '@mui/material'
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import React from 'react'

export default function NoAds({title, desc, textBtn, onClick}) {
  return (
    <Box className="flex flex-col items-center w-full py-5 text-black bg-white border-gray-100 rounded-md shadow-md gap-y-1 border-1">
        <InfoOutlineIcon sx={{fontSize:80, color:"#dc143c"}}/>
        <span className='text-2xl font-medium'>{title}</span>
        <span className='text-lg'>{desc}</span>
        <button onClick={onClick} className='py-2 px-4 mt-3  bg-[#dc143c] text-lg text-white rounded-sm cursor-pointer'>{textBtn}</button>
    </Box>
  )
}
