import { Box, FormControl, InputLabel, MenuItem, Select, Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchCarList from '../components/SearchCarList';
import FilterBox from '../components/Filter';
import { useLocation } from 'react-router-dom';
import api from '../api/axios';

const ITEMS_PER_PAGE = 10;

export default function SearchCar() {
  const [carData, setCarData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q')?.toLowerCase() || '';

  const [filters, setFilters] = useState({});

  useEffect(() => {
    api.get('/listing/')
      .then(res => {
        setCarData(res.data.listings || []);
      })
      .catch(err => {
        console.error("Araç verisi alınamadı:", err);
      });
  }, []);

  const filteredItems = carData.filter(item =>
    item.title?.toLowerCase().includes(searchQuery) ||
    item.id?.toString().includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCars = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleBrandSelect = (brandId) => {
    api.get('/listing/', { params: { brand_id: brandId } })
      .then(res => {
        setCarData(res.data.listings || []);
        setCurrentPage(1);
      })
      .catch(err => {
        console.error("Filtreli araç verisi alınamadı:", err);
      });
  };

  const handleSeriesSelect = (seriesId) => {
    api.get('/listing/', { params: { series_id: seriesId } })
      .then(res => {
        setCarData(res.data.listings || []);
        setCurrentPage(1);
      })
      .catch(err => {
        console.error("Seri filtresi ile veri alınamadı:", err);
      });
  };

  const handleSubmit = (selectedFilters) => {
    setFilters(selectedFilters);
    api.get('/listing/', { params: selectedFilters })
      .then(res => {
        setCarData(res.data.listings || []);
        setCurrentPage(1);
      })
      .catch(err => {
        console.error("Filtreli araç verisi alınamadı:", err);
      });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <Box className="flex h-full w-[75%] mx-auto gap-10 mb-20 mt-5 justify-between">
      <FilterBox onSubmit={handleSubmit} onBrandSelect={handleBrandSelect} onSeriesSelect={handleSeriesSelect} />
      <Box className="flex flex-col w-[85%]">
        <Box className="bg-white py-2 px-5 rounded-sm mb-5 shadow-md flex justify-between">
          <span className='text-xl flex items-center'>Satılık Araçlar</span>
          <FormControl sx={{ minWidth: 200 }} size='small'>
            <InputLabel>Sıralama Türü</InputLabel>
            <Select
              labelId='demo-select-small-label'
              id='demo-select-small'
              label="Gelişmiş Sıralama"
            >
              <MenuItem value="Ucuzdan Pahalıya">Ucuzdan Pahalıya</MenuItem>
              <MenuItem value="Pahalıdan Ucuza">Pahalıdan Ucuza</MenuItem>
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
                onChange={handleChange}
                color="standard"
              />
            </Box>
          </>
        ) : (
          <p>'{searchQuery.toUpperCase()}' adına ait sonuç bulunamadı.</p>
        )}
      </Box>
    </Box>
  );
}
