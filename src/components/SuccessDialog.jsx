import React from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box } from '@mui/material';

export default function SuccessDialog() {
  return (
    <Box className="flex flex-col gap-y-6">
        <Box className="flex flex-col items-center mb-2">
            <CheckCircleOutlineIcon sx={{fontSize:150, color:"green"}}/>
            <span className='text-4xl font-medium'>MAİL GÖNDERİLDİ</span>
        </Box>
        <Box className="flex flex-col mb-3">
            <span className='text-lg'>Şifrenizi yenilemek için mailinizi kontrol ediniz.</span>
            <span className='text-xs italic text-gray-600'>*Mailinizi bulamazsanız spam kutusu kontrol etmeyi unutmayın.</span>
        </Box>
    </Box>
  )
}
