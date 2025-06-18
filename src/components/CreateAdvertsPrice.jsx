import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import CustomizedSteppers from './CustomizedSteppers';
import DamageStepCard from './DamageStepCard';

function formatNumber(value) {
 if (!value) return '';
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export default function CreateAdvertsPrice({title, desc, allSteps, stepLabel, activeStep, onHandleNext, onHandleBack}) {
  const [price, setPrice] = useState('');
  const [productTitle, setProductTitle] = useState('');

  // Component yüklendiğinde localStorage'dan verileri yükle
  useEffect(() => {
    const savedPrice = localStorage.getItem("selectedPrice") || '';
    const savedTitle = localStorage.getItem("selectedTitle") || '';

    setPrice(savedPrice);
    setProductTitle(savedTitle);
  }, []);

  // State değişikliklerinde localStorage'a kaydet
  useEffect(() => {
    if (price !== '') {
      localStorage.setItem("selectedPrice", price);
    }
  }, [price]);

  useEffect(() => {
    if (productTitle !== '') {
      localStorage.setItem("selectedTitle", productTitle);
    }
  }, [productTitle]);

  const isFormValid = 
      price !== "" &&
      productTitle !== "";
  
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
            <TextField
              fullWidth
              label="Fiyat Bilgisi Giriniz"
              value={formatNumber(price)}
              onChange={(e) => {
                const onlyDigits = e.target.value.replace(/\D/g, '');
                if (onlyDigits.length <= 10) {
                setPrice(onlyDigits);
                }
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">TL</InputAdornment>,
              }}
              placeholder="Örn: 2.000.000"
              type="text"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="İlanınız için başlık yazın"
              value={productTitle}
              onChange={(e) => {
                if(e.target.value.length <= 80){
                  setProductTitle(e.target.value);
                }
              }}
              placeholder='Sahibinden satılık araba'
              type='text'
              variant='outlined'
            />
            <Box className="flex justify-end">
              <Button variant='outlined' color='error' disabled={!isFormValid}  onClick={onHandleNext}>
                Devam Et
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
  )
}
