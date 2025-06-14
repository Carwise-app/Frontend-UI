import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import ClickableChip from './ClickableChip'
import DamageStepCard from './DamageStepCard';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function DamageStep({stepLabel, onClick}) {
  const [selectedChip, setSelectedChip] = useState("Belirtilmemiş");
  const options = ["Belirtilmemiş","Orjinal", "Boyalı", "Lokal Boyalı", "Değişen" ];
  const categorys = [
    "Ön Tampon","Arka Tampon",
    "Sol ön çamurluk","Motor kaputu","Sağ ön çamurluk",
    "Sol ön kapı","Sol arka kapı",
    "Sağ ön kapı","Sağ arka kapı",
    "Tavan",
    "Sol arka çamurluk","Arka kaput","Sağ arka çamurluk"
]
  
  return (
    <Box>
        <Box className="bg-white border-gray-100 rounded-md shadow-xs border-1">
            <Box className="w-[95%] mx-auto py-2">
                <span className='text-lg'>{stepLabel}</span>
            </Box>
        </Box>
        <Box className="grid grid-cols-[1fr_1fr] w-full h-auto gap-4 mt-2">
            {categorys.map((category)=>(
                <DamageStepCard selectedChip={selectedChip} setSelectedChip={setSelectedChip} options={options} title={category}/>
            ))}
            <Box>
                <Box className="flex items-center justify-center h-full">
                    <button className='bg-[#dc143c] py-2 px-6 text-white rounded-2xl cursor-pointer' onClick={onClick}>
                        <span>Aracının Fiyatını Öğren</span>
                        <NavigateNextIcon/>
                    </button>   
                </Box>
            </Box>
        </Box>
    </Box>
  )
}
