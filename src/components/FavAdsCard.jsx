import { Box, IconButton, Tooltip } from '@mui/material'
import AdsPhoto from '../assets/DenemeArabaCard2.jpg'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ClearIcon from '@mui/icons-material/Clear';
import React from 'react'

export default function FavAdsCard() {
  return (
   <Box className="grid grid-cols-[1fr_2fr_1fr_1fr_0.5fr] w-full max-h-30 h-30 bg-white rounded-sm shadow-md gap-x-1 cursor-pointer border-1 border-gray-100 transition-transform duration-300 hover:-translate-y-1">
      <Box className="flex items-center justify-center w-full bg-gray-100 rounded-l-sm h-30 max-h-30">
        <img
          src={AdsPhoto}
          alt="ad"
          className="object-contain h-full"
        />
      </Box>        
      <Box className="flex items-center justify-center text-lg font-medium">
        <span>Ford Focus 1.5 EcoBlue Active</span>
      </Box>
      <Box className="flex items-center text-xl text-[#dc143c] font-medium border-l border-gray-100 justify-center">
        <span>5.500.785 ₺</span>
      </Box>
      <Box className="flex items-center justify-center border-l border-gray-100">
        <LocationOnIcon/>
        <span className='text-sm'>İstanbul/Beylikdüzü</span>
      </Box>
      <Box className="flex items-center justify-center">
        <Tooltip title="Favorilerden Çıkar" arrow placement="right">
          <IconButton>
            <ClearIcon sx={{fontSize:25, color:"#dc143c"}}/>
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}
