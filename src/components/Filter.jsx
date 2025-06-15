import React, { useEffect, useState } from 'react';
import {Box, Link, Button} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import api from '../api/axios';
import AccordionRadioBox from './AccordionRadioBox';
import AccordionCityBox from './AccordionCityBox';
import AccordionBox from './AccordionBox';

export default function FilterBox({ onBrandSelect, onSeriesSelect, onSubmit }) {
  const [brands, setBrands] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [seriesMap, setSeriesMap] = useState({});

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');

  const [gear, setGear] = useState('');
  const [fuel, setFuel] = useState('');
  const [color, setColor] = useState('');

  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');

  const [minKm, setMinKm] = useState('');
  const [maxKm, setMaxKm] = useState('');

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Fetch brand/series data
  useEffect(() => {
    api.get('/listing/')
      .then(res => {
        const list = res.data.listings || [];
        const mp = new Map(), tmp = {};
        list.forEach(item => {
          const { brand: b, series: s } = item;
          if (!mp.has(b.id)) {
            mp.set(b.id, b);
            tmp[b.id] = s ? [s] : [];
          } else if (s && !tmp[b.id].some(x => x.id === s.id)) {
            tmp[b.id].push(s);
          }
        });
        setBrands(Array.from(mp.values()).sort((a, b) => a.name.localeCompare(b.name)));
        setSeriesMap(tmp);
      })
      .catch(console.error);
  }, []);

  // Fetch provinces & districts
  useEffect(() => {
    fetch('https://turkiyeapi.herokuapp.com/api/v1/provinces')
      .then(r => r.json())
      .then(d => setProvinces(d.data))
      .catch(console.error);
  }, []);
  useEffect(() => {
    if (city) {
      fetch(`https://turkiyeapi.herokuapp.com/api/v1/provinces?name=${city}`)
        .then(r => r.json())
        .then(d => setDistricts(d.data[0]?.districts || []))
        .catch(console.error);
    }
  }, [city]);

  const formatNumber = (value) => {
    const num = Number(String(value).replace(/\D/g, '')) || '';
    return num.toLocaleString('tr-TR');
  };

  const parseNumber = (formatted) =>
    Number(String(formatted).replace(/\./g, '')) || undefined;

  const handleSearch = () => {
    onSubmit({
      brand_id: selectedBrandId,
      city, district,
      transmission_type: gear || undefined,
      fuel_type: fuel || undefined,
      color,
      min_year: minYear ? Number(minYear) : undefined,
      max_year: maxYear ? Number(maxYear) : undefined,
      min_kilometers: parseNumber(minKm),
      max_kilometers: parseNumber(maxKm),
      min_price: parseNumber(minPrice),
      max_price: parseNumber(maxPrice),
    });
  };

  const handleReset = () => {
    setSelectedBrandId(null);
    setCity(''); setDistrict('');
    setGear(''); setFuel(''); setColor('');
    setMinYear(''); setMaxYear('');
    setMinKm(''); setMaxKm('');
    setMinPrice(''); setMaxPrice('');
    onSubmit({});
  };

  const commonNumberHandler = (setter) => (e) => {
    setter(formatNumber(e.target.value));
  };

  const fuelType = ['Benzin','Dizel','LPG','Elektrik'];
  const gearType = ['Manuel','Otomatik','Yarı Otomatik'];
  const colorOptions = ['Beyaz','Siyah','Gri','Kırmızı']; 
  
  return (
    <Box className="flex flex-col">
      <Box className="w-48 p-4 border rounded bg-white max-h-[280px] overflow-hidden" sx={{ boxShadow: 1 }}>
        <Box className="mb-3 text-lg font-semibold">Tüm Araçlar</Box>
        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, overflowY: 'auto', maxHeight: 220 }}>
          {brands.map(b => (
            <Box component="li" key={b.id} sx={{ mb: 1 }}>
              <Link component={RouterLink} underline="none" onClick={() => { setSelectedBrandId(b.id); onBrandSelect(b.id); }}
                sx={{
                  display: 'block',
                  color: selectedBrandId === b.id ? '#dc143c' : 'text.primary',
                  fontWeight: selectedBrandId === b.id ? 'bold' : 'normal',
                  '&:hover': { color: '#dc143c' }
                }}
              >{b.name}</Link>
              {selectedBrandId === b.id && seriesMap[b.id]?.map(s => (
                <Link key={s.id} component="button" underline="none" onClick={() => onSeriesSelect(s.id)}
                  sx={{
                    display: 'block',
                    pl: 2, mt: 0.5,
                    fontSize: '0.875rem',
                    color: 'grey.600',
                    '&:hover': { color: 'error.main' },
                  }}
                >{s.name}</Link>
              ))}
            </Box>
          ))}
        </Box>
      </Box>

      <Box className="w-48 mt-4">
        {/* Address */}
        <AccordionCityBox mainTitle="Adres" title1="İl" title2="İlçe" provinces={provinces} districts={districts} city={city} district={district} onCityChange={e => setCity(e.target.value)} onDistrictChange={e => setDistrict(e.target.value)}/> 

        {/* Vites Tipi */}
        <AccordionRadioBox name="gear" title="Vites Tipi" options={gearType} type={gear} onChange={e => setGear(e.target.value)}/>
       

        {/* Yakıt Tipi */}
        <AccordionRadioBox name="fuel" title="Yakıt Tipi" options={fuelType} type={fuel} onChange={e => setFuel(e.target.value)}/>

        {/* Renk */}
        <AccordionRadioBox name="color" title="Renk" options={colorOptions} type={color} onChange={e => setColor(e.target.value)}/>

        {/* Year */}
        <AccordionBox labelMin="Min Yıl" labelMax="Max Yıl" title="Yıl Aralığı" minValue={minYear} onMinChange={e => setMinYear(e.target.value.replace(/[^\d]/g,''))} maxValue={maxYear} onMaxChange={e => setMaxYear(e.target.value.replace(/[^\d]/g,''))}/>

        {/* KM */}
        <AccordionBox labelMin="Min KM" labelMax="Max KM" title="Kilometre Aralığı" minValue={minKm} onMinChange={commonNumberHandler(setMinKm)} maxValue={maxKm} onMaxChange={commonNumberHandler(setMaxKm)}/>

        {/* Price */}
        <AccordionBox labelMin="Min Fiyat" labelMax="Max Fiyat" title="Fiyat Aralığı" minValue={minPrice} onMinChange={commonNumberHandler(setMinPrice)} maxValue={maxPrice} onMaxChange={commonNumberHandler(setMaxPrice)}/>
        
        {/* Buttons */}
        <Box className="flex gap-2 mt-4">
          <Button variant="contained" color="error" fullWidth onClick={handleSearch}>Ara</Button>
          <Button 
          variant="outlined" 
          fullWidth onClick={handleReset}
          sx ={{
            borderColor: 'info.main',
            color: 'info.main',
          }}
          >
          Temizle
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
