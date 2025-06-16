import { Box } from '@mui/material'
import React from 'react'
import ClickableChip from './ClickableChip'

export default function DamageStepCard({setSelectedChip, selectedChip, options, title}) {
  
  
  return (
    <Box className="flex flex-col items-center bg-white border-gray-100 rounded-md shadow-xs border-1">
        <Box className="flex flex-col p-2 gap-y-2">
            <span className='font-medium'>{title}</span>
            <Box className="flex flex-wrap gap-2">
                {options.map((option) => (
                    <ClickableChip
                        key={option}
                        title={option}
                        selected={selectedChip === option}
                        onClick={() => setSelectedChip(option)}
                    />
                ))}
            </Box>   
        </Box>
    </Box>
  )
}
