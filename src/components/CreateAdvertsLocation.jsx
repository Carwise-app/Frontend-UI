import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import CustomizedSteppers from './CustomizedSteppers';
import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function CreateAdvertsLocation({title, desc, allSteps, stepLabel, activeStep, onHandleNext, onHandleBack}) {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');


  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedDistrict(''); 
    setSelectedNeighborhood('');
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedNeighborhood('');
  };


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
                <form className='grid grid-cols-3 gap-x-4' >  
                  <FormControl fullWidth size='medium'>
                    <InputLabel id="demo-simple-select-label">İl</InputLabel>
                    <Select
                      value={selectedCity}
                      label="İl"
                      onChange={handleCityChange}
                    >
                        <MenuItem value="naber">naber</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth size='medium' disabled={!selectedCity}>
                    <InputLabel id="demo-simple-select-label">İlçe</InputLabel>
                    <Select
                     value={selectedDistrict}
                      label="İlçe"
                      onChange={handleDistrictChange}
                    >
                        <MenuItem value="naber">naber</MenuItem>
                    </Select>
                  </FormControl> 
                  <FormControl fullWidth size='medium' disabled={!selectedDistrict}>
                    <InputLabel id="demo-simple-select-label">Mahalle</InputLabel>
                    <Select
                      value={selectedNeighborhood}
                      label="Mahalle"
                    >
                        <MenuItem value="naber">naber</MenuItem>
                    </Select>
                  </FormControl>     
                </form>
              </Box>
            </Box>
          </Box>
  )
}
