// src/components/Banner.jsx
import { Box, Typography } from '@mui/material';
import BannerPhone from "../assets/BannerPhone.svg"
import React from 'react';

export default function MainPageBanner(){
  return (
    <Box
      className="bg-[#fefaff] px-32 py-22 flex items-center justify-between select-none "
    >
      {/* Yazılar */}
      <Box className="">
        <Typography className='pb-4'>
            <span className='font-black text-8xl'>Aracının en uygun</span> 
            <br/>
            <span className='font-black text-8xl'>fiyatı için</span>
        </Typography>
        <Typography>
            <span className='font-black text-8xl tracking-wide ms-19 text-[#dc143c]'>CARWISE</span>
        </Typography>
        <Typography>
            <span className='font-black text-8xl ms-75'>yanında</span>
        </Typography>
      </Box>

      {/* Görsel */}
      <Box>
        <img
          src={BannerPhone}
          alt="Carwise ile Arabam Ne Kadar?"
          className="w-[300px] md:w-[400px] pointer-events-none"
        />
      </Box>
    </Box>
  );
};

