import { Accordion, AccordionDetails, AccordionSummary, FormGroup} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useState } from 'react'

export default function AccordionCityBox({ mainTitle, title1, title2, provinces, districts, city, district, onCityChange, onDistrictChange,setCity, setDistrict }) {
        const handleCityChange = (e) => {
        setCity(e.target.value);
        setDistrict(''); 
        };
    
  return (
    <Accordion expanded={true} disableGutters square className="rounded-none">
        <AccordionSummary
        >
            <span className='font-semibold'>{mainTitle}</span>
        </AccordionSummary>
        <AccordionDetails className='flex flex-col gap-y-4'>
            <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel>{title1}</InputLabel>
                <Select
                    value={city}
                    label="İl"
                    onChange={onCityChange}
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
                    {provinces.map((p) => (
                        <MenuItem key={p.name} value={p.name}>{p.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }} size="small" disabled={!city}>
                <InputLabel>{title2}</InputLabel>
                <Select
                    value={district}
                    label="İlçe"
                    onChange={onDistrictChange}
                    onCityChange={handleCityChange}
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
                    {districts?.map((p) => (
                        <MenuItem key={p.name} value={p.name}>
                        {p.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </AccordionDetails>
    </Accordion>
  )
}
