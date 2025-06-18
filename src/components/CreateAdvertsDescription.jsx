import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react'
import CustomizedSteppers from './CustomizedSteppers';
import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function CreateAdvertsDescription({title, desc, allSteps, stepLabel, activeStep, onHandleNext, onHandleBack}) {
  const [text, setText] = useState('');
  const maxLength = 2500;

  // Component yüklendiğinde localStorage'dan verileri yükle
  useEffect(() => {
    const savedDescription = localStorage.getItem("selectedDescription") || '';
    setText(savedDescription);
  }, []);

  // State değişikliklerinde localStorage'a kaydet
  useEffect(() => {
    if (text !== '') {
      localStorage.setItem("selectedDescription", text);
    }
  }, [text]);

  const handleChange = (e) => {
    if (e.target.value.length <= maxLength) {
      setText(e.target.value);
    }
  };

  const isFormValid = 
      text !== "" ;

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
              <Box >
                <form className='flex flex-col gap-y-3' >  
                  <TextareaAutosize
                    minRows={4}
                    value={text}
                    onChange={handleChange}
                    placeholder="İlan açıklamanızı buraya yazınız..."
                    className="w-full p-3 text-base bg-white border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500"
                    />
                  <Box className="flex justify-end mt-1">
                    <Typography
                      variant="caption"
                      className={text.length >= maxLength ? 'text-red-600' : 'text-gray-500'}
                      >
                      {maxLength - text.length} karakter kaldı
                    </Typography>
                  </Box>
                  <Box className="flex justify-end">
                    <Button variant='outlined' color='error' disabled={!isFormValid}  onClick={onHandleNext}>
                      Devam Et
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
          </Box>
  )
}
