import { Accordion, AccordionDetails, AccordionSummary, Radio, RadioGroup} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import ExpandMoreIcon  from '@mui/icons-material/ExpandMore';
import React from 'react'

export default function AccordionCheckBox({ title, options, onChange, name, type }) {

  return (
    <Accordion disableGutters square className="rounded-none !mb-0" >
        <AccordionSummary
            expandIcon={<ExpandMoreIcon  sx={{fontSize:20}}/>} 
        >
            <span className='font-semibold'>{title}</span>
        </AccordionSummary>
        <AccordionDetails className='flex flex-col overflow-y-auto max-h-35'>
            <RadioGroup className='space-y-0' name={name} value={type} onChange={onChange}>
                {options?.map((opt) => (
                    <FormControlLabel
                    className='hover:text-[#dc143c]'
                        key={opt}
                        value={opt}
                        control={
                        <Radio
                            sx={{
                                padding: '1px',            
                                transform: 'scale(0.7)',   
                                '&.Mui-checked': {
                                color: '#dc143c',       
                                },
                            }}
                        />
                        }
                        label={
                            <span className='text-sm select-none'>{opt}</span>
                        }
                    />
                ))}
              </RadioGroup>
        </AccordionDetails>
    </Accordion>
 )
}
