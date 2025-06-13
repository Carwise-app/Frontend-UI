import { Box, Card, CardContent, CardMedia, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import CardPhoto from '../assets/DenemeArabaCard.webp'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React from 'react'

export default function SearchCarList({title}) {
  return (
        <Box className="bg-white shadow-sm rounded-sm w-full h-50 flex cursor-pointer hover:shadow-[#ffb8c6] overflow-hidden">
            <Box className="bg-gray-50 w-[30%] object-contain rounded-l-xl flex items-center justify-center">
                <img className='object-contain pointer-events-none' src={CardPhoto} alt="car photo" />
            </Box>
            <Box className="w-[67%] mx-auto my-2 ">
                <Box className="flex justify-between text-xs text-gray-500">
                    <span>İlan Numarası: 1210606005</span>
                    <Stack className='flex items-center'>
                        <span>Küçükçekmece/İstanbul</span>
                        <span>31 Haziran 2024</span>
                    </Stack>
                </Box>
                <Stack className='mt-2'>
                    <span className='text-xl truncate w-[480px] block'>{title}</span>
                    <span className='text-sm text-gray-400 truncate w-[400px] block'>Doktordan boyasız değişensiz araba</span>
                </Stack>
                <Box className="flex mt-3 gap-x-4 gap-y-1 flex-wrap w-[80%]">
                        <span className='text-base block truncate w-[120px]'><ArrowForwardIcon fontSize='small'/>44.558 Km</span>
                        <span className='text-base block truncate w-[120px]'><ArrowForwardIcon fontSize='small'/>Yarı Otomatik</span>
                        <span className='text-base block truncate w-[120px]'><ArrowForwardIcon fontSize='small'/>Galericiden</span>
                        <span className='text-base block truncate w-[120px]'><ArrowForwardIcon fontSize='small'/>2023</span>
                        <span className='text-base block truncate w-[120px]'><ArrowForwardIcon fontSize='small'/>Benzin&LPG</span>
                        <span className='text-base block truncate w-[120px]'><ArrowForwardIcon fontSize='small'/>115 hp</span>
                </Box>
                <Box className="flex justify-end">
                    <span className='text-2xl font-bold text-[#dc143c]'>1.589.552 ₺</span>
                </Box>
            </Box>
        </Box>
    
  )
}


{/* <Card className='flex w-full h-40'>
                <CardMedia 
                    className='object-contain border-gray-200 border-r-1'
                    component="img"
                    sx={{width:250, height:"100%"}}
                    image={CardPhoto}
                    alt='car photo'
                />
                <CardContent className='p-0'>
                    <Box className="flex justify-between w-full">
                        <span className='text-xl font-semibold'>Ford Focus 1.0 EcoBoost Active Stil</span>
                        <span>31 Mayıs 2025</span>
                    </Box>
                </CardContent>
            </Card> */}
{/* <Card sx={{ display: 'flex' }} className='h-40 w-180'>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={CardPhoto}
            alt="Live from space album cover"
          />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
            Mac Miller
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          sa
        </Box>
      </Box>
    </Card> */}