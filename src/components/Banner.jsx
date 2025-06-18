// src/components/Banner.jsx
import { Box, Typography } from '@mui/material';
import BannerPhone from "../assets/BannerPhone.svg"
import React from 'react';

export default function MainPageBanner(){
  return (
    <Box
      className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-red-50 px-4 sm:px-8 md:px-16 lg:px-32 py-12 sm:py-16 md:py-20 lg:py-28 flex flex-col md:flex-row items-center justify-between select-none gap-8 md:gap-12"
    >
      {/* Background decorative elements */}
      <Box className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <Box className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-red-100 to-red-200 rounded-full opacity-20 blur-xl"></Box>
        <Box className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full opacity-20 blur-xl"></Box>
        <Box className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-full opacity-15 blur-lg"></Box>
      </Box>

      {/* Yazılar */}
      <Box className="order-2 text-center md:text-left md:order-1 relative z-10 flex-1">
        {/* Desktop/Tablet Yazılar */}
        <Box className="hidden md:block space-y-4">
          <Typography className='pb-2'>
            <span className='text-5xl font-black lg:text-7xl xl:text-8xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>Aracının en uygun</span> 
            <br/>
            <span className='text-5xl font-black lg:text-7xl xl:text-8xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>fiyatı için</span>
          </Typography>
          <Typography className='pb-2'>
            <span className='font-black text-5xl lg:text-7xl xl:text-8xl tracking-wide bg-gradient-to-r from-[#dc143c] to-[#ef4444] bg-clip-text text-transparent drop-shadow-lg'>CARWISE</span>
          </Typography>
          <Typography className='pb-6'>
            <span className='text-5xl font-black lg:text-7xl xl:text-8xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>yanında</span>
          </Typography>
        </Box>

        {/* Mobil Yazılar */}
        <Box className="md:hidden space-y-3">
          <Typography className='pb-2'>
            <span className='text-3xl font-black sm:text-4xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>Aracının en uygun fiyatı için</span>
          </Typography>
          <Typography className='pb-2'>
            <span className='font-black text-3xl sm:text-4xl tracking-wide bg-gradient-to-r from-[#dc143c] to-[#ef4444] bg-clip-text text-transparent'>CARWISE</span>
          </Typography>
          <Typography className='pb-4'>
            <span className='text-3xl font-black sm:text-4xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>yanında</span>
          </Typography>
        </Box>
      </Box>

      {/* Görsel */}
      <Box className="order-1 md:order-2 relative z-10 flex-1 flex justify-center md:justify-end">
        <img
          src={BannerPhone}
          alt="Carwise ile Arabam Ne Kadar?"
          className="w-[280px] sm:w-[320px] md:w-[350px] lg:w-[400px] xl:w-[450px] pointer-events-none drop-shadow-2xl animate-float"
        />
      </Box>
      
      {/* CSS Animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </Box>
  );
};

