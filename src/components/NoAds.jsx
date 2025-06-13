import { Box } from '@mui/material'
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import React from 'react'

export default function NoAds({title}) {
  return (
    <Box className="flex flex-col items-center gap-y-1 py-5 w-full bg-white rounded-md shadow-md text-black">
        <InfoOutlineIcon sx={{fontSize:80, color:"#dc143c"}}/>
        <span className='text-2xl font-medium'>{title}</span>
        <span className='text-lg'>Hemen ilan ver ve milyonlarca alıcıya anında ulaş</span>
        <button className='py-2 px-4 mt-3  bg-[#dc143c] text-lg text-white rounded-sm'>Hemen ilan ver</button>
    </Box>
  )
}
