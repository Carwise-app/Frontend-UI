import { Link as RouterLink } from 'react-router-dom';
import { Accordion, AccordionDetails, AccordionSummary, Box, Link} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ExpandMoreIcon  from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';
import AccordionBox from './AccordionBox';
import AccordionCheckBox from './AccordionCheckBox';
import AccordionCityBox from './AccordionCityBox';
import { FormatSizeSharp } from '@mui/icons-material';

//Statik şekilde denemek için yaptım dinamik çekince silersin.
const categories = [
  { name: 'BMW', value:"BMW"},
  { name: 'Audi', value:"Audi"},
  { name: 'Fiat', value:"Fiat"},
  { name: 'Kia', value:"Kia" },
  { name: 'Mercedes', value:"Mercedes" },
  { name: 'Tofaş', value:"Tofas" },
  { name: 'Renault', value:"Renault" },
  { name: 'Skoda', value:"Skoda" },
  { name: 'Opel', value:"Opel" },
  { name: 'Toyota', value:"Toyota" },
  { name: 'Suzuki', value:"Suzuki" },
  { name: 'Seat', value:"Seat" },
].sort((a, b) => a.name.localeCompare(b.name));;

export default function FilterBox({ onSubmit }) {
  
  const [formState, setFormState] = useState({
    gearType: [],
    color: [],
    fuelType: [],
    vehicleStatus: [],
    heavyDamageRecord: [],
    brand: '',
    city:[],
  });
  
 
  
  const handleChange = (category, value) => {
    setFormState((prev) => {
      const current = prev[category];
      const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
      return { ...prev, [category]: updated };
    });
  };
  
  const handleBrandClick = (brandName) => {
    setFormState((prev) => ({
      ...prev,
      brand: brandName,
    }));
    onSubmit({
      ...formState,
      brand: brandName,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSubmit(formState);
  };
  //Buradaki diziler yerine sen çekersin seçenekleri.
  const colorOptions = ["Mavi", "Yeşil", "Turuncu","Gri","Siyah","Beyaz","Pembe","Turkuaz"]
  const gearTypeOptions = ["Duz", "Otomatik", "Yari Otomatik"]
  const fuelTypeOptions = ["Benzin", "Dizel", "Elektrik","Benzin&LPG"]
  const vehicleStatusOptions = ["İkinci El"]
  const heavyDamageRecordOptions = ["Evet", "Hayır"]
  const cityData = {
    İstanbul: ['Kadıköy', 'Üsküdar', 'Beşiktaş','Beylikdüzü','Silivri','Esenyurt'],
    Ankara: ['Çankaya', 'Mamak', 'Keçiören','Kızılay'],
    İzmir: ['Konak', 'Bornova', 'Karşıyaka','Bilmiyorum1','Bilmiyorum2'],
  };
  
  const [location, setLocation] = useState({ city: '', district: '' });

  return (
    <Box className="flex flex-col">
      <Box className="w-48 rounded border p-4 text-sm bg-white max-h-70 h-full  ">
        <Box className="font-semibold mb-2 text-lg">Tüm Araçlar</Box>
        <Box className="max-h-[85%] overflow-y-auto ps-3 flex flex-col">
          {categories.map((category) => (
              <Link component={RouterLink} key={category.name} underline='none' to={`/arac-satin-al/${category.value.toLowerCase()}`}  onClick={() => handleBrandClick(category.name)}>
                <span className='text-black hover:text-[#dc143c]'>{category.name}</span>
              </Link>
          ))}
        </Box>
      </Box>
      <Box className="mt-4 w-48  ">
        <form onSubmit={handleSearch}>
          <AccordionBox title="Fiyat"/>
          <AccordionCityBox title="Adres" cityDistrictData={cityData} selectedOptions={location} onChange={setLocation}/>
          <AccordionCheckBox title="Vites Tipi" options={gearTypeOptions} selectedOptions={formState.gearType} onChange={(value) => handleChange("gearType", value)}/>
          <AccordionBox title="Yıl"/>
          <AccordionCheckBox title="Yakıt Tipi" options={fuelTypeOptions} selectedOptions={formState.fuelType} onChange={(value) => handleChange("fuelType",value)}/>
          <AccordionBox title="Kilometre"/>          
          <AccordionCheckBox title="Renk" options={colorOptions} selectedOptions={formState.color} onChange={(value) => handleChange("color", value)}/>
          <AccordionCheckBox title="Araç Durumu" options={vehicleStatusOptions} selectedOptions={formState.vehicleStatus} onChange={(value) => handleChange("vehicleStatus",value)}/>
          <AccordionCheckBox title="Ağır Hasar Kayıtlı" options={heavyDamageRecordOptions} selectedOptions={formState.heavyDamageRecord} onChange={(value) => handleChange("heavyDamageRecord",value)}/>
          <Box className="flex justify-center">
            <button type='submit' className="bg-[#dc143c] text-white py-3 rounded-md w-[100%] mx-auto mt-3 cursor-pointer">
              <span className='font-bold'>Ara</span>
            </button> 
          </Box>
        </form>
      </Box>
    </Box>
  );
}




