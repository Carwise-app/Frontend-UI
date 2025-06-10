import { Box, TextField } from '@mui/material'
import React from 'react'

export default function ForgotPasswordFormDialog({onSwitch, onSuccess}) {
  return (
    <Box className="flex flex-col gap-y-5">
        <span>Yeni şifre oluşturmak için kayıt olduğunuz mail adresini giriniz.</span>
        <TextField label="Email" type="email" fullWidth />
        <Box className="flex flex-col gap-y-2">
        <button className='bg-[#dc143c] py-3 w-[45%] mx-auto text-white font-medium rounded-md cursor-pointer' onClick={onSuccess}>
            <span>Gönder</span>
        </button>
        <button className='bg-gray-500 py-0.5  w-[15%] mx-auto text-white rounded-md cursor-pointer' onClick={onSwitch}>
            <span>Geri</span>
        </button>
        </Box>
    </Box>
  )
}
