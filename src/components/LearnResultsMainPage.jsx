import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip } from '@mui/material'
import React from 'react'
import CustomizedSteppers from './CustomizedSteppers'
import AnimatedPrice from './AnimatedPrice'
import ExpandMoreIcon  from '@mui/icons-material/ExpandMore';
import { NavLink } from 'react-router-dom';


export default function LearnResultsMainPage({activeStep,stepLabel}) {
  return (
   <Box className='bg-[#f7f7f7] w-[70%] pt-5 pb-15 my-5 mx-auto rounded-sm min-h-160 shadow-xs border-1 border-gray-100'>
        <Box className="bg-white w-[70%] mx-auto py-5 px-10 rounded-md flex flex-col shadow-md ">
          <span className='mb-2 text-3xl'>Arabam Kaç Para?</span>
          <span className='text-sm text-gray-600'>Araç bilgilerinizi seçerek aracınızın fiyatı öğrenin.</span>
        </Box>
        <Box className="w-[70%] mx-auto mt-5">
          <CustomizedSteppers activeStep={activeStep} />
        </Box>
        <Box className="flex flex-col w-[70%] mx-auto mt-4 gap-y-4">
            <Box className="bg-white border-gray-100 rounded-md shadow-xs border-1">
                <Box className="w-[95%] mx-auto py-2">
                    <span className='text-lg'>{stepLabel}</span>
                </Box>
            </Box>
            <Box className="flex flex-col items-center py-8 bg-white border-gray-100 rounded-md shadow-xs border-1 gap-y-10">
                <Box className="flex flex-col items-center w-full gap-y-2">
                    <span className='text-xl font-medium text-[#dc143c]'>Tahmini Değer</span>
                    <span className='font-semibold'><AnimatedPrice targetPrice={1577556}/></span>
                </Box>
                <Box className="flex flex-col items-center text-[#dc143c] bg-[rgba(255,80,115,0.2)] rounded-xl py-4 px-2">
                    <span className='text-lg font-semibold'>Tahminin Sapması</span>
                    <Box className="flex flex-col items-center gap-y-2">
                        <span className='text-2xl font-semibold'>±₺65.097</span>
                        <span className='text-xs italic text-gray-400'>*Bu değer, tahminin ortalama sapma miktarını gösterir</span>
                    </Box>
                </Box>
                <Box className="flex justify-center w-full px-10">
                    <Accordion disableGutters className="rounded-none w-[100%] ">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{fontSize:20}}/>}
                        >
                            <span className='font-semibold'>Sorgulanan Araç Bilgileri</span>
                        </AccordionSummary>
                        <AccordionDetails className='grid grid-cols-5 gap-3'>
                            <Chip label="BMW" sx={{color:"white"}} color='error'/>
                            <Chip label="2021" sx={{color:"white"}} color='error'/>
                            <Chip label="A4" sx={{color:"white"}} color='error'/>
                            <Chip label="Sedan" sx={{color:"white"}} color='error'/>
                            <Chip label="Dizel" sx={{color:"white"}} color='error'/>
                            <Chip label="Otomatik" sx={{color:"white"}} color='error'/>
                            <Chip label="Siyah" sx={{color:"white"}} color='error'/>
                            <Chip label="12.000 Km" sx={{color:"white"}} color='error'/>
                            <Chip label="4 Orjinal Parça" sx={{color:"white"}} color='error'/>
                            <Chip label="2 Boyalı Parça" sx={{color:"white"}} color='error'/>
                            <Chip label="4 Değişen Parça" sx={{color:"white"}} color='error'/>
                        </AccordionDetails>
                    </Accordion>
                </Box>
                <Box className="flex gap-x-5">
                    <NavLink to="/">
                        <Button variant='outlined' color='error'>
                            <span>Ana Sayfa</span> 
                        </Button> 
                    </NavLink>
                    <NavLink to="/fiyat-ogren">
                        <Button variant='outlined'>
                            <span>Başka Araç Sorgula</span>
                        </Button>      
                    </NavLink>
                </Box>
            </Box>
          
        </Box>
      </Box>
  )
}
