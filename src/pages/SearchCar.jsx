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
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const ITEMS_PER_PAGE = 10;

export default function SearchCar() {
  const [carData, setCarData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState('');
  const [activeFilters, setActiveFilters] = useState({});

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q')?.toLowerCase() || '';

  useEffect(() => {
    fetchFilteredData(activeFilters, currentPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    fetchFilteredData({}, 1);
  }, []);

  // Helper function to parse sorting value and return sort field and order
  const getSortParams = (sortingValue) => {
    if (!sortingValue) return {};
    
    const sortMap = {
      'price_asc': { sort: 'price', order: 'asc' },
      'price_desc': { sort: 'price', order: 'desc' },
      'kilometers_asc': { sort: 'kilometers', order: 'asc' },
      'kilometers_desc': { sort: 'kilometers', order: 'desc' },
      'year_asc': { sort: 'year', order: 'asc' },
      'year_desc': { sort: 'year', order: 'desc' },
      'created_at_asc': { sort: 'created_at', order: 'asc' },
      'created_at_desc': { sort: 'created_at', order: 'desc' },
    };
    
    return sortMap[sortingValue] || {};
  };

  const fetchFilteredData = (filters = {}, page = 1, sortingValue = sorting) => {
    const sortParams = getSortParams(sortingValue);
    
    const params = {
      ...filters,
      page,
      limit: ITEMS_PER_PAGE,
      ...sortParams,
    };

    api.get('/listing/', { params })
      .then(res => {
        setCarData(res.data.listings || []);
        setTotalCount(res.data.total || 0);
        setActiveFilters(filters);
      })
      .catch(err => console.error("Araç verisi alınamadı:", err));
  };

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

  const handleSortingChange = (e) => {
    const newSorting = e.target.value;
    setSorting(newSorting);
    setCurrentPage(1);
    fetchFilteredData(activeFilters, 1, newSorting);
  };

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
              onChange={handleSortingChange}
            >
              <MenuItem value="">Varsayılan</MenuItem>
              <MenuItem value="price_asc">Fiyat: Ucuzdan Pahalıya</MenuItem>
              <MenuItem value="price_desc">Fiyat: Pahalıdan Ucuza</MenuItem>
              <MenuItem value="kilometers_asc">Kilometre: Azdan Çoğa</MenuItem>
              <MenuItem value="kilometers_desc">Kilometre: Çoktan Aza</MenuItem>
              <MenuItem value="year_asc">Yıl: Eskiden Yeniye</MenuItem>
              <MenuItem value="year_desc">Yıl: Yeniden Eskiye</MenuItem>
              <MenuItem value="created_at_asc">Tarih: Eskiden Yeniye</MenuItem>
              <MenuItem value="created_at_desc">Tarih: Yeniden Eskiye</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {currentCars.length > 0 ? (
          <>
            <Box className="flex flex-col gap-y-4" >
              {currentCars.map(item => (
                <SearchCarList key={item.id} item={item} onClick={() => navigate(`/arac-detay/${item.slug}`)} />
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