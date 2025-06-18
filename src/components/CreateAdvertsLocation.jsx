import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react'
import CustomizedSteppers from './CustomizedSteppers';
import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function CreateAdvertsLocation({title, desc, allSteps, stepLabel, activeStep, onHandleNext, onHandleBack}) {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');

  // API data states
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);

  // Component yüklendiğinde localStorage'dan verileri yükle
  useEffect(() => {
    const savedCity = localStorage.getItem("selectedCity") || '';
    const savedDistrict = localStorage.getItem("selectedDistrict") || '';
    const savedNeighborhood = localStorage.getItem("selectedNeighborhood") || '';

    setSelectedCity(savedCity);
    setSelectedDistrict(savedDistrict);
    setSelectedNeighborhood(savedNeighborhood);
  }, []);

  // State değişikliklerinde localStorage'a kaydet
  useEffect(() => {
    if (selectedCity !== '') {
      localStorage.setItem("selectedCity", selectedCity);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict !== '') {
      localStorage.setItem("selectedDistrict", selectedDistrict);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedNeighborhood !== '') {
      localStorage.setItem("selectedNeighborhood", selectedNeighborhood);
    }
  }, [selectedNeighborhood]);

  // Fetch provinces (cities)
  useEffect(() => {
    fetch('https://turkiyeapi.herokuapp.com/api/v1/provinces')
      .then(r => r.json())
      .then(d => setProvinces(d.data))
      .catch(console.error);
  }, []);

  // Fetch districts when city changes
  useEffect(() => {
    if (selectedCity) {
      fetch(`https://turkiyeapi.herokuapp.com/api/v1/provinces?name=${selectedCity}`)
        .then(r => r.json())
        .then(d => setDistricts(d.data[0]?.districts || []))
        .catch(console.error);
    } else {
      setDistricts([]);
    }
  }, [selectedCity]);

  // Fetch neighborhoods when district changes
  useEffect(() => {
    if (selectedDistrict) {
      // Find the selected district's ID from districts
      const selectedDistrictData = districts.find(d => d.name === selectedDistrict);
      if (selectedDistrictData) {
        fetch(`https://turkiyeapi.dev/api/v1/districts/${selectedDistrictData.id}`)
          .then(r => r.json())
          .then(d => setNeighborhoods(d.data.neighborhoods || []))
          .catch(console.error);
      }
    } else {
      setNeighborhoods([]);
    }
  }, [selectedDistrict, districts]);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedDistrict(''); 
    setSelectedNeighborhood('');
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedNeighborhood('');
  };

  const handleNeighborhoodChange = (e) => {
    setSelectedNeighborhood(e.target.value)
  }

  const isFormValid = 
      selectedCity !== "" &&
      selectedDistrict !== "" && 
      selectedNeighborhood !== "";

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
              <Box className="bg-white rounded-md shadow-xs">
                <Box className="px-2 py-2">
                  <span className='text-lg'>{stepLabel}</span>
                </Box>
              </Box>
              <Box >
                <form>
                    <Box className='grid grid-cols-3 gap-x-4'>
                        <FormControl fullWidth size='medium'>
                            <InputLabel id="demo-simple-select-label">İl</InputLabel>
                            <Select
                            value={selectedCity}
                            label="İl"
                            onChange={handleCityChange}
                            >
                                <MenuItem value="">Seçim yapma</MenuItem>
                                {provinces.map((province) => (
                                    <MenuItem key={province.name} value={province.name}>
                                        {province.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth size='medium' disabled={!selectedCity}>
                            <InputLabel id="demo-simple-select-label">İlçe</InputLabel>
                            <Select
                            value={selectedDistrict}
                            label="İlçe"
                            onChange={handleDistrictChange}
                            >
                                <MenuItem value="">Seçim yapma</MenuItem>
                                {districts.map((district) => (
                                    <MenuItem key={district.name} value={district.name}>
                                        {district.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl> 
                        <FormControl fullWidth size='medium' disabled={!selectedDistrict}>
                            <InputLabel id="demo-simple-select-label">Mahalle</InputLabel>
                            <Select
                            value={selectedNeighborhood}
                            label="Mahalle"
                            onChange={handleNeighborhoodChange}
                            >
                                <MenuItem value="">Seçim yapma</MenuItem>
                                {neighborhoods.map((neighborhood) => (
                                    <MenuItem key={neighborhood.name} value={neighborhood.name}>
                                        {neighborhood.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>  
                    </Box>  
                  <Box className="flex justify-end mt-4">
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
