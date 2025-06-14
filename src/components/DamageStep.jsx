import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import ClickableChip from './ClickableChip'
import DamageStepCard from './DamageStepCard';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function DamageStep({stepLabel, onClick}) {
    const options = ["Belirtilmemiş","Orjinal", "Boyalı", "Lokal Boyalı", "Değişen" ];
    const categorys = [
        "Ön Tampon","Arka Tampon",
        "Sol ön çamurluk","Motor kaputu","Sağ ön çamurluk",
        "Sol ön kapı","Sol arka kapı",
        "Sağ ön kapı","Sağ arka kapı",
        "Tavan",
        "Sol arka çamurluk","Arka kaput","Sağ arka çamurluk"
    ]
    
    const [selectedChips, setSelectedChips] = useState(() => {
    const init = {};
    categorys.forEach(cat => {
      init[cat] = "Belirtilmemiş";
    });
    return init;
  });
  
    const handleChipChange = (category, value) => {
    setSelectedChips(prev => ({
        ...prev,
        [category]: value
    }));
    };
    
  return (
    <Box>
        <Box className="bg-white border-gray-100 rounded-md shadow-xs border-1">
            <Box className="w-[95%] mx-auto py-2">
                <span className='text-lg'>{stepLabel}</span>
            </Box>
        </Box>
        <Box className="grid grid-cols-[1fr_1fr] w-full h-auto gap-4 mt-2">
            {categorys.map((category)=>(
                <DamageStepCard 
                    key={category} 
                    selectedChip={selectedChips[category]} 
                    setSelectedChip={(value) => handleChipChange(category, value)} 
                    options={options} 
                    title={category}
                />
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
