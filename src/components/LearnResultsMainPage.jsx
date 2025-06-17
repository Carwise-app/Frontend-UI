import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip } from '@mui/material'
import React, { useState, useEffect } from 'react'
import CustomizedSteppers from './CustomizedSteppers'
import AnimatedPrice from './AnimatedPrice'
import ExpandMoreIcon  from '@mui/icons-material/ExpandMore';
import { NavLink } from 'react-router-dom';

export default function LearnResultsMainPage({activeStep,stepLabel,title,desc,allSteps}) {
  const [predictionResult, setPredictionResult] = useState(null);
  const [selectedData, setSelectedData] = useState({});

  useEffect(() => {
    // localStorage'dan tahmin sonucunu al
    const result = localStorage.getItem("predictionResult");
    if (result) {
      setPredictionResult(JSON.parse(result));
    }

    // localStorage'dan seçilen verileri al
    const selectedBrand = JSON.parse(localStorage.getItem("selectedBrand") || "{}");
    const selectedSeries = JSON.parse(localStorage.getItem("selectedSeries") || "{}");
    const selectedModel = JSON.parse(localStorage.getItem("selectedModel") || "{}");
    const selectedYear = localStorage.getItem("selectedYear") || "";
    const selectedBodyType = localStorage.getItem("selectedBodyType") || "";
    const selectedFuelType = localStorage.getItem("selectedFuelType") || "";
    const selectedTransmission = localStorage.getItem("selectedTransmission") || "";
    const selectedColor = localStorage.getItem("selectedColor") || "";
    const selectedMotorGucu = localStorage.getItem("selectedMotorGucu") || "";
    const selectedMotorHacmi = localStorage.getItem("selectedMotorHacmi") || "";
    const selectedKm = localStorage.getItem("selectedKm") || "";
    const selectedDamage = JSON.parse(localStorage.getItem("selectedDamage") || "{}");

    setSelectedData({
      brand: selectedBrand.name || "",
      series: selectedSeries.name || "",
      model: selectedModel.name || "",
      year: selectedYear,
      bodyType: selectedBodyType,
      fuelType: selectedFuelType,
      transmission: selectedTransmission,
      color: selectedColor,
      motorGucu: selectedMotorGucu,
      motorHacmi: selectedMotorHacmi,
      km: selectedKm,
      damage: selectedDamage
    });
  }, []);

  // Hasar bilgilerini formatla
  const formatDamageInfo = () => {
    const chips = selectedData.damage?.chips || {};
    let orjinalSayisi = 0;
    let boyaliSayisi = 0;
    let degisenSayisi = 0;

    Object.values(chips).forEach(value => {
      if (value === "Orjinal") orjinalSayisi++;
      else if (value === "Boyalı" || value === "Lokal Boyalı") boyaliSayisi++;
      else if (value === "Değişen") degisenSayisi++;
    });

    return { orjinalSayisi, boyaliSayisi, degisenSayisi };
  };

  const damageInfo = formatDamageInfo();

  return (
   <Box className='bg-[#f7f7f7] w-[70%] pt-5 pb-15 my-5 mx-auto rounded-sm min-h-160 shadow-xs border-1 border-gray-100'>
        <Box className="bg-white w-[70%] mx-auto py-5 px-10 rounded-md flex flex-col shadow-md ">
          <span className='mb-2 text-3xl'>{title}</span>
          <span className='text-sm text-gray-600'>{desc}</span>
        </Box>
        <Box className="w-[70%] mx-auto mt-5">
          <CustomizedSteppers allSteps={allSteps} activeStep={activeStep} />
        </Box>
        <Box className="flex flex-col w-[70%] mx-auto mt-4 gap-y-4">
            <Box className="bg-white border-gray-100 rounded-md shadow-xs border-1">
                <Box className="w-[95%] mx-auto py-2">
                    <span className='text-lg'>{stepLabel}</span>
                </Box>
            </Box>
            <Box className="flex flex-col items-center py-8 bg-white border-gray-100 rounded-md shadow-xs border-1 gap-y-10">
                <Box className="flex flex-col items-center w-full gap-y-2">
                    <span className='text-xl font-medium text-[#dc143c]'>Tahmini Değer</span>
                    <span className='font-semibold'>
                      {predictionResult ? (
                        <AnimatedPrice targetPrice={predictionResult.tahmini_fiyat || predictionResult.predicted_price || 0}/>
                      ) : (
                        <span className='text-gray-500'>Tahmin sonucu yükleniyor...</span>
                      )}
                    </span>
                </Box>
                <Box className="flex flex-col items-center text-[#dc143c] bg-[rgba(255,80,115,0.2)] rounded-xl py-4 px-2">
                    <span className='text-lg font-semibold'>Tahminin Sapması</span>
                    <Box className="flex flex-col items-center gap-y-2">
                        <span className='text-2xl font-semibold'>
                          {predictionResult ? `±₺${predictionResult.mae || 65097}` : '±₺65.097'}
                        </span>
                        <span className='text-xs italic text-gray-400'>*Bu değer, tahminin ortalama sapma miktarını gösterir</span>
                    </Box>
                </Box>
                <Box className="flex justify-center w-full px-10">
                    <Accordion disableGutters className="rounded-none w-[100%] ">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{fontSize:20}}/>}
                        >
                            <span className='font-semibold'>Sorgulanan Araç Bilgileri</span>
                        </AccordionSummary>
                        <AccordionDetails className='grid grid-cols-4 gap-3'>
                            <Chip label={selectedData.brand || "Marka"} sx={{color:"white"}} color='error'/>
                            <Chip label={selectedData.series || "Seri"} sx={{color:"white"}} color='error'/>
                            <Chip label={selectedData.model || "Model"} sx={{color:"white"}} color='error'/>
                            <Chip label={selectedData.year || "Yıl"} sx={{color:"white"}} color='error'/>
                            <Chip label={selectedData.bodyType || "Gövde"} sx={{color:"white"}} color='error'/>
                            <Chip label={selectedData.transmission || "Vites"} sx={{color:"white"}} color='error'/>
                            <Chip label={selectedData.fuelType || "Yakıt"} sx={{color:"white"}} color='error'/>
                            <Chip label={selectedData.color || "Renk"} sx={{color:"white"}} color='error'/>
                            <Chip label={`${selectedData.motorGucu || 0} HP`} sx={{color:"white"}} color='error'/>
                            <Chip label={`${selectedData.motorHacmi || 0} cc`} sx={{color:"white"}} color='error'/>
                            <Chip label={`${selectedData.km || 0} Km`} sx={{color:"white"}} color='error'/>
                            <Chip label={`${damageInfo.orjinalSayisi} Orjinal`} sx={{color:"white"}} color='error'/>
                            <Chip label={`${damageInfo.boyaliSayisi} Boyalı`} sx={{color:"white"}} color='error'/>
                            <Chip label={`${damageInfo.degisenSayisi} Değişen`} sx={{color:"white"}} color='error'/>
                        </AccordionDetails>
                    </Accordion>
                </Box>
                <Box className="flex gap-x-5">
                    <NavLink to="/">
                        <Button variant='outlined' color='error'>
                            <span>Ana Sayfa</span> 
                        </Button> 
                    </NavLink>
                    <NavLink to="/fiyat-ogren">
                        <Button variant='outlined'>
                            <span>Başka Araç Sorgula</span>
                        </Button>      
                    </NavLink>
                </Box>
            </Box>
          
        </Box>
      </Box>
  )
}
