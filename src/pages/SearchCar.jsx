import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Pagination
} from '@mui/material';
import SearchCarList from '../components/SearchCarList';
import FilterBox from '../components/Filter';
import { useLocation } from 'react-router-dom';
import api from '../api/axios';

const ITEMS_PER_PAGE = 10;

export default function SearchCar() {
  const [carData, setCarData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState('');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q')?.toLowerCase() || '';

  useEffect(() => {
    api.get('/listing/')
      .then(res => setCarData(res.data.listings || []))
      .catch(err => console.error("Araç verisi alınamadı:", err));
  }, []);

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBrandSelect = brandId => {
    setCurrentPage(1);
    api.get('/listing/', { params: { brand_id: brandId } })
      .then(res => setCarData(res.data.listings || []))
      .catch(err => console.error("Filtreli araç verisi alınamadı:", err));
  };

  const handleSeriesSelect = seriesId => {
    setCurrentPage(1);
    api.get('/listing/', { params: { series_id: seriesId } })
      .then(res => setCarData(res.data.listings || []))
      .catch(err => console.error("Seri filtresi ile veri alınamadı:", err));
  };

  const handleSubmit = selectedFilters => {
    setCurrentPage(1);
    api.get('/listing/', { params: selectedFilters })
      .then(res => setCarData(res.data.listings || []))
      .catch(err => console.error("Filtreli araç verisi alınamadı:", err));
  };

  const sortedCars = [...carData].sort((a, b) => {
    if (sorting === 'price_asc') return a.price - b.price;
    if (sorting === 'price_desc') return b.price - a.price;
    return 0;
  });

  const filteredItems = sortedCars.filter(item =>
    item.title?.toLowerCase().includes(searchQuery) ||
    item.id?.toString().includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCars = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <Box className="flex h-full w-[75%] mx-auto gap-10 mb-20 mt-5 justify-between">
      <FilterBox
        onBrandSelect={handleBrandSelect}
        onSeriesSelect={handleSeriesSelect}
        onSubmit={handleSubmit}
      />

      <Box className="flex flex-col w-[85%]">
        <Box className="flex items-center justify-between px-5 py-2 mb-5 bg-white rounded-sm shadow-md">
          <span className="text-xl font-semibold">Satılık Araçlar</span>
          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel
              id="sorting-label"
              sx={{
                color: 'text.primary',
                '&.Mui-focused': {
                  color: 'text.primary',
                },
              }}
            >
              Sıralama Türü
            </InputLabel>
            <Select
              labelId="sorting-label"
              label="Sıralama Türü"
              value={sorting}
              onChange={e => setSorting(e.target.value)}
            >
              <MenuItem value="">Varsayılan</MenuItem>
              <MenuItem value="price_asc">Ucuzdan Pahalıya</MenuItem>
              <MenuItem value="price_desc">Pahalıdan Ucuza</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {currentCars.length > 0 ? (
          <>
            <Box className="flex flex-col gap-y-4">
              {currentCars.map(item => (
                <SearchCarList key={item.id} item={item} />
              ))}
            </Box>
            <Box className="flex justify-center mt-8">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="standard"
              />
            </Box>
          </>
        ) : (
          <Box className="p-6 text-center text-gray-600">
            '{searchQuery.toUpperCase()}' adına ait sonuç bulunamadı.
          </Box>
        )}
      </Box>
    </Box>
  );
}
