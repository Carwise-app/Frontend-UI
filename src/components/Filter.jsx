import React, { useEffect, useState } from 'react';
import { Box, Link, Accordion, AccordionSummary, AccordionDetails, RadioGroup, FormControlLabel, Radio, Select, MenuItem, FormControl, InputLabel, Slider, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import api from '../api/axios';
import { Link as RouterLink } from 'react-router-dom';

export default function FilterBox({ onBrandSelect, onSeriesSelect, onSubmit }) {
  const [brands, setBrands] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [seriesMap, setSeriesMap] = useState({});

  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const [gear, setGear] = useState('');
  const [fuel, setFuel] = useState('');
  const [color, setColor] = useState('');
  const [yearRange, setYearRange] = useState([2000, 2025]);
  const [kmRange, setKmRange] = useState([0, 300000]);

  useEffect(() => {
    api.get('/listing/')
      .then(res => {
        const data = res.data.listings || [];
        const brandMap = new Map();
        const tempSeriesMap = {};

        data.forEach(item => {
          const brand = item.brand;
          const series = item.series;

          if (!brandMap.has(brand.id)) {
            brandMap.set(brand.id, { ...brand, count: 1 });
            tempSeriesMap[brand.id] = series ? [series] : [];
          } else {
            brandMap.get(brand.id).count += 1;
            if (series && !tempSeriesMap[brand.id].some(s => s.id === series.id)) {
              tempSeriesMap[brand.id].push(series);
            }
          }
        });

        const brandList = Array.from(brandMap.values()).sort((a, b) => a.name.localeCompare(b.name));
        setBrands(brandList);
        setSeriesMap(tempSeriesMap);
      })
      .catch(err => console.error('Markalar yüklenemedi:', err));
  }, []);

  useEffect(() => {
    fetch('https://turkiyeapi.herokuapp.com/api/v1/provinces')
      .then(res => res.json())
      .then(data => setProvinces(data.data))
      .catch(err => console.error('İller alınamadı:', err));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      fetch(`https://turkiyeapi.herokuapp.com/api/v1/provinces?name=${selectedProvince}`)
        .then(res => res.json())
        .then(data => setDistricts(data.data[0]?.districts || []))
        .catch(err => console.error('İlçeler alınamadı:', err));
    }
  }, [selectedProvince]);

  const handleBrandClick = (brandId) => {
    setSelectedBrandId(brandId);
    onBrandSelect(brandId);
  };

  const handleSeriesClick = (seriesId) => {
    onSeriesSelect(seriesId);
  };

  const handleSearch = () => {
    const filters = {
      city: selectedProvince,
      district: selectedDistrict,
      fuel_type: fuel,
      transmission_type: gear,
      color: color,
      min_year: yearRange[0],
      max_year: yearRange[1],
      min_kilometers: kmRange[0],
      max_kilometers: kmRange[1]
    };
    onSubmit(filters);
  };

  const handleReset = () => {
    setSelectedProvince('');
    setSelectedDistrict('');
    setGear('');
    setFuel('');
    setColor('');
    setYearRange([2000, 2025]);
    setKmRange([0, 300000]);
    onSubmit({});
  };

  return (
    <Box className="flex flex-col">
      <Box className="w-48 rounded border p-4 text-sm bg-white max-h-70 h-full">
        <Box className="font-semibold mb-2 text-lg">Tüm Araçlar</Box>
        <Box className="max-h-[85%] overflow-y-auto ps-3 flex flex-col">
          {brands.map((brand) => (
            <Box key={brand.id}>
              <Link component={RouterLink} underline="none" onClick={() => handleBrandClick(brand.id)} className="text-black hover:text-[#dc143c]">
                {brand.name}
              </Link>
              {selectedBrandId === brand.id && seriesMap[brand.id] && (
                <Box className="ml-3 mt-1 flex flex-col gap-1">
                  {seriesMap[brand.id].map(series => (
                    <Link
                      key={series.id}
                      component="button"
                      underline="none"
                      onClick={() => handleSeriesClick(series.id)}
                      className="text-gray-600 hover:text-red-500 text-sm"
                    >
                      {series.name}
                    </Link>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>

      <Box className="mt-4 w-48">
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}><b>Adres</b></AccordionSummary>
          <AccordionDetails>
            <FormControl fullWidth size="small" className="mb-2">
              <InputLabel>İl</InputLabel>
              <Select value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)}>
                {provinces.map(p => <MenuItem key={p.name} value={p.name}>{p.name}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>İlçe</InputLabel>
              <Select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>
                {districts.map(d => <MenuItem key={d.name} value={d.name}>{d.name}</MenuItem>)}
              </Select>
            </FormControl>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}><b>Vites Tipi</b></AccordionSummary>
          <AccordionDetails>
            <RadioGroup value={gear} onChange={(e) => setGear(e.target.value)}>
              <FormControlLabel value="Manuel" control={<Radio />} label="Manuel" />
              <FormControlLabel value="Otomatik" control={<Radio />} label="Otomatik" />
              <FormControlLabel value="Yarı Otomatik" control={<Radio />} label="Yarı Otomatik" />
            </RadioGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}><b>Yakıt Tipi</b></AccordionSummary>
          <AccordionDetails>
            <RadioGroup value={fuel} onChange={(e) => setFuel(e.target.value)}>
              <FormControlLabel value="Benzin" control={<Radio />} label="Benzin" />
              <FormControlLabel value="Dizel" control={<Radio />} label="Dizel" />
              <FormControlLabel value="LPG" control={<Radio />} label="LPG" />
              <FormControlLabel value="Elektrik" control={<Radio />} label="Elektrik" />
            </RadioGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}><b>Renk</b></AccordionSummary>
          <AccordionDetails>
            <RadioGroup value={color} onChange={(e) => setColor(e.target.value)}>
              <FormControlLabel value="Beyaz" control={<Radio />} label="Beyaz" />
              <FormControlLabel value="Siyah" control={<Radio />} label="Siyah" />
              <FormControlLabel value="Gri" control={<Radio />} label="Gri" />
              <FormControlLabel value="Kırmızı" control={<Radio />} label="Kırmızı" />
            </RadioGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}><b>Yıl Aralığı</b></AccordionSummary>
          <AccordionDetails>
            <Slider value={yearRange} onChange={(e, newValue) => setYearRange(newValue)} valueLabelDisplay="auto" min={1990} max={2025} />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}><b>KM Aralığı</b></AccordionSummary>
          <AccordionDetails>
            <Slider value={kmRange} onChange={(e, newValue) => setKmRange(newValue)} valueLabelDisplay="auto" min={0} max={300000} step={1000} />
          </AccordionDetails>
        </Accordion>

        <Box className="flex gap-2 mt-4">
          <Button variant="contained" color="error" fullWidth onClick={handleSearch}>Filtrele</Button>
          <Button variant="outlined" fullWidth onClick={handleReset}>Temizle</Button>
        </Box>
      </Box>
    </Box>
  );
}
