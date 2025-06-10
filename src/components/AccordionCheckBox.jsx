import { Accordion, AccordionDetails, AccordionSummary, FormGroup, Box} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon  from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react'

export default function AccordionCheckBox({ title, options, selectedOptions, onChange }) {

  return (
    <Accordion disableGutters square className="rounded-none !mb-0" >
        <AccordionSummary
            expandIcon={<ExpandMoreIcon  sx={{fontSize:20}}/>} 
        >
            <span className='font-semibold'>{title}</span>
        </AccordionSummary>
        <AccordionDetails className='flex flex-col max-h-35 overflow-y-auto'>
            <FormGroup className='space-y-0'>
                {options?.map((opt) => (
                    <FormControlLabel
                    className='hover:text-[#dc143c]'
                        key={opt}
                        control={
                        <Checkbox
                            sx={{
                                padding: '1px',            
                                transform: 'scale(0.7)',   
                                '&.Mui-checked': {
                                color: '#dc143c',       
                                },
                            }}
                            checked={selectedOptions.includes(opt)}
                            onChange={() => onChange(opt)}
                        />
                        }
                            label={
                                <span className='text-sm select-none'>{opt}</span>
                            }
                    />
                ))}
              </FormGroup>
        </AccordionDetails>
    </Accordion>
 )
}
