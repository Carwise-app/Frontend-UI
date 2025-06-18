import { Box, Stack } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import React from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SpeedIcon from '@mui/icons-material/Speed';
import PaletteIcon from '@mui/icons-material/Palette';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { SettingsOutlined, Verified } from '@mui/icons-material';

export default function SearchCarList({ item, onClick }) {
  const imageUrl = item.image?.path
    ? `https://carwisegw.yusuftalhaklc.com${item.image.path}`
    : '';

  const brand = item.brand?.name || '';
  const series = item.series?.name || '';
  const model = item.model?.name || '';
  const title = item.title || '';
  const price = item.price?.toLocaleString() || '';
  const formattedKm = Number(item.kilometers).toLocaleString('tr-TR').replace(/,/g, '.');

  return (
    <Box className="bg-white shadow-sm rounded-sm w-full h-50 flex cursor-pointer hover:shadow-[#ffb8c6] overflow-hidden" onClick={onClick}>
      <Box className="bg-gray-50 w-[30%] object-contain rounded-l-xl flex items-center justify-center">
        <img className="object-contain border-gray-100 pointer-events-none border-r-1" src={imageUrl} alt="car photo" />
      </Box>
      <Box className="w-[67%] mx-auto my-2 grid grid-rows-[1fr_6fr_1fr]">
        <Box className="flex justify-between text-xs text-gray-500">
          <span className='truncate w-[140px] block'>İlan Numarası: {item.id}</span>
          <Stack className="flex items-center" direction="row" spacing={1}>
            <LocationOnIcon fontSize="small" />
            <span>{item.city} / {item.district}</span>
          </Stack>
        </Box>
        <Stack className="mt-2">
          <span className="text-xl truncate w-[480px] block">{brand} {series} {model}</span>
          <span className="text-sm text-gray-400 truncate w-[400px] block">{title}</span>
        </Stack>
        <Box className="grid w-[50%] grid-cols-3 gap-3 mt-2">    
          <span className="flex items-center gap-1 text-sm"><CalendarTodayIcon sx={{color: "#4f4f4f"}} /> {item.year}</span>
          <span className="flex items-center gap-1 text-sm"><SpeedIcon sx={{color: "#4f4f4f"}} /> {item.power} HP</span>
          <span className="flex items-center gap-1 text-sm"><PaletteIcon sx={{color: "#4f4f4f"}} /> {item.color}</span>
          <span className="flex items-center gap-1 text-sm"><DirectionsCarIcon sx={{color: "#4f4f4f"}} /> {formattedKm} km</span>
          <span className="flex items-center gap-1 text-sm"><LocalGasStationIcon sx={{color: "#4f4f4f"}} /> {item.fuel_type}</span>
          <span className="flex items-center gap-1 text-sm"><SettingsOutlined sx={{color: "#4f4f4f"}} /> {item.engine_volume} cc</span>
          {/* <span className="flex items-center gap-1"><Verified /> {item.drive_type}</span> */}  
        </Box>
        <Box className="flex justify-end">
          <span className="text-2xl font-bold text-[#dc143c]">{price} ₺</span>
        </Box>
      </Box>
    </Box>
  );
}
