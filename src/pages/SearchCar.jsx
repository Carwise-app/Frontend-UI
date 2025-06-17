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
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState('');
  const [activeFilters, setActiveFilters] = useState({});

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q')?.toLowerCase() || '';

  // 🔁 Sayfa değiştiğinde veri çek
  useEffect(() => {
    fetchFilteredData(activeFilters, currentPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // 🚀 Başlangıçta tüm araçları getir
  useEffect(() => {
    fetchFilteredData({}, 1);
  }, []);

  // 🔄 Filtrelenmiş veya sıralanmış veri al
  const fetchFilteredData = (filters = {}, page = 1) => {
    const params = {
      ...filters,
      page,
      limit: ITEMS_PER_PAGE,
      ...(sorting && { sort: 'price', order: sorting === 'price_asc' ? 'asc' : 'desc' }),
    };

    api.get('/listing/', { params })
      .then(res => {
        setCarData(res.data.listings || []);
        setTotalCount(res.data.total || 0);
        setActiveFilters(filters);
      })
      .catch(err => console.error("Araç verisi alınamadı:", err));
  };

  // Filtrelerden gelenler
  const handleBrandSelect = brandId => {
    setCurrentPage(1);
    fetchFilteredData({ ...activeFilters, brand_id: String(brandId) }, 1);
  };

  const handleSeriesSelect = seriesId => {
    setCurrentPage(1);
    fetchFilteredData({ ...activeFilters, series_id: String(seriesId) }, 1);
  };

  const handleSubmit = selectedFilters => {
    setCurrentPage(1);
    fetchFilteredData(selectedFilters, 1);
  };

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };

  // Arama kutusu üzerinden gelen filtreleme
  const filteredItems = searchQuery
    ? carData.filter(item =>
        item.title?.toLowerCase().includes(searchQuery) ||
        item.id?.toString().includes(searchQuery)
      )
    : carData;

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const currentCars = filteredItems;

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
              onChange={e => {
                setSorting(e.target.value);
                setCurrentPage(1);
                fetchFilteredData(activeFilters, 1);
              }}
            >
              <MenuItem value="">Varsayılan</MenuItem>
              <MenuItem value="price_desc">Ucuzdan Pahalıya</MenuItem>
              <MenuItem value="price_asc">Pahalıdan Ucuza</MenuItem>
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
