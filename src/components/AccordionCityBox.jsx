import { Accordion, AccordionDetails, AccordionSummary, FormGroup} from '@mui/material';
import ExpandMoreIcon  from '@mui/icons-material/ExpandMore';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useEffect, useState } from 'react'

export default function AccordionCityBox({ title, cityDistrictData, selectedOptions = { city: '', district: '' }, onChange }) {
const [districtOptions, setDistrictOptions] = useState([]);

useEffect(() => {
    const newDistricts = cityDistrictData[selectedOptions.city] || [];
    setDistrictOptions(newDistricts);
  }, [selectedOptions.city, cityDistrictData]);

const handleCityChange = (event) => {
    const newCity = event.target.value;
    onChange({ city: newCity, district: '' }); 
  };
const handleDistrictChange = (event) => {
    const newDistrict = event.target.value;
    onChange({ ...selectedOptions, district: newDistrict });
  };

  return (
    <Accordion expanded={true} disableGutters square className="rounded-none">
        <AccordionSummary
        >
            <span className='font-semibold'>{title}</span>
        </AccordionSummary>
        <AccordionDetails className='flex flex-col gap-y-2'>
            <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel>İl</InputLabel>
                <Select
                    value={selectedOptions.city}
                    label="City"
                    onChange={handleCityChange}
                    MenuProps={{
                        PaperProps:{
                            style:{
                                maxHeight:150
                            }
                        }
                    }}
                >
                    <MenuItem value="">
                    Seçim yapma
                    </MenuItem>
                    {Object.keys(cityDistrictData)?.map((city) => (
                        <MenuItem key={city} value={city}>{city}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel>İlçe</InputLabel>
                <Select
                    value={selectedOptions.district}
                    label="District"
                    onChange={handleDistrictChange}
                    MenuProps={{
                        PaperProps:{
                            style:{
                                maxHeight:150
                            }
                        }
                    }}
                >
                    <MenuItem value="">
                    Seçim yapma
                    </MenuItem>
                    {districtOptions?.map((district) => (
                        <MenuItem key={district} value={district}>
                        {district}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </AccordionDetails>
    </Accordion>
  )
}
