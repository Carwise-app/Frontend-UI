// src/components/Banner.jsx
import { Box, Typography } from '@mui/material';
import BannerPhone from "../assets/BannerPhone.svg"
import React from 'react';

export default function MainPageBanner(){
  return (
    <Box
      className="bg-[#fefaff] px-4 sm:px-8 md:px-16 lg:px-32 py-8 sm:py-12 md:py-16 lg:py-22 flex flex-col md:flex-row items-center justify-between select-none gap-6 md:gap-0"
    >
      {/* Yazılar */}
      <Box className="order-2 text-center md:text-left md:order-1">
        {/* Desktop/Tablet Yazılar */}
        <Box className="hidden md:block">
          <Typography className='pb-4'>
            <span className='text-4xl font-black lg:text-6xl xl:text-8xl'>Aracının en uygun</span> 
            <br/>
            <span className='text-4xl font-black lg:text-6xl xl:text-8xl'>fiyatı için</span>
          </Typography>
          <Typography>
            <span className='font-black text-4xl lg:text-6xl xl:text-8xl tracking-wide text-[#dc143c]'>CARWISE</span>
          </Typography>
          <Typography>
            <span className='text-4xl font-black lg:text-6xl xl:text-8xl'>yanında</span>
          </Typography>
        </Box>

        {/* Mobil Yazılar */}
        <Box className="md:hidden">
          <Typography className='pb-2'>
            <span className='text-2xl font-black sm:text-3xl'>Aracının en uygun fiyatı için</span>
          </Typography>
          <Typography className='pb-2'>
            <span className='font-black text-2xl sm:text-3xl tracking-wide text-[#dc143c]'>CARWISE</span>
          </Typography>
          <Typography>
            <span className='text-2xl font-black sm:text-3xl'>yanında</span>
          </Typography>
        </Box>
      </Box>

      {/* Görsel */}
      <Box className="order-1 md:order-2">
        <img
          src={BannerPhone}
          alt="Carwise ile Arabam Ne Kadar?"
          className="hidden md:block w-[300px] lg:w-[400px] pointer-events-none"
        />
      </Box>
    </Box>
  );
};

