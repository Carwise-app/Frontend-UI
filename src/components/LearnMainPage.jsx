import { NavigateNext } from '@mui/icons-material'
import { Box, Breadcrumbs, Stack } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react'
import LearnPriceCard from './LearnPriceCard';
import { useLocation, useNavigate } from 'react-router-dom';

const steps = [
  { path: 'marka', label: 'Marka Seçiniz', placeholder: 'Aracınızın markasını arayın', options: ['BMW', 'Audi', 'Toyota'], next: 'yil' },
  { path: 'yil', label: 'Yıl Seçiniz', placeholder: 'Aracınızın yılını arayın', options: ['2020', '2021', '2022'], next: 'model' },
  { path: 'model', label: 'Model Seçiniz', placeholder: 'Aracınızın modelini arayın', options: ['320i', 'A4', 'Corolla'], next: 'renk' },
  { path: 'renk', label: 'Renk Seçiniz', placeholder: 'Aracınızın rengini arayın', options: ['Siyah', 'Beyaz', 'Kırmızı'], next: 'yakit-tipi' },
  { path: 'yakit-tipi', label: 'Yakıt Tipi Seçiniz', placeholder: 'Aracınızın yakıt tipini arayın', options: ['Benzin', 'Dizel', 'Elektrik'], next: 'vites-tipi' },
  { path: 'vites-tipi', label: 'Vites Tipi Seçiniz', placeholder: 'Aracınızın vites tipini arayın', options: ['Manuel', 'Otomatik'], next: null },
];
// Burada sadece options bilgilerini çekerek options bölmesini değiştirmen gerekiyor.


export default function LearnMainPage() {
const location =useLocation();
const navigate = useNavigate();
const [searchValue, setSearchValue] = useState('');

const currentStep = steps.find(step => location.pathname.includes(step.path));

const normalizedSearchValue = searchValue.trim();
const filteredOptions = currentStep.options.filter(option =>
  option.toLowerCase().includes(normalizedSearchValue.toLowerCase())
);

const handleOptionClick = (value) => {
  console.log(`Seçilen ${currentStep.path}:`, value);
  if (currentStep.next) {
        navigate(`/fiyat-ogren/${currentStep.next}`);
        setSearchValue("")
      } else {
        console.log('Tüm adımlar tamamlandı.');
      }
}  


  

  return (
    <Box className='bg-[#f7f7f7] w-[70%] h-200 py-5 my-5 mx-auto rounded-sm'>
      <Box className="bg-white w-[70%] mx-auto py-5 px-10 rounded-md flex flex-col shadow-md ">
        <span className='text-3xl mb-2'>Arabam Kaç Para?</span>
        <span className='text-sm text-gray-600'>Araç bilgilerinizi seçerek aracınızın fiyatı öğrenin.</span>
      </Box>
      <Box className="flex w-[70%] mx-auto mt-4">
        <span className='text-lg'>{currentStep.label} :</span>
      </Box>
      <Box className='flex w-[70%] rounded bg-white mx-auto mt-2 shadow-sm'>
        <input 
          type="search" 
          id='search' 
          name='search' 
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={currentStep.placeholder} 
          className='w-full border-none bg-transparent px-4 py-4 text-black outline-none focus:outline-none text-base placeholder:text-base '
          />
        <button className='text-white cursor-pointer px-2 py-2'>
          <SearchIcon sx={{fontSize:40}} className='text-[#dc143c]'/>
        </button>
      </Box>
      <Box className="flex w-[70%] mx-auto mt-5 flex-wrap justify-start gap-x-3 gap-y-3">
        {filteredOptions.map(option => (
          <LearnPriceCard key={option} onClick={() => handleOptionClick(option)} content={option}/>
        ))}
      </Box>
    </Box>
  )
}
