import { Accordion, AccordionDetails, AccordionSummary, FormGroup} from '@mui/material';
import ExpandMoreIcon  from '@mui/icons-material/ExpandMore';
import React from 'react'

export default function AccordionBox({title}) {
  return (
    <Accordion disableGutters square className="rounded-none">
        <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{fontSize:20}}/>}
        >
            <span className='font-semibold'>{title}</span>
        </AccordionSummary>
        <AccordionDetails className='flex flex-col gap-y-2'>
            <input  type="text" className='bg-gray-100 w-full py-1 px-2 rounded-sm'  maxLength={11} placeholder='Min'/>
            <input  type="text" className='bg-gray-100 w-full py-1 px-2 rounded-sm' maxLength={11} placeholder='Max'/>
        </AccordionDetails>
    </Accordion>
  )
}
