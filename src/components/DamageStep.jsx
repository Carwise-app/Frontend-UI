import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import ClickableChip from './ClickableChip'
import DamageStepCard from './DamageStepCard';


export default function DamageStep({stepLabel, onClick}) {
    const [tramer, setTramer] = useState('');
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
            <Box className="flex items-center justify-center bg-white border-gray-100 rounded-md shadow-xs border-1">                
                <TextField
                    sx={{width:"90%"}}
                    label="Tramer Bilgisi"
                    value={tramer}
                    onChange={(e) => setTramer(e.target.value)}
                    placeholder="Örn: 1200"
                    type="text"
                    variant="outlined"
                />                      
            </Box>
        </Box>
    </Box>
  )
}
