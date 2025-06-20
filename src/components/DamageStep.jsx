import { Box, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import DamageStepCard from './DamageStepCard';

export default function DamageStep({stepLabel, onClick}) {
    const [tramer, setTramer] = useState('');
    const options = ["Orijinal", "Boyalı", "Lokal Boyalı", "Değişen" ];
    const categories = [
        "Ön Tampon","Arka Tampon",
        "Sol ön çamurluk","Motor kaputu","Sağ ön çamurluk",
        "Sol ön kapı","Sol arka kapı",
        "Sağ ön kapı","Sağ arka kapı",
        "Tavan",
        "Sol arka çamurluk","Arka kaput","Sağ arka çamurluk"
    ]
    
    const [selectedChips, setSelectedChips] = useState(() => {
        const savedDamage = localStorage.getItem('selectedDamage');
        if (savedDamage) {
            const parsed = JSON.parse(savedDamage);
            return parsed.chips || {};
        }
        
        const init = {};
        categories.forEach(cat => {
            init[cat] = "Orijinal";
        });
        return init;
    });

    
    useEffect(() => {
        const savedDamage = localStorage.getItem('selectedDamage');
        if (savedDamage) {
            const parsed = JSON.parse(savedDamage);
            if (parsed.tramer) {
                setTramer(parsed.tramer);
            }
        }
    }, []);
  
    const handleChipChange = (category, value) => {
        const newSelectedChips = {
            ...selectedChips,
            [category]: value
        };
        setSelectedChips(newSelectedChips);
        
        
        const damageData = {
            chips: newSelectedChips,
            tramer: tramer
        };
        localStorage.setItem('selectedDamage', JSON.stringify(damageData));
    };

    const handleTramerChange = (value) => {
        setTramer(value);
        
    
        const damageData = {
            chips: selectedChips,
            tramer: value
        };
        localStorage.setItem('selectedDamage', JSON.stringify(damageData));
    };
    
  return (
    <Box>
        <Box className="bg-white border-gray-100 rounded-md shadow-xs border-1">
            <Box className="w-[95%] mx-auto py-2">
                <span className='text-lg'>{stepLabel}</span>
            </Box>
        </Box>
        <Box className="grid grid-cols-[1fr_1fr] w-full h-auto gap-4 mt-2">
            {categories.map((category)=>(
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
                    onChange={(e) => handleTramerChange(e.target.value)}
                    placeholder="Örn: 1200"
                    type="number"
                    variant="outlined"
                    inputProps={{ min: 0, step: 1 }}
                />                      
            </Box>
        </Box>
    </Box>
  )
}
