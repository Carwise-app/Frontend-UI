import React, { useEffect, useState } from 'react';
import {
  Box, Link, Accordion, AccordionSummary, AccordionDetails,
  RadioGroup, FormControlLabel, Radio, Select, MenuItem,
  FormControl, InputLabel, TextField, Button
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import api from '../api/axios';

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

  return (
    <Box className="flex flex-col">
      <Box className="w-48 p-4 border rounded bg-white max-h-[280px] overflow-hidden" sx={{ boxShadow: 1 }}>
        <Box className="font-semibold mb-3 text-lg">Tüm Araçlar</Box>
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

      <Box className="mt-4 w-48">
        {/* Address */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}><b>Adres</b></AccordionSummary>
          <AccordionDetails>
            <FormControl fullWidth size="small" className="mb-2">
              <InputLabel>İl</InputLabel>
              <Select value={city} onChange={e => setCity(e.target.value)} label="İl">
                {provinces.map(p => <MenuItem key={p.name} value={p.name}>{p.name}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>İlçe</InputLabel>
              <Select value={district} onChange={e => setDistrict(e.target.value)} label="İlçe">
                {districts.map(d => <MenuItem key={d.name} value={d.name}>{d.name}</MenuItem>)}
              </Select>
            </FormControl>
          </AccordionDetails>
        </Accordion>

        {/* Vites Tipi */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}><b>Vites Tipi</b></AccordionSummary>
          <AccordionDetails>
            <RadioGroup name="gear" value={gear} onChange={e => setGear(e.target.value)}>
              {['Manuel','Otomatik','Yarı Otomatik'].map(v => (
                <FormControlLabel key={v} value={v} control={<Radio />} label={v} />
              ))}
            </RadioGroup>
          </AccordionDetails>
        </Accordion>

        {/* Yakıt Tipi */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}><b>Yakıt Tipi</b></AccordionSummary>
          <AccordionDetails>
            <RadioGroup name="fuel" value={fuel} onChange={e => setFuel(e.target.value)}>
              {['Benzin','Dizel','LPG','Elektrik'].map(v => (
                <FormControlLabel key={v} value={v} control={<Radio />} label={v} />
              ))}
            </RadioGroup>
          </AccordionDetails>
        </Accordion>

        {/* Renk */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}><b>Renk</b></AccordionSummary>
          <AccordionDetails>
            <RadioGroup name="color" value={color} onChange={e => setColor(e.target.value)}>
              {['Beyaz','Siyah','Gri','Kırmızı'].map(v => (
                <FormControlLabel key={v} value={v} control={<Radio />} label={v} />
              ))}
            </RadioGroup>
          </AccordionDetails>
        </Accordion>

        {/* Year */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}><b>Yıl Aralığı</b></AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <TextField
                label="Min Yıl" type="text" size="small" fullWidth
                value={minYear} onChange={e => setMinYear(e.target.value.replace(/[^\d]/g,''))}
              />
              <TextField
                label="Max Yıl" type="text" size="small" fullWidth
                value={maxYear} onChange={e => setMaxYear(e.target.value.replace(/[^\d]/g,''))}
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* KM */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}><b>Kilometre Aralığı</b></AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <TextField
                label="Min KM" type="text" size="small" fullWidth
                value={minKm} onChange={commonNumberHandler(setMinKm)}
              />
              <TextField
                label="Max KM" type="text" size="small" fullWidth
                value={maxKm} onChange={commonNumberHandler(setMaxKm)}
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Price */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}><b>Fiyat Aralığı</b></AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <TextField
                label="Min Fiyat" type="text" size="small" fullWidth
                value={minPrice} onChange={commonNumberHandler(setMinPrice)}
              />
              <TextField
                label="Max Fiyat" type="text" size="small" fullWidth
                value={maxPrice} onChange={commonNumberHandler(setMaxPrice)}
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Buttons */}
        <Box className="mt-4 flex gap-2">
          <Button variant="contained" color="error" fullWidth onClick={handleSearch}>Ara</Button>
          <Button 
          variant="outlined" 
          fullWidth onClick={handleReset}
          sx ={{
            borderColor: 'error.main',
            color: 'error.main',
            '&:hover' : {
              backgroundColor: 'error.light',
              borderColor: 'error.dark',
              color: 'white'
            },
          }}
          >
          Temizle
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
