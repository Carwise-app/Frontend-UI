import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'

export default function ChangeMailDialog() {
    const [click, setClick] = useState(false)
    
    const handleClick = () => {
        setClick(true);
    }
    
  return (
    <Box>
        {!click ? (
        <Box className="flex flex-col gap-y-4">
            <Box className="flex flex-col gap-y-4">
                <span>Onaylı e-mail adresinizi değiştirdiğinizde, yeni e-mail adresinizi onaylamanız gerekir.</span>
                <Box className="flex text-lg gap-x-2">
                    <span>Kayıtlı Mail Adresiniz:</span>
                    <span className="font-bold tracking-wide lowercase">Bgozupek@icloud.com</span>
                </Box>
            </Box>
            <form className='flex flex-col gap-y-4'>
                <Box>
                    <TextField
                            label="Email"
                            type="email"
                            fullWidth
                        />  
                </Box>
                <Box className="flex justify-center">
                    <Button
                        className='w-40'
                        variant="contained"
                        onClick={handleClick}
                        sx={{
                            backgroundColor: "#dc143c",
                            textTransform: "capitalize",
                            color: "white",
                            "&:disabled": {
                            backgroundColor: "rgba(220, 20, 60, 0.5)",
                            color: "#ffffff",
                            },
                        }}
                        type="button"
                    >
                        Mail gönder
                    </Button>
                </Box>
            </form>
        </Box>
        ): (
            <Box className="flex flex-col items-center gap-y-3">
                <span className='text-3xl text-[#dc143c] font-medium'>İşlem Başarılı</span>
                <Box className="flex flex-col items-center">
                    <span className='text-md'>Mail adresinize gelen aktivasyon linkine tıklayınız</span>
                    <span className='text-sm italic text-gray-400'>*spam klasörünüzü kontrol etmeyi unutmayın</span>
                </Box>
            </Box>
        )}
    </Box>
  )
}
