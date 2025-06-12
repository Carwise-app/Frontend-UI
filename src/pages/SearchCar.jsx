import { Box, FormControl, InputLabel, MenuItem, Select, Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchCarList from '../components/SearchCarList';
import FilterBox from '../components/Filter';
import { useLocation } from 'react-router-dom';

const ITEMS_PER_PAGE = 10;

export default function SearchCar() {
  const carData = [
    { name: "Ford", id: 1 },
    { name: "Toyota", id: 2 },
    { name: "Nissan", id: 3 },
    { name: "Fiat", id: 4 },
    { name: "Nissan GTR", id: 5 },
    { name: "Ford Focus", id: 6 },
    { name: "Fiat Egea", id: 7 },
    { name: "Fiat Fiorino", id: 8 },
    { name: "Opel Corsa", id: 9 },
    { name: "Opel", id: 10 },
    { name: "Suzuki", id: 11 },
    { name: "Kia", id: 12 },
    { name: "Honda", id: 13 },
    { name: "Honda Civic", id: 14 },
    { name: "Fiat Fiorino 1.3 Multijet", id: 15 },
  ]; //Dinamik çekildiğinde düzelecek burasıs statik denemek için.


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q')?.toLowerCase() || '';

  
  const filteredItems = carData.filter(item =>
    item.name.toLowerCase().includes(searchQuery) ||
    item.id.toString().includes(searchQuery)
  );

 
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCars = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const [filters, setFilters] = useState({ gearType: [], color: [], fuelType: [], vehicleStatus: [], heavyDamageRecord: [], brand: '', city: [] });

  const handleSubmit = (selectedFilters) => {
    setFilters(selectedFilters);
  };

 

  return (
    <Box className="flex h-full w-[75%] mx-auto gap-10 mb-20 mt-5 justify-between">
      <FilterBox onSubmit={handleSubmit} />
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
                <SearchCarList key={item.id} title={item.name} />
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
