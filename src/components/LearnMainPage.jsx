import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import CustomizedSteppers from "./CustomizedSteppers";
import LearnPriceCard from "./LearnPriceCard";
import LearnKmMainPage from "./LearnKmMainPage";
import LearnDamageMainPage from "./LearnDamageMainPage";
import LearnResultsMainPage from "./LearnResultsMainPage";
import api from "../api/axios";
import LearnEngineDetailsPage from "./LearnEngineDetailsPage";

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
    options: ["Siyah", "Beyaz", "Gri","Kırmızı","Mavi","Yeşil","Kahverengi","Sarı","Turuncu","Mor","Bordo","Diğer"],
    next: "motor-bilgisi",
  },
  {
    path: "motor-bilgisi",
    label: "Motor Bilgilerini Giriniz",
    placeholder: "",
    options: [],
    next: "km",
  },
  {
    path: "km",
    label: "Kilometre Bilginizi Giriniz",
    placeholder: "Örn: 120000",
    options: "",
    next: "hasar",
  },
  {
    path: "hasar",
    label: "Hasar Bilgilerinizi Doldurun",
    placeholder: "",
    options: "",
    next: "sonuc",
  },
  {
    path: "sonuc",
    label: "Aracınız İçin Belirlenen Fiyat",
    placeholder: "",
    options: "",
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
  "Motor Bilgisi",
  "Kilometre",
  "Hasar Kaydı",
  "Fiyat Tahmini",
];

export default function LearnMainPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentStepIndex = steps.findIndex((step) =>
    location.pathname.includes(step.path)
  );
  const currentStep = steps[currentStepIndex];
  const [searchValue, setSearchValue] = useState("");

  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedSeries, setSelectedSeries] = useState(null);

  const filteredOptions = (() => {
    let options = [];
    if (currentStep.path === "marka") {
      options = brands;
    } else if (currentStep.path === "seri" && selectedBrand?.series) {
      options = selectedBrand.series;
    } else if (currentStep.path === "model" && selectedSeries?.models) {
      options = selectedSeries.models;
    } else {
      options = currentStep.options;
    }

    return Array.isArray(options)
      ? options.filter((option) =>
          (option.name || option)
            .toLowerCase()
            .includes(searchValue.trim().toLowerCase())
        )
      : [];
  })();

  // console.log(filteredOptions)

  // Marka verisini çek
  useEffect(() => {
    const fetchBrands = async () => {
      try {
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
        console.error("Markalar alınamadı:", error);
      }
    };

    if (currentStep.path === "marka") {
      fetchBrands();
    }
  }, [currentStep.path]);

  const handleOptionClick = (value) => {
    if (currentStep.path === "marka") {
      setSelectedBrand(value);
      setSelectedSeries(null);
      localStorage.setItem("selectedBrand", JSON.stringify(value));
    }

    if (currentStep.path === "seri") {
      setSelectedSeries(value);
      localStorage.setItem("selectedSeries", JSON.stringify(value));
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
      navigate(`/fiyat-ogren/${currentStep.next}`);
      setSearchValue("");
    }
  };

  useEffect(() => {
    const savedBrand = localStorage.getItem("selectedBrand");
    const savedSeries = localStorage.getItem("selectedSeries");

    if (savedBrand) {
      const brandData = JSON.parse(savedBrand);
      setSelectedBrand(brandData);
    }

    if (savedSeries) {
      const seriesData = JSON.parse(savedSeries);
      setSelectedSeries(seriesData);
    }
  }, []);

  const handleBack = () => {
    if (currentStepIndex > 0) {
      navigate(`/fiyat-ogren/${steps[currentStepIndex - 1].path}`);
    }
  };

  const handleNext = () => {
    if (currentStep.next) {
      navigate(`/fiyat-ogren/${currentStep.next}`);
    }
  };

  if (currentStep.path === "hasar") {
    return (
      <LearnDamageMainPage
        title="Arabam Kaç Para?"
        desc="Araç bilgilerinizi seçerek aracınızın fiyatı öğrenin."
        onHandleBack={handleBack}
        onHandleNext={handleNext}
        activeStep={currentStepIndex}
        stepLabel={currentStep.label}
        allSteps={allSteps}
        btnText="Aracının Fiyatını Öğren"
        mode="prediction"
      />
    );
  }

  if(currentStep.path === "motor-bilgisi"){
    return(
      <LearnEngineDetailsPage
        title="Arabam Kaç Para?"
        desc="Araç bilgilerinizi seçerek aracınızın fiyatı öğrenin."
        onHandleBack={handleBack}
        onHandleNext={handleNext}
        activeStep={currentStepIndex}
        stepLabel={currentStep.label}
        allSteps={allSteps}
      />      
    )
  }

  if (currentStep.path === "km") {
    return (
      <LearnKmMainPage
        title="Arabam Kaç Para?"
        desc="Araç bilgilerinizi seçerek aracınızın fiyatı öğrenin."
        onHandleBack={handleBack}
        onHandleNext={handleNext}
        activeStep={currentStepIndex}
        stepLabel={currentStep.label}
        allSteps={allSteps}
      />
    );
  }

  if (currentStep.path === "sonuc") {
    return (
      <LearnResultsMainPage
        title="Arabam Kaç Para?"
        desc="Araç bilgilerinizi seçerek aracınızın fiyatı öğrenin."
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
        <span className="mb-2 text-3xl">Arabam Kaç Para?</span>
        <span className="text-sm text-gray-600">
          Araç bilgilerinizi seçerek aracınızın fiyatı öğrenin.
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
        <Box className="flex w-[70%] mx-auto mt-5 flex-wrap justify-start gap-x-[11px] gap-y-3">
          {filteredOptions.map((option) => (
            <LearnPriceCard
              key={option.id || option}
              onClick={() => handleOptionClick(option)}
              content={option.name || option}
              carId={option.id}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
