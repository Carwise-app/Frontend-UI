import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import CustomizedSteppers from './CustomizedSteppers'
import DamageStep from './DamageStep'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import api from '../api/axios';
import { useSnackbar } from '../context/SnackbarContext';

export default function LearnDamageMainPage({activeStep,onHandleBack,stepLabel,onHandleNext,title,desc,allSteps,btnText, mode = 'create'}) {
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  const debugLocalStorage = () => {
  };

  const sendPredictionRequest = async () => {
    try {
      setLoading(true);
      
      debugLocalStorage();
      
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

      const chips = selectedDamage.chips || {};
      let orjinalSayisi = 0;
      let boyaliSayisi = 0;
      let degisenSayisi = 0;

      Object.values(chips).forEach(value => {
        if (value === "Orjinal") orjinalSayisi++;
        else if (value === "Boyalı" || value === "Lokal Boyalı") boyaliSayisi++;
        else if (value === "Değişen") degisenSayisi++;
      });

      const predictionData = {
        "Boyalı_sayısı": boyaliSayisi,
        "Değişen_sayısı": degisenSayisi,
        "Kasa_Tipi": selectedBodyType,
        "Kilometre": parseInt(selectedKm) || 0,
        "Marka": selectedBrand.name || "",
        "Model": selectedModel.name || "",
        "Motor_Gücü": parseInt(selectedMotorGucu) || 0,
        "Motor_Hacmi": parseInt(selectedMotorHacmi) || 0, 
        "Orjinal_sayısı": orjinalSayisi,
        "Renk": selectedColor,
        "Seri": selectedSeries.name || "",
        "Tramer": parseInt(selectedDamage.tramer) || 0,
        "Vites_Tipi": selectedTransmission,
        "Yakıt_Tipi": selectedFuelType,
        "Yıl": parseInt(selectedYear) || 0
      };

      const token = localStorage.getItem("access_token");

      const response = await api.post("/predict/", predictionData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      localStorage.setItem("predictionResult", JSON.stringify(response.data));
      
      onHandleNext();
      
    } catch (error) {
      console.error("=== TAHMİN HATASI ===");
      console.error("Error:", error);
      console.error("Error Message:", error.message);
      console.error("Error Response:", error.response?.data);
      console.error("Error Status:", error.response?.status);
      
      if (error.response?.status === 401) {
        showSnackbar("Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.", "error");
      } else if (error.response?.status === 400) {
        showSnackbar("Gönderilen veriler hatalı. Lütfen tüm alanları doldurun.", "error");
      } else {
        showSnackbar("Tahmin yapılırken bir hata oluştu. Lütfen tekrar deneyin.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = async () => {
    try {
      setLoading(true);
      
      debugLocalStorage();
      
      onHandleNext();
      
    } catch (error) {
      console.error("=== ADIM GEÇİŞ HATASI ===");
      console.error("Error:", error);
      showSnackbar("Bir sonraki adıma geçerken bir hata oluştu. Lütfen tekrar deneyin.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (mode === 'prediction') {
      sendPredictionRequest();
    } else {
      handleNextStep();
    }
  };

  const getLoadingText = () => {
    if (mode === 'prediction') {
      return loading ? 'Tahmin Yapılıyor...' : btnText;
    } else {
      return loading ? 'Geçiliyor...' : btnText;
    }
  };

  return (
   <Box className='bg-[#f7f7f7] w-[70%] pt-5 pb-15 my-5 mx-auto rounded-sm min-h-160 shadow-xs border-1 border-gray-100'>
        <Box className="bg-white w-[70%] mx-auto py-5 px-10 rounded-md flex flex-col shadow-md ">
          <span className='mb-2 text-3xl'>{title}</span>
          <span className='text-sm text-gray-600'>{desc}</span>
        </Box>
        <Box className="w-[70%] mx-auto mt-5">
          <CustomizedSteppers allSteps={allSteps} activeStep={activeStep} />
        </Box>
        <Box className="flex justify-between items-center w-[70%] mx-auto mt-5">
          <Button onClick={onHandleBack} variant='outlined' color='error'>Geri</Button>
        </Box>
        <Box className="flex flex-col w-[70%] mx-auto mt-4 gap-y-4">
          <DamageStep onClick={onHandleNext} onNext={() => {}} stepLabel={stepLabel} />
            <Box>
                <Box className="flex justify-center items-center h-full">
                    <button 
                      className='bg-[#dc143c] py-2 px-6 text-white rounded-2xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed' 
                      onClick={handleButtonClick}
                      disabled={loading}
                    >
                        <span>{getLoadingText()}</span>
                        {!loading && <NavigateNextIcon/>}
                    </button>   
                </Box>
            </Box>
        </Box>
      </Box>
  )
}
