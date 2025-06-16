import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import CustomizedSteppers from './CustomizedSteppers';
import DamageStepCard from './DamageStepCard';

export default function CreateAdvertsPrice({title, desc, allSteps, stepLabel, activeStep, onHandleNext, onHandleBack}) {
  return (
   <Box className='bg-[#f7f7f7] w-[70%] pt-5 pb-15 my-5 mx-auto rounded-sm min-h-160'>
        <Box className="bg-white w-[70%] mx-auto py-5 px-10 rounded-md flex flex-col shadow-xs border-1 border-gray-100">
          <span className='mb-2 text-3xl'>{title}</span>
          <span className='text-sm text-gray-600'>{desc}</span>
        </Box>
        <Box className="w-[70%] mx-auto mt-5">
          <CustomizedSteppers allSteps={allSteps} activeStep={activeStep} />
        </Box>
        <Box className="flex justify-between items-center w-[70%] mx-auto mt-5">
          <Button onClick={onHandleBack} variant='outlined' color='error'>Geri</Button>
        </Box>
        <Box className="flex flex-col w-[70%] mx-auto mt-4 gap-y-4">
          <Box className="bg-white rounded-md shadow-xs ">
            <Box className="px-2 py-2">
              <span className='text-lg'>{stepLabel}</span>
            </Box>
          </Box>
          <form className='flex flex-col gap-y-3' >
          
          </form>
        </Box>
      </Box>
  )
}
