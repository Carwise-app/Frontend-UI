import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import CustomizedSteppers from './CustomizedSteppers'
import DamageStepCard from './DamageStepCard';

export default function LearnKmMainPage({activeStep,onHandleBack,stepLabel,onHandleNext,title,desc,allSteps}) {
    const [kmValue, setKmValue] = useState('');
    const [engineSizeValue, setEngineSizeValue] = useState('');
    const [enginePowerValue, setEnginePowerValue] = useState('')
    const [color, setColor] = useState("");
    const [gearType, setGearType] = useState(""); 
    const [tractionType, setTractionType] = useState("");
  
    const gearTypeOptions = ["Manuel", "Otomatik", "Yarı Otomatik"];
    const tractionTypeOptions = ["Önden Çekiş","Arkadan Çekiş", "4x4"];
    const colorOptions = ["Sarı", "Gri", "Mor", "Beyaz",  "Siyah", "Lacivert", "Kırmızı"]

    const handleChange = (e) => {
      setColor(e.target.value);
    };

    const isFormValid = 
      kmValue !== "" &&
      engineSizeValue !== "" &&
      enginePowerValue !== "" &&
      color !== "" &&
      gearType !== "" &&
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
          <Box className="bg-white rounded-md shadow-xs ">
            <Box className="px-2 py-2">
              <span className='text-lg'>{stepLabel}</span>
            </Box>
          </Box>
          <form className='flex flex-col gap-y-3' >
            <Box className="grid grid-cols-3 gap-x-1">
              <DamageStepCard title="Vites Tipi" options={gearTypeOptions} selectedChip={gearType}  setSelectedChip={setGearType}/>
              <DamageStepCard title="Çekiş Tipi" options={tractionTypeOptions}  selectedChip={tractionType}  setSelectedChip={setTractionType}/>
              <Box className="bg-white border-gray-100 rounded-md shadow-xs border-1">
                <Box className="flex flex-col p-2 font-medium gap-y-2">
                  <span>Renk Seçimi</span>
                  <FormControl fullWidth size='small'>
                    <InputLabel id="demo-simple-select-label">Renk</InputLabel>
                    <Select
                      value={color}
                      label="Color"
                      onChange={handleChange}
                    >
                      {colorOptions.map((opt)=> (
                        <MenuItem value={opt}>{opt}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Box>
            <Box className="flex flex-col px-4 py-8 bg-white border-gray-100 rounded-md shadow-sm gap-y-4 border-1">
              <TextField
                fullWidth
                label="Kilometre Bilgisi"
                value={kmValue}
                onChange={(e) => {
                    const onlyDigits = e.target.value.replace(/\D/g, '');
                    if (onlyDigits.length <= 7) {
                    setKmValue(onlyDigits);
                    }
                }}
                placeholder="Örn: 120000"
                type="text"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Motor Hacmi (cc)"
                value={engineSizeValue}
                onChange={(e) => {
                    const onlyDigits = e.target.value.replace(/\D/g, '');
                    if (onlyDigits.length <= 4) {
                    setEngineSizeValue(onlyDigits);
                    }
                }}
                placeholder='Örn: 1598'
                type='text'
                variant='outlined'
              />
              <TextField
                fullWidth
                label="Motor Gücü (hp)"
                value={enginePowerValue}
                onChange={(e) => {
                    const onlyDigits = e.target.value.replace(/\D/g, '');
                    if (onlyDigits.length <= 4) {
                    setEnginePowerValue(onlyDigits);
                    }
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
