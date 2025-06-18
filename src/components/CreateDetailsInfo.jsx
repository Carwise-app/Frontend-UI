import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import CustomizedSteppers from './CustomizedSteppers'
import DamageStepCard from './DamageStepCard';

export default function LearnKmMainPage({activeStep,onHandleBack,stepLabel,onHandleNext,title,desc,allSteps}) {
    const [kmValue, setKmValue] = useState('');
    const [engineSizeValue, setEngineSizeValue] = useState('');
    const [enginePowerValue, setEnginePowerValue] = useState('')
    const [color, setColor] = useState("");
    const [gearType, setGearType] = useState(""); 
    const [tractionType, setTractionType] = useState("");
  
    const tractionTypeOptions = ["Önden Çekiş","Arkadan İtiş", "4x4"];

    // Component yüklendiğinde localStorage'dan verileri yükle
    useEffect(() => {
        const savedKm = localStorage.getItem("selectedKm") || '';
        const savedEngineSize = localStorage.getItem("selectedMotorHacmi") || '';
        const savedEnginePower = localStorage.getItem("selectedMotorGucu") || '';
        const savedTractionType = localStorage.getItem("selectedTractionType") || '';

        setKmValue(savedKm);
        setEngineSizeValue(savedEngineSize);
        setEnginePowerValue(savedEnginePower);
        setTractionType(savedTractionType);
    }, []);

    // State değişikliklerinde localStorage'a kaydet
    useEffect(() => {
        if (kmValue !== '') {
            localStorage.setItem("selectedKm", kmValue);
        }
    }, [kmValue]);

    useEffect(() => {
        if (engineSizeValue !== '') {
            localStorage.setItem("selectedMotorHacmi", engineSizeValue);
        }
    }, [engineSizeValue]);

    useEffect(() => {
        if (enginePowerValue !== '') {
            localStorage.setItem("selectedMotorGucu", enginePowerValue);
        }
    }, [enginePowerValue]);

    useEffect(() => {
        if (tractionType !== '') {
            localStorage.setItem("selectedTractionType", tractionType);
        }
    }, [tractionType]);
  
    // Binlik ayraçlı gösterim için yardımcı fonksiyon
    const formatNumberWithDots = (value) => {
      if (!value) return '';
      // Sadece rakamları al, baştaki sıfırları koru
      const onlyDigits = value.replace(/\D/g, '');
      return onlyDigits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handleChange = (e) => {
      setColor(e.target.value);
    };

    const isFormValid = 
      kmValue !== "" &&
      engineSizeValue !== "" &&
      enginePowerValue !== "" &&
      tractionType !== "";

    
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
          <form className='flex flex-col gap-y-3' >
            <Box className="flex mx-auto">
              <DamageStepCard title="Çekiş Tipi" options={tractionTypeOptions}  selectedChip={tractionType}  setSelectedChip={setTractionType}/>
            </Box>
            <Box className="flex flex-col gap-y-4 px-4 py-8 bg-white rounded-md border-gray-100 shadow-sm border-1">
              <TextField
                fullWidth
                label="Kilometre Bilgisi"
                value={formatNumberWithDots(kmValue)}
                onChange={(e) => {
                    const onlyDigits = e.target.value.replace(/\D/g, '');
                    if (onlyDigits.length <= 7) {
                    setKmValue(onlyDigits);
                    }
                }}
                InputProps={{
                endAdornment: <InputAdornment position="end">KM</InputAdornment>
              }}
                placeholder="Örn: 120000"
                type="text"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Motor Hacmi"
                value={formatNumberWithDots(engineSizeValue)}
                onChange={(e) => {
                    const onlyDigits = e.target.value.replace(/\D/g, '');
                    if (onlyDigits.length <= 4) {
                    setEngineSizeValue(onlyDigits);
                    }
                }}
                InputProps={{
                endAdornment: <InputAdornment position="end">cc</InputAdornment>
              }}
                placeholder='Örn: 1598'
                type='text'
                variant='outlined'
              />
              <TextField
                fullWidth
                label="Motor Gücü"
                value={formatNumberWithDots(enginePowerValue)}
                onChange={(e) => {
                    const onlyDigits = e.target.value.replace(/\D/g, '');
                    if (onlyDigits.length <= 4) {
                    setEnginePowerValue(onlyDigits);
                    }
                }}
                InputProps={{
                endAdornment: <InputAdornment position="end">hp</InputAdornment>
              }}
                placeholder='Örn: 140'
                type='text'
                variant='outlined'
              />
            </Box>
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
