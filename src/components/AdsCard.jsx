import { Box, Chip, IconButton, Tooltip } from '@mui/material'
import AdsPhoto from '../assets/DenemeArabaCard2.jpg'
import EditIcon from '@mui/icons-material/Edit';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'

export default function AdsCard() {
  return (
     <Box className="grid grid-cols-[2fr_4fr_2fr_1fr_1fr] w-full max-h-30 h-30 bg-white rounded-sm shadow-sm gap-x-1 cursor-pointer border-1 border-gray-100 transition-transform duration-300 hover:-translate-y-1">
      <Box className="flex items-center justify-center w-full bg-gray-100 rounded-l-sm h-30 max-h-30">
        <img
          src={AdsPhoto}
          alt="ad"
          className="object-contain h-full"
        />
      </Box>        
      <Box className="flex items-center justify-center text-lg font-medium ">
        <span>Ford Focus 1.5 EcoBlue Active</span>
      </Box>
      <Box className="flex items-center text-xl text-[#dc143c] font-medium border-l border-gray-100 justify-center">
        <span>1.500.785 ₺</span>
      </Box>
      <Box className="flex items-center justify-center border-l border-gray-100">
        <Chip label="Aktif" color='success'/>
      </Box>
      <Box className="flex flex-col items-center justify-center ">
        <Tooltip title="Fiyat Değiştir" arrow placement="right">
          <IconButton>
            <EditIcon sx={{fontSize:20, color:"#3B82F6"}}/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Yayından Kaldır" arrow placement="right">
          <IconButton>
            <VisibilityOffIcon sx={{fontSize:20, color:"#8B5CF6"}}/>
          </IconButton>
        </Tooltip>
        <Tooltip title="İlanı Sil" arrow placement="right">
          <IconButton>
            <DeleteIcon sx={{fontSize:20, color:"#EF4444"}}/>
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}
