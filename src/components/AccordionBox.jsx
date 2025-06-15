import { Accordion, AccordionDetails, AccordionSummary, Box, TextField} from '@mui/material';
import ExpandMoreIcon  from '@mui/icons-material/ExpandMore';
import React from 'react'

export default function AccordionBox({title, minValue, onMinChange, maxValue, onMaxChange, labelMin, labelMax}) {
  return (
    <Accordion disableGutters square className="rounded-none">
        <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{fontSize:20}}/>}
        >
            <span className='font-semibold'>{title}</span>
        </AccordionSummary>
        <AccordionDetails className='flex flex-col gap-y-2'>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <TextField
                label={labelMin} type="text" size="small" fullWidth
                value={minValue} onChange={onMinChange}
              />
              <TextField
                label={labelMax} type="text" size="small" fullWidth
                value={maxValue} onChange={onMaxChange}
              />
            </Box>
        </AccordionDetails>
    </Accordion>
  )
}
