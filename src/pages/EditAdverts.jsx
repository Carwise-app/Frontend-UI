import { Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomizedSteppers from "../components/CustomizedSteppers";
import LearnPriceCard from "../components/LearnPriceCard";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LearnDamageMainPage from "../components/LearnDamageMainPage";
import CreateDetailsInfo from "../components/CreateDetailsInfo";
import LearnResultsMainPage from "../components/LearnResultsMainPage";
import CreateAdvertsPrice from "../components/CreateAdvertsPrice";
import CreateAdvertsDescription from "../components/CreateAdvertsDescription";
import CreateAdvertsLocation from "../components/CreateAdvertsLocation";
import CreateAdvertsPhoto from "../components/CreateAdvertsPhoto";
import api from "../api/axios";
import { useSnackbar } from "../context/SnackbarContext";

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

export default function EditAdverts() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { showSnackbar } = useSnackbar();
  const currentStepIndex = steps.findIndex((step) =>
    location.pathname.includes(step.path)
  );
  const currentStep = currentStepIndex !== -1 ? steps[currentStepIndex] : null;
  const [searchValue, setSearchValue] = useState("");
  const [brands, setBrands] = useState([]);
  const [series, setSeries] = useState([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listingData, setListingData] = useState(null);
  const [isLoadingListing, setIsLoadingListing] = useState(true);
  const [brandsLoaded, setBrandsLoaded] = useState(false);

  // İlan verilerini getir
  const fetchListingData = async () => {
    try {
      setIsLoadingListing(true);
      console.log("İlan verileri yükleniyor, ID:", id);
      
      // Farklı endpoint'leri dene
      const endpoints = [
        `/listing/${id}/`,
        `/listing/${id}`,
        `/listings/${id}/`,
        `/listings/${id}`
      ];
      
      let data = null;
      let successEndpoint = null;
      
      for (const endpoint of endpoints) {
        try {
          console.log(`GET ${endpoint} deneniyor...`);
          const response = await api.get(endpoint, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            timeout: 10000, // 10 saniye timeout
          });
          
          data = response.data;
          successEndpoint = endpoint;
          console.log(`GET ${endpoint} başarılı:`, data);
          break;
        } catch (endpointError) {
          console.log(`GET ${endpoint} başarısız:`, endpointError.response?.status || endpointError.message);
          continue;
        }
      }
      
      if (!data) {
        throw new Error("Hiçbir endpoint çalışmadı");
      }
      
      setListingData(data);
      
      // localStorage'a mevcut verileri kaydet
      if (data.brand_id) {
        localStorage.setItem("selectedBrand", JSON.stringify({ id: data.brand_id }));
      }
      if (data.series_id) {
        localStorage.setItem("selectedSeries", JSON.stringify({ id: data.series_id }));
      }
      if (data.model_id) {
        localStorage.setItem("selectedModel", JSON.stringify({ id: data.model_id }));
      }
      if (data.detail?.year) {
        localStorage.setItem("selectedYear", data.detail.year.toString());
      }
      if (data.detail?.body_type) {
        localStorage.setItem("selectedBodyType", data.detail.body_type);
      }
      if (data.detail?.fuel_type) {
        localStorage.setItem("selectedFuelType", data.detail.fuel_type);
      }
      if (data.detail?.transmission_type) {
        localStorage.setItem("selectedTransmission", data.detail.transmission_type);
      }
      if (data.detail?.color) {
        localStorage.setItem("selectedColor", data.detail.color);
      }
      
      // Detay bilgileri
      if (data.detail) {
        localStorage.setItem("enginePower", data.detail.engine_power?.toString() || "");
        localStorage.setItem("engineVolume", data.detail.engine_volume?.toString() || "");
        localStorage.setItem("kilometers", data.detail.kilometers?.toString() || "");
        localStorage.setItem("driveType", data.detail.drive_type || "");
      }
      
      // Hasar bilgileri
      if (data.detail) {
        localStorage.setItem("heavyDamage", data.detail.heavy_damage?.toString() || "false");
        localStorage.setItem("frontHood", data.detail.front_hood || "");
        localStorage.setItem("frontBumper", data.detail.front_bumper || "");
        localStorage.setItem("frontLeftDoor", data.detail.front_left_door || "");
        localStorage.setItem("frontRightDoor", data.detail.front_right_door || "");
        localStorage.setItem("frontLeftMudguard", data.detail.front_left_mudguard || "");
        localStorage.setItem("rearBumper", data.detail.rear_bumper || "");
        localStorage.setItem("rearLeftDoor", data.detail.rear_left_door || "");
        localStorage.setItem("rearRightDoor", data.detail.rear_right_door || "");
        localStorage.setItem("rearLeftMudguard", data.detail.rear_left_mudguard || "");
        localStorage.setItem("roof", data.detail.roof || "");
      }
      
      // Fiyat ve başlık
      localStorage.setItem("price", data.price?.toString() || "");
      localStorage.setItem("title", data.title || "");
      localStorage.setItem("currency", data.currency || "TRY");
      
      // Açıklama
      localStorage.setItem("description", data.description || "");
      
      // Konum bilgileri
      localStorage.setItem("city", data.city || "");
      localStorage.setItem("district", data.district || "");
      localStorage.setItem("neighborhood", data.neighborhood || "");
      
      // Fotoğraflar
      if (data.images && data.images.length > 0) {
        console.log("API'den gelen fotoğraflar:", data.images);
        localStorage.setItem("uploadedImages", JSON.stringify(data.images));
        console.log("Fotoğraflar localStorage'a kaydedildi");
      }
      
      console.log("İlan verileri başarıyla yüklendi ve localStorage'a kaydedildi");
      console.log("Kullanılan endpoint:", successEndpoint);
      
    } catch (error) {
      console.error("İlan verileri yüklenirken hata:", error);
      console.error("Error details:", {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
      
      if (error.code === 'ERR_NETWORK') {
        showSnackbar("Ağ bağlantısı hatası. Lütfen internet bağlantınızı kontrol edin.", "error");
      } else if (error.response?.status === 404) {
        showSnackbar("İlan bulunamadı. Lütfen tekrar deneyin.", "error");
      } else if (error.response?.status === 401) {
        showSnackbar("Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.", "error");
      } else {
        showSnackbar("İlan verileri yüklenirken bir hata oluştu.", "error");
      }
    } finally {
      setIsLoadingListing(false);
    }
  };

  // Markaları getir
  const fetchBrands = async () => {
    try {
      setLoading(true);
      console.log("Markalar yükleniyor...");
      
      const response = await api.get("/brand/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        timeout: 10000, // 10 saniye timeout
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
      console.log("Marka verisi başarıyla yüklendi:", brandData.length, "marka");
    } catch (error) {
      console.error("Markalar yüklenirken hata:", error);
      console.error("Error details:", {
        message: error.message,
        code: error.code,
        status: error.response?.status
      });
      
      if (error.code === 'ERR_NETWORK') {
        console.warn("Ağ hatası, markalar yüklenemedi");
      } else {
        console.error("Markalar yüklenirken beklenmeyen hata:", error);
      }
    } finally {
      setLoading(false);
      setBrandsLoaded(true);
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

  // Sayfa yüklendiğinde ilan verilerini ve markaları getir
  useEffect(() => {
    if (id) {
      fetchListingData();
    }
    if (!brandsLoaded) {
      fetchBrands();
    }
  }, [id, brandsLoaded]);

  // localStorage'dan mevcut verileri kontrol et ve kullan
  useEffect(() => {
    // Eğer API'den veri yüklenemezse localStorage'dan mevcut verileri kullan
    const checkExistingData = () => {
      const hasExistingData = localStorage.getItem("selectedBrand") && 
                             localStorage.getItem("selectedSeries") && 
                             localStorage.getItem("selectedModel");
      
      if (hasExistingData && !listingData) {
        console.log("API verisi yüklenemedi, localStorage'dan mevcut veriler kullanılıyor");
        // Mevcut veriler varsa sayfayı çalışır hale getir
        setListingData({ id: id }); // Minimal data
      }
    };

    // 5 saniye sonra kontrol et
    const timer = setTimeout(checkExistingData, 5000);
    return () => clearTimeout(timer);
  }, [listingData, id]);

  // İlanı güncelle
  const updateListing = async (formData) => {
    try {
      console.log("PUT isteği gönderiliyor:", `/listing/${id}/`);
      console.log("Gönderilen veri:", formData);
      
      // Daha kapsamlı endpoint testleri
      const endpoints = [
        `/listing/${id}/`,
        `/listing/${id}`,
        `/listings/${id}/`,
        `/listings/${id}`,
        `/api/listing/${id}/`,
        `/api/listing/${id}`,
        `/api/listings/${id}/`,
        `/api/listings/${id}`,
        `/v1/listing/${id}/`,
        `/v1/listing/${id}`,
        `/v1/listings/${id}/`,
        `/v1/listings/${id}`
      ];
      
      const methods = ['put', 'patch', 'post'];
      
      for (const method of methods) {
        for (const endpoint of endpoints) {
          try {
            console.log(`${method.toUpperCase()} ${endpoint} deneniyor...`);
            
            const config = {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                'Content-Type': 'application/json',
              },
              maxRedirects: 0, // Redirect'leri takip etme
              validateStatus: function (status) {
                return status >= 200 && status < 400;
              },
              timeout: 10000,
            };
            
            const response = await api[method](endpoint, formData, config);
            
            console.log(`${method.toUpperCase()} ${endpoint} başarılı:`, response.data);
            showSnackbar("İlan başarıyla güncellendi!", "success");
            navigate("/kokpit/ilanlarim");
            return response;
          } catch (testError) {
            const status = testError.response?.status;
            const message = testError.message;
            console.log(`${method.toUpperCase()} ${endpoint} başarısız:`, {
              status: status,
              message: message,
              isRedirect: status === 307 || status === 302 || status === 301
            });
            
            // 307 redirect durumunda Location header'ını kontrol et
            if (status === 307 && testError.response?.headers?.location) {
              console.log("Redirect Location:", testError.response.headers.location);
              try {
                const redirectResponse = await api[method](testError.response.headers.location, formData, config);
                console.log("Redirect başarılı:", redirectResponse.data);
                showSnackbar("İlan başarıyla güncellendi!", "success");
                navigate("/kokpit/ilanlarim");
                return redirectResponse;
              } catch (redirectError) {
                console.log("Redirect başarısız:", redirectError.response?.status);
              }
            }
            
            continue;
          }
        }
      }
      
      // Hiçbiri çalışmazsa, farklı bir yaklaşım dene
      console.log("Tüm endpoint'ler başarısız, alternatif yaklaşım deneniyor...");
      
      // POST ile güncelleme dene (bazı API'ler PUT yerine POST kullanır)
      try {
        const postResponse = await api.post(`/listing/${id}/update/`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            'Content-Type': 'application/json',
          },
          timeout: 15000,
        });
        
        console.log("POST /update/ başarılı:", postResponse.data);
        showSnackbar("İlan başarıyla güncellendi!", "success");
        navigate("/kokpit/ilanlarim");
        return postResponse;
      } catch (postError) {
        console.log("POST /update/ başarısız:", postError.response?.status);
      }
      
      // Son çare: Orijinal PUT isteğini dene
      const response = await api.put(`/listing/${id}/`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json',
        },
        maxRedirects: 5,
        validateStatus: function (status) {
          return status >= 200 && status < 400;
        },
        timeout: 15000,
      });
      
      console.log("Son çare PUT başarılı:", response.data);
      showSnackbar("İlan başarıyla güncellendi!", "success");
      navigate("/kokpit/ilanlarim");
      return response;
      
    } catch (error) {
      console.error("İlan güncellenirken hata:", error);
      console.error("Error details:", {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
        config: error.config
      });
      
      if (error.response?.status === 307) {
        showSnackbar("API yönlendirme hatası. Lütfen daha sonra tekrar deneyin.", "error");
      } else if (error.code === 'ERR_NETWORK') {
        showSnackbar("Ağ bağlantısı hatası. Lütfen internet bağlantınızı kontrol edin.", "error");
      } else {
        showSnackbar("İlan güncellenirken bir hata oluştu. Lütfen tekrar deneyin.", "error");
      }
      
      throw error;
    }
  };

  if (isLoadingListing) {
    return (
      <Box className="flex justify-center items-center py-12">
        <span className="text-gray-600">İlan verileri yükleniyor...</span>
      </Box>
    );
  }

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
      console.log("Marka seçenekleri yükleniyor:", brands.length, "marka");
      return brands;
    } else if (currentStep.path === "seri") {
      const selectedBrand = JSON.parse(localStorage.getItem("selectedBrand") || "{}");
      const seriesData = getSeriesForBrand(selectedBrand.id);
      console.log("Seri seçenekleri yükleniyor:", seriesData.length, "seri, Marka:", selectedBrand.name);
      return seriesData;
    } else if (currentStep.path === "model") {
      const selectedBrand = JSON.parse(localStorage.getItem("selectedBrand") || "{}");
      const selectedSeries = JSON.parse(localStorage.getItem("selectedSeries") || "{}");
      const modelsData = getModelsForSeries(selectedBrand.id, selectedSeries.id);
      console.log("Model seçenekleri yükleniyor:", modelsData.length, "model, Seri:", selectedSeries.name);
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
    console.log(`Seçilen ${currentStep.path}:`, value);

    // Marka seçildiğinde brand bilgisini kaydet ve sonraki seçimleri temizle
    if (currentStep.path === "marka") {
      localStorage.setItem("selectedBrand", JSON.stringify(value));
      localStorage.removeItem("selectedSeries");
      localStorage.removeItem("selectedModel");
      setSeries([]);
      setModels([]);
      console.log("✅ Marka seçildi:", value.name, "- Seri ve model seçimleri temizlendi");
    }

    // Seri seçildiğinde seri bilgisini kaydet ve sonraki seçimleri temizle
    if (currentStep.path === "seri") {
      localStorage.setItem("selectedSeries", JSON.stringify(value));
      localStorage.removeItem("selectedModel");
      setModels([]);
      console.log("✅ Seri seçildi:", value.name, "- Model seçimi temizlendi");
    }

    // Model seçildiğinde model bilgisini kaydet
    if (currentStep.path === "model") {
      localStorage.setItem("selectedModel", JSON.stringify(value));
      console.log("✅ Model seçildi:", value.name);
    }

    // Yıl seçildiğinde yıl bilgisini kaydet
    if (currentStep.path === "yil") {
      localStorage.setItem("selectedYear", value);
      console.log("✅ Yıl seçildi:", value);
    }

    // Gövde tipi seçildiğinde gövde tipi bilgisini kaydet
    if (currentStep.path === "govde-tipi") {
      localStorage.setItem("selectedBodyType", value);
      console.log("✅ Gövde tipi seçildi:", value);
    }

    // Yakıt tipi seçildiğinde yakıt tipi bilgisini kaydet
    if (currentStep.path === "yakit-tipi") {
      localStorage.setItem("selectedFuelType", value);
      console.log("✅ Yakıt tipi seçildi:", value);
    }

    // Vites tipi seçildiğinde vites tipi bilgisini kaydet
    if (currentStep.path === "vites-tipi") {
      localStorage.setItem("selectedTransmission", value);
      console.log("✅ Vites tipi seçildi:", value);
    }

    // Renk seçildiğinde renk bilgisini kaydet
    if (currentStep.path === "renk") {
      localStorage.setItem("selectedColor", value);
      console.log("✅ Renk seçildi:", value);
    }

    if (currentStep.next) {
      navigate(`/ilan-duzenle/${id}/${currentStep.next}`);
      setSearchValue("");
    } else {
      console.log("Tüm adımlar tamamlandı.");
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      navigate(`/ilan-duzenle/${id}/${steps[currentStepIndex - 1].path}`);
    }
  };

  const handleNext = () => {
    if (currentStep.next) {
      navigate(`/ilan-duzenle/${id}/${currentStep.next}`);
    }
  };

  if (currentStep.path === "hasar") {
    return (
      <LearnDamageMainPage
        title="İlan Düzenle"
        desc="Araç bilgilerinizi düzenleyerek ilanınızı güncelleyin."
        onHandleBack={handleBack}
        onHandleNext={handleNext}
        activeStep={currentStepIndex}
        stepLabel={currentStep.label}
        allSteps={allSteps}
        btnText="Devam Et"
      />
    );
  }

  if (currentStep.path === "detaylar") {
    return (
      <CreateDetailsInfo
        title="İlan Düzenle"
        desc="Araç bilgilerinizi düzenleyerek ilanınızı güncelleyin."
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
        title="İlan Düzenle"
        desc="Araç bilgilerinizi düzenleyerek ilanınızı güncelleyin."
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
        title="İlan Düzenle"
        desc="Araç bilgilerinizi düzenleyerek ilanınızı güncelleyin."
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
        title="İlan Düzenle"
        desc="Araç bilgilerinizi düzenleyerek ilanınızı güncelleyin."
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
        title="İlan Düzenle"
        desc="Araç bilgilerinizi düzenleyerek ilanınızı güncelleyin."
        onHandleBack={handleBack}
        onHandleNext={handleNext}
        activeStep={currentStepIndex}
        stepLabel={currentStep.label}
        allSteps={allSteps}
        onFinalSubmit={updateListing}
        isEditMode={true}
      />
    );
  }

  return (
    <Box className="bg-[#f7f7f7] w-[70%] pt-5 pb-15 my-5 mx-auto rounded-sm min-h-160 shadow-xs border-1 border-gray-100">
      <Box className="bg-white w-[70%] mx-auto py-5 px-10 rounded-md flex flex-col shadow-md ">
        <span className="mb-2 text-3xl">İlan Düzenle</span>
        <span className="text-sm text-gray-600">
          Araç bilgilerinizi düzenleyerek ilanınızı güncelleyin.
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