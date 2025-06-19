import { Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomizedSteppers from "../components/CustomizedSteppers";
import LearnPriceCard from "../components/LearnPriceCard";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router-dom";
import LearnDamageMainPage from "../components/LearnDamageMainPage";
import CreateDetailsInfo from "../components/CreateDetailsInfo";
import LearnResultsMainPage from "../components/LearnResultsMainPage";
import CreateAdvertsPrice from "../components/CreateAdvertsPrice";
import CreateAdvertsDescription from "../components/CreateAdvertsDescription";
import CreateAdvertsLocation from "../components/CreateAdvertsLocation";
import CreateAdvertsPhoto from "../components/CreateAdvertsPhoto";
import api from "../api/axios";

const steps = [
  {
    path: "marka",
    label: "Marka Seçiniz",
    placeholder: "Aracınızın markasını arayın",
    options: [],
    next: "seri",
  },
  {
    path: "seri",
    label: "Seri Seçiniz",
    placeholder: "Aracınızın serisini arayın",
    options: [],
    next: "model",
  },
  {
    path: "model",
    label: "Model Seçiniz",
    placeholder: "Aracınızın modelini arayın",
    options: [],
    next: "yil",
  },
  {
    path: "yil",
    label: "Yıl Seçiniz",
    placeholder: "Aracınızın yılını arayın",
    options: Array.from({ length: 2025 - 1990 + 1 }, (_, i) =>
      String(1990 + i)
    ).reverse(),
    next: "govde-tipi",
  },
  {
    path: "govde-tipi",
    label: "Gövde Tipi Seçiniz",
    placeholder: "Aracınızın gövde tipini arayın",
    options: ["Sedan", "SUV", "Hatchback", "Coupe", "Station Wagon"],
    next: "yakit-tipi",
  },
  {
    path: "yakit-tipi",
    label: "Yakıt Tipi Seçiniz",
    placeholder: "Aracınızın yakıt tipini arayın",
    options: ["Benzin&LPG", "Dizel", "Elektrik", "Hibrit"],
    next: "vites-tipi",
  },
  {
    path: "vites-tipi",
    label: "Vites Tipi Seçiniz",
    placeholder: "Aracınızın vites tipini arayın",
    options: ["Manuel", "Otomatik","Yarı Otomatik"],
    next: "renk",
  },
  {
    path: "renk",
    label: "Renk Seçiniz",
    placeholder: "Aracınızın rengini arayın",
    options: ["Siyah", "Beyaz", "Kırmızı","Mavi","Yeşil","Kahverengi","Sarı","Turuncu","Mor","Bordo","Diğer"],
    next: "detaylar",
  },
  {
    path: "detaylar",
    label: "Gereken Bilgilerinizi Doldurun",
    options: [],
    next: "hasar",
  },
  {
    path: "hasar",
    label: "Hasar Bilgilerinizi Doldurun",
    options: [],
    next: "fiyat-ve-baslik",
  },
  {
    path: "fiyat-ve-baslik",
    label: "İlanınız İçin Fiyat ve Başlık Belirleyin",
    options: [],
    next: "aciklama",
  },
  {
    path: "aciklama",
    label: "İlan İçin Açıklama Yazınız",
    options: [],
    next: "konum-bilgisi",
  },
  {
    path: "konum-bilgisi",
    label: "Konum Bilgisi Giriniz",
    options: [],
    next: "fotograf-yukle",
  },
  {
    path: "fotograf-yukle",
    label: "Aracınızın Fotoğraflarını yükleyiniz",
    options: [],
    next: null,
  },
];

const allSteps = [
  "Marka",
  "Seri",
  "Model",
  "Yıl",
  "Gövde Tipi",
  "Yakıt Tipi",
  "Vites Tipi",
  "Renk",
  "Detaylı Bilgiler",
  "Hasar Bilgileri",
  "Fiyat ve Başlık",
  "Açıklama",
  "Konum Bilgisi",
  "Fotoğraf Yükleme",
];

export default function CreateAdverts() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentStepIndex = steps.findIndex((step) =>
    location.pathname.includes(step.path)
  );
  const currentStep = currentStepIndex !== -1 ? steps[currentStepIndex] : null;
  const [searchValue, setSearchValue] = useState("");
  const [brands, setBrands] = useState([]);
  const [series, setSeries] = useState([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);

  // Markaları getir
  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await api.get("/brand/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = response.data;
      const brandData =
        data.brands?.map((item) => ({
          id: item.id,
          name: item.name,
          series: item.series?.map((series) => ({
            id: series.id,
            name: series.name,
            models: series.models,
          })),
        })) || [];
      setBrands(brandData);
    } catch (error) {
      console.error("Markalar yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  // Seçilen markaya ait serileri getir
  const getSeriesForBrand = (brandId) => {
    const selectedBrand = brands.find(brand => brand.id === brandId);
    return selectedBrand?.series || [];
  };

  // Seçilen seriye ait modelleri getir
  const getModelsForSeries = (brandId, seriesId) => {
    const selectedBrand = brands.find(brand => brand.id === brandId);
    const selectedSeries = selectedBrand?.series?.find(series => series.id === seriesId);
    return selectedSeries?.models || [];
  };

  // Sayfa yüklendiğinde markaları getir
  useEffect(() => {
    if (currentStep?.path === "marka") {
      fetchBrands();
    }
  }, [currentStep?.path]);

  if (!currentStep) {
    return (
      <Box className="mt-10 font-bold text-center text-red-600">
        Sayfa bulunamadı. Lütfen doğru bir adım adresinde olduğunuzdan emin
        olun.
      </Box>
    );
  }

  // Mevcut adıma göre options'ları belirle
  const getCurrentOptions = () => {
    if (currentStep.path === "marka") {
      return brands;
    } else if (currentStep.path === "seri") {
      const selectedBrand = JSON.parse(localStorage.getItem("selectedBrand") || "{}");
      const seriesData = getSeriesForBrand(selectedBrand.id);
      return seriesData;
    } else if (currentStep.path === "model") {
      const selectedBrand = JSON.parse(localStorage.getItem("selectedBrand") || "{}");
      const selectedSeries = JSON.parse(localStorage.getItem("selectedSeries") || "{}");
      const modelsData = getModelsForSeries(selectedBrand.id, selectedSeries.id);
      return modelsData;
    } else {
      return currentStep.options || [];
    }
  };

  const currentOptions = getCurrentOptions();

  const filteredOptions =
    currentOptions && Array.isArray(currentOptions)
      ? currentOptions.filter((option) => {
          const optionName = option.name || option;
          return optionName
            .toLowerCase()
            .includes(searchValue.trim().toLowerCase());
        })
      : [];

  const handleOptionClick = (value) => {
    if (currentStep.path === "marka") {
      localStorage.setItem("selectedBrand", JSON.stringify(value));
      localStorage.removeItem("selectedSeries");
      localStorage.removeItem("selectedModel");
      setSeries([]);
      setModels([]);
    }

    if (currentStep.path === "seri") {
      localStorage.setItem("selectedSeries", JSON.stringify(value));
      localStorage.removeItem("selectedModel");
      setModels([]);
    }

    if (currentStep.path === "model") {
      localStorage.setItem("selectedModel", JSON.stringify(value));
    }

    if (currentStep.path === "yil") {
      localStorage.setItem("selectedYear", value);
    }

    if (currentStep.path === "govde-tipi") {
      localStorage.setItem("selectedBodyType", value);
    }

    if (currentStep.path === "yakit-tipi") {
      localStorage.setItem("selectedFuelType", value);
    }

    if (currentStep.path === "vites-tipi") {
      localStorage.setItem("selectedTransmission", value);
    }

    if (currentStep.path === "renk") {
      localStorage.setItem("selectedColor", value);
    }

    if (currentStep.next) {
      navigate(`/ilan-olustur/${currentStep.next}`);
      setSearchValue("");
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      navigate(`/ilan-olustur/${steps[currentStepIndex - 1].path}`);
    }
  };

  const handleNext = () => {
    if (currentStep.next) {
      navigate(`/ilan-olustur/${currentStep.next}`);
    }
  };

  if (currentStep.path === "hasar") {
    return (
      <LearnDamageMainPage
        title="İlan Oluştur"
        desc="Araç bilgilerinizi doldurarak aracınızın ilanını oluşturun."
        onHandleBack={handleBack}
        onHandleNext={handleNext}
        activeStep={currentStepIndex}
        stepLabel={currentStep.label}
        allSteps={allSteps}
        btnText="Devam Et"
        mode="create"
      />
    );
  }

  if (currentStep.path === "detaylar") {
    return (
      <CreateDetailsInfo
        title="İlan Oluştur"
        desc="Araç bilgilerinizi doldurarak aracınızın ilanını oluşturun."
        onHandleBack={handleBack}
        onHandleNext={handleNext}
        activeStep={currentStepIndex}
        stepLabel={currentStep.label}
        allSteps={allSteps}
      />
    );
  }

  if (currentStep.path === "fiyat-ve-baslik") {
    return (
      <CreateAdvertsPrice
        title="İlan Oluştur"
        desc="Araç bilgilerinizi doldurarak aracınızın ilanını oluşturun."
        onHandleBack={handleBack}
        onHandleNext={handleNext}
        activeStep={currentStepIndex}
        stepLabel={currentStep.label}
        allSteps={allSteps}
      />
    );
  }

  if (currentStep.path === "aciklama") {
    return (
      <CreateAdvertsDescription
        title="İlan Oluştur"
        desc="Araç bilgilerinizi doldurarak aracınızın ilanını oluşturun."
        onHandleBack={handleBack}
        onHandleNext={handleNext}
        activeStep={currentStepIndex}
        stepLabel={currentStep.label}
        allSteps={allSteps}
      />
    );
  }

  if (currentStep.path === "konum-bilgisi") {
    return (
      <CreateAdvertsLocation
        title="İlan Oluştur"
        desc="Araç bilgilerinizi doldurarak aracınızın ilanını oluşturun."
        onHandleBack={handleBack}
        onHandleNext={handleNext}
        activeStep={currentStepIndex}
        stepLabel={currentStep.label}
        allSteps={allSteps}
      />
    );
  }

  if (currentStep.path === "fotograf-yukle") {
    return (
      <CreateAdvertsPhoto
        title="İlan Oluştur"
        desc="Araç bilgilerinizi doldurarak aracınızın ilanını oluşturun."
        onHandleBack={handleBack}
        onHandleNext={handleNext}
        activeStep={currentStepIndex}
        stepLabel={currentStep.label}
        allSteps={allSteps}
      />
    );
  }

  return (
    <Box className="bg-[#f7f7f7] w-[70%] pt-5 pb-15 my-5 mx-auto rounded-sm min-h-160 shadow-xs border-1 border-gray-100">
      <Box className="bg-white w-[70%] mx-auto py-5 px-10 rounded-md flex flex-col shadow-md ">
        <span className="mb-2 text-3xl">İlan Oluştur</span>
        <span className="text-sm text-gray-600">
          Araç bilgilerinizi doldurarak aracınızın ilanını oluşturun.
        </span>
      </Box>
      <Box className="w-[70%] mx-auto mt-5">
        <CustomizedSteppers allSteps={allSteps} activeStep={currentStepIndex} />
      </Box>

      <Box className="flex justify-between items-center w-[70%] mx-auto mt-5">
        <Button
          onClick={handleBack}
          disabled={currentStepIndex === 0}
          variant="outlined"
          color="error"
        >
          Geri
        </Button>
      </Box>
      <Box>
        <Box className="flex w-[70%] mx-auto mt-4">
          <span className="text-lg">{currentStep.label}</span>
        </Box>
        <Box className="flex w-[70%] rounded bg-white mx-auto mt-2 shadow-sm">
          <input
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={currentStep.placeholder}
            className="px-4 py-4 w-full text-base text-black bg-transparent border-none outline-none focus:outline-none placeholder:text-base"
          />
          <button className="px-2 py-2 text-white cursor-pointer">
            <SearchIcon sx={{ fontSize: 40 }} className="text-[#dc143c]" />
          </button>
        </Box>
        <Box className="grid grid-cols-4 w-[70%] mx-auto mt-5  justify-start gap-x-[11px] gap-y-3">
          {loading ? (
            <Box className="py-8 w-full text-center">
              <span className="text-gray-600">Yükleniyor...</span>
            </Box>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <LearnPriceCard
                key={option.id || option}
                onClick={() => handleOptionClick(option)}
                content={option.name || option}
              />
            ))
          ) : (
            <Box className="py-8 w-full text-center">
              <span className="text-gray-600">Sonuç bulunamadı</span>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
