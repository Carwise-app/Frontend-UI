import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CustomizedSteppers from './CustomizedSteppers';
import LearnPriceCard from './LearnPriceCard';
import LearnKmMainPage from './LearnKmMainPage';
import LearnDamageMainPage from './LearnDamageMainPage';
import LearnResultsMainPage from './LearnResultsMainPage';

const steps = [
  { path: 'marka', label: 'Marka Seçiniz', placeholder: 'Aracınızın markasını arayın', options: ['BMW', 'Audi', 'Toyota'], next: 'yil' },
  { path: 'yil', label: 'Yıl Seçiniz', placeholder: 'Aracınızın yılını arayın', options: ['2020', '2021', '2022'], next: 'model' },
  { path: 'model', label: 'Model Seçiniz', placeholder: 'Aracınızın modelini arayın', options: ['320i', 'A4', 'Corolla'], next: 'govde-tipi' },
  { path: 'govde-tipi', label: 'Gövde Tipi Seçiniz', placeholder: 'Aracınızın gövde tipini arayın', options: ['Sedan', 'SUV', 'Hatchback'], next: 'yakit-tipi' },
  { path: 'yakit-tipi', label: 'Yakıt Tipi Seçiniz', placeholder: 'Aracınızın yakıt tipini arayın', options: ['Benzin', 'Dizel', 'Elektrik'], next: 'vites-tipi' },
  { path: 'vites-tipi', label: 'Vites Tipi Seçiniz', placeholder: 'Aracınızın vites tipini arayın', options: ['Manuel', 'Otomatik'], next: 'renk' },
  { path: 'renk', label: 'Renk Seçiniz', placeholder: 'Aracınızın rengini arayın', options: ['Siyah', 'Beyaz', 'Kırmızı'], next: 'km' },
  { path: 'km', label: 'Kilometre Bilginizi Giriniz', placeholder: 'Örn: 120000', options: '', next: 'hasar' },
  { path: 'hasar', label: 'Hasar Bilgilerinizi Doldurun', placeholder: '', options: '', next: 'sonuc' },
  { path: 'sonuc', label: 'Aracınız İçin Belirlenen Fiyat', placeholder:'',options:'', next:null}
];

export default function LearnMainPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentStepIndex = steps.findIndex(step => location.pathname.includes(step.path));
  const currentStep = steps[currentStepIndex];
  const [searchValue, setSearchValue] = useState('');

  const filteredOptions = currentStep.options && Array.isArray(currentStep.options)
    ? currentStep.options.filter(option =>
        option.toLowerCase().includes(searchValue.trim().toLowerCase())
      )
    : [];

  const handleOptionClick = (value) => {
    console.log(`Seçilen ${currentStep.path}:`, value);
    if (currentStep.next) {
      navigate(`/fiyat-ogren/${currentStep.next}`);
      setSearchValue('');
    } else {
      console.log('Tüm adımlar tamamlandı.');
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      navigate(`/fiyat-ogren/${steps[currentStepIndex - 1].path}`);
    }
  };

  const handleNext = () => {
    if (currentStep.next) {
      navigate(`/fiyat-ogren/${currentStep.next}`);
    }
  };

  if (currentStep.path === 'hasar') {
    return (
      <LearnDamageMainPage onHandleBack={handleBack} onHandleNext={handleNext} activeStep={currentStepIndex} stepLabel={currentStep.label}/>
    );
  }

  if (currentStep.path === 'km') {
    return (
      <LearnKmMainPage onHandleBack={handleBack} onHandleNext={handleNext} activeStep={currentStepIndex} stepLabel={currentStep.label}/>
    );
  }
  
  if(currentStep.path === 'sonuc'){
    return(
      <LearnResultsMainPage onHandleBack={handleBack} onHandleNext={handleNext} activeStep={currentStepIndex} stepLabel={currentStep.label}/>
    )
  }

  return (
    <Box className='bg-[#f7f7f7] w-[70%] pt-5 pb-15 my-5 mx-auto rounded-sm min-h-160 shadow-xs border-1 border-gray-100'>
      <Box className="bg-white w-[70%] mx-auto py-5 px-10 rounded-md flex flex-col shadow-md ">
        <span className='mb-2 text-3xl'>Arabam Kaç Para?</span>
        <span className='text-sm text-gray-600'>Araç bilgilerinizi seçerek aracınızın fiyatı öğrenin.</span>
      </Box>
      <Box className="w-[70%] mx-auto mt-5">
        <CustomizedSteppers activeStep={currentStepIndex} />
      </Box>

      <Box className="flex justify-between items-center w-[70%] mx-auto mt-5">
        <Button onClick={handleBack} disabled={currentStepIndex === 0} variant='outlined' color='error'>
          Geri
        </Button>
      </Box>
      <Box>
        <Box className="flex w-[70%] mx-auto mt-4">
          <span className='text-lg'>{currentStep.label}</span>
        </Box>
        <Box className='flex w-[70%] rounded bg-white mx-auto mt-2 shadow-sm'>
          <input
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={currentStep.placeholder}
            className='w-full px-4 py-4 text-base text-black bg-transparent border-none outline-none focus:outline-none placeholder:text-base'
          />
          <button className='px-2 py-2 text-white cursor-pointer'>
            <SearchIcon sx={{ fontSize: 40 }} className='text-[#dc143c]' />
          </button>
        </Box>
        <Box className="flex w-[70%] mx-auto mt-5 flex-wrap justify-start gap-x-3 gap-y-3">
          {filteredOptions.map(option => (
            <LearnPriceCard key={option} onClick={() => handleOptionClick(option)} content={option} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
