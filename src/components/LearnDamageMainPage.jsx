import { Box, Button } from '@mui/material'
import React from 'react'
import CustomizedSteppers from './CustomizedSteppers'
import DamageStep from './DamageStep'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function LearnDamageMainPage({activeStep,onHandleBack,stepLabel,onHandleNext}) {
  return (
   <Box className='bg-[#f7f7f7] w-[70%] pt-5 pb-15 my-5 mx-auto rounded-sm min-h-160 shadow-xs border-1 border-gray-100'>
        <Box className="bg-white w-[70%] mx-auto py-5 px-10 rounded-md flex flex-col shadow-md ">
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
          <DamageStep onClick={onHandleNext} onNext={() => console.log('Hasar bilgisi tamamlandı')} stepLabel={stepLabel} />
            <Box>
                <Box className="flex items-center justify-center h-full">
                    <button className='bg-[#dc143c] py-2 px-6 text-white rounded-2xl cursor-pointer' onClick={onHandleNext}>
                        <span>Aracının Fiyatını Öğren</span>
                        <NavigateNextIcon/>
                    </button>   
                </Box>
            </Box>
        </Box>
      </Box>
  )
}
