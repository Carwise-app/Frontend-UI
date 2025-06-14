import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import CustomizedSteppers from './CustomizedSteppers'

export default function LearnKmMainPage({activeStep,onHandleBack,stepLabel,onHandleNext}) {
    const [kmValue, setKmValue] = useState('');
  return (
    <Box className='bg-[#f7f7f7] w-[70%] pt-5 pb-15 my-5 mx-auto rounded-sm min-h-160'>
        <Box className="bg-white w-[70%] mx-auto py-5 px-10 rounded-md flex flex-col shadow-xs border-1 border-gray-100">
          <span className='mb-2 text-3xl'>Arabam Kaç Para?</span>
          <span className='text-sm text-gray-600'>Araç bilgilerinizi seçerek aracınızın fiyatı öğrenin.</span>
        </Box>
        <Box className="w-[70%] mx-auto mt-5">
          <CustomizedSteppers activeStep={activeStep} />
        </Box>
        <Box className="flex justify-between items-center w-[70%] mx-auto mt-5">
          <Button onClick={onHandleBack} variant='outlined' color='error'>Geri</Button>
        </Box>
        <Box className="flex flex-col w-[70%] mx-auto mt-4 gap-y-4">
          <Box className="bg-white border-gray-100 rounded-md shadow-xs border-1">
            <Box className="w-[95%] mx-auto py-2">
              <span className='text-lg'>{stepLabel}</span>
            </Box>
          </Box>
          <TextField
            fullWidth
            label="Kilometre Bilgisi"
            value={kmValue}
            onChange={(e) => setKmValue(e.target.value)}
            placeholder="Örn: 120000"
            type="text"
            variant="outlined"
          />
          <Button
            onClick={onHandleNext}
            variant='contained'
            color='error'
            className='flex w-[30%]'
            disabled={!kmValue.trim()}
          >
            Devam Et
          </Button>
        </Box>
      </Box>
  )
}
