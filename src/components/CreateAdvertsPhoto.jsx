import { Box, Button, IconButton, Toolbar, Tooltip  } from '@mui/material'
import React, { useRef, useState, useEffect } from 'react'
import CustomizedSteppers from './CustomizedSteppers'
import { ReactSortable } from 'react-sortablejs';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import SnackbarAlert from './SnackbarAlert';
import { useSnackbar } from '../context/SnackbarContext';
import api from '../api/axios';

export default function CreateAdvertsPhoto({title, desc, allSteps, stepLabel, activeStep, onHandleNext, onHandleBack, onFinalSubmit, isEditMode = false}) {

  const navigate = useNavigate()
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();
  const { showSnackbar } = useSnackbar()

  // Edit modunda mevcut fotoğrafları yükle
  useEffect(() => {
    if (isEditMode) {
      const existingImages = localStorage.getItem("uploadedImages");
      if (existingImages) {
        try {
          const images = JSON.parse(existingImages);
          console.log("Mevcut fotoğraflar yükleniyor:", images);
          
          const existingFiles = images.map((imageItem, index) => {
            // API'den gelen image objesi mi yoksa string mi kontrol et
            let imageUrl, imageId;
            
            if (typeof imageItem === 'object' && imageItem.path) {
              // Image objesi formatı: {id: "...", path: "./uploads/..."}
              imageId = imageItem.id;
              // Relative path'i tam URL'e çevir
              const relativePath = imageItem.path;
              if (relativePath.startsWith('./uploads/')) {
                imageUrl = `https://carwisegw.yusuftalhaklc.com${relativePath.substring(1)}`;
              } else {
                imageUrl = relativePath;
              }
            } else {
              // String formatı (eski format)
              imageUrl = imageItem;
              imageId = imageItem;
            }
            
            return {
              file: null, // Dosya objesi yok, sadece URL var
              preview: imageUrl,
              id: crypto.randomUUID(),
              isExisting: true, // Mevcut fotoğraf olduğunu belirt
              originalUrl: imageUrl,
              imageId: imageId // API'den gelen image ID'si
            };
          });
          
          setFiles(existingFiles);
          console.log("Mevcut fotoğraflar başarıyla yüklendi:", existingFiles.length, "fotoğraf");
          console.log("Dönüştürülen URL'ler:", existingFiles.map(f => f.originalUrl));
        } catch (error) {
          console.error("Mevcut fotoğraflar yüklenirken hata:", error);
        }
      } else {
        console.log("localStorage'da mevcut fotoğraf bulunamadı");
      }
    }
  }, [isEditMode]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const newFiles = selectedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        id: crypto.randomUUID(),
        isExisting: false
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDelete = (index) => {
    const fileToDelete = files[index];
    console.log("Silinecek fotoğraf:", fileToDelete);
    
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
    
    // localStorage'ı güncelle (eğer mevcut fotoğraf silindiyse)
    if (fileToDelete.isExisting) {
      const existingImages = localStorage.getItem("uploadedImages");
      if (existingImages) {
        try {
          const images = JSON.parse(existingImages);
          // Image objesi mi string mi kontrol et
          const updatedImages = images.filter(img => {
            if (typeof img === 'object' && img.id) {
              // Image objesi formatı
              return img.id !== fileToDelete.imageId;
            } else {
              // String formatı
              return img !== fileToDelete.originalUrl;
            }
          });
          localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));
          console.log("localStorage'dan fotoğraf silindi:", fileToDelete.imageId || fileToDelete.originalUrl);
        } catch (error) {
          console.error("localStorage güncellenirken hata:", error);
        }
      }
    }
  };

  // İlan oluşturma/güncelleme API çağrısı
  const createAdvertisement = async () => {
    try {
      setLoading(true);
      console.log("=== İLAN " + (isEditMode ? "GÜNCELLEME" : "OLUŞTURMA") + " İSTEĞİ BAŞLADI ===");
      
      // localStorage'dan tüm seçimleri al
      const selectedBrand = JSON.parse(localStorage.getItem("selectedBrand") || "{}");
      const selectedSeries = JSON.parse(localStorage.getItem("selectedSeries") || "{}");
      const selectedModel = JSON.parse(localStorage.getItem("selectedModel") || "{}");
      const selectedYear = localStorage.getItem("selectedYear") || "";
      const selectedBodyType = localStorage.getItem("selectedBodyType") || "";
      const selectedFuelType = localStorage.getItem("selectedFuelType") || "";
      const selectedTransmission = localStorage.getItem("selectedTransmission") || "";
      const selectedColor = localStorage.getItem("selectedColor") || "";
      const selectedKm = localStorage.getItem("selectedKm") || "";
      const selectedMotorGucu = localStorage.getItem("selectedMotorGucu") || "";
      const selectedMotorHacmi = localStorage.getItem("selectedMotorHacmi") || "";
      const selectedDamage = JSON.parse(localStorage.getItem("selectedDamage") || "{}");
      const selectedPrice = localStorage.getItem("selectedPrice") || "";
      const selectedTitle = localStorage.getItem("selectedTitle") || "";
      const selectedDescription = localStorage.getItem("selectedDescription") || "";
      const selectedCity = localStorage.getItem("selectedCity") || "";
      const selectedDistrict = localStorage.getItem("selectedDistrict") || "";
      const selectedNeighborhood = localStorage.getItem("selectedNeighborhood") || "";

      console.log("LocalStorage'dan alınan veriler:");
      console.log("- Marka:", selectedBrand);
      console.log("- Seri:", selectedSeries);
      console.log("- Model:", selectedModel);
      console.log("- Yıl:", selectedYear);
      console.log("- Gövde Tipi:", selectedBodyType);
      console.log("- Yakıt Tipi:", selectedFuelType);
      console.log("- Vites Tipi:", selectedTransmission);
      console.log("- Renk:", selectedColor);
      console.log("- Kilometre:", selectedKm);
      console.log("- Motor Gücü:", selectedMotorGucu);
      console.log("- Motor Hacmi:", selectedMotorHacmi);
      console.log("- Hasar:", selectedDamage);
      console.log("- Fiyat:", selectedPrice);
      console.log("- Başlık:", selectedTitle);
      console.log("- Açıklama:", selectedDescription);
      console.log("- Şehir:", selectedCity);
      console.log("- İlçe:", selectedDistrict);
      console.log("- Mahalle:", selectedNeighborhood);
      console.log("- Fotoğraf sayısı:", files.length);

      // Hasar verilerini işle
      const chips = selectedDamage.chips || {};
      
      // Fotoğrafları işle
      console.log("=== FOTOĞRAF İŞLEME BAŞLADI ===");
      let uploadedImageUrls = [];
      
      // Mevcut fotoğrafları ve yeni yüklenen fotoğrafları ayır
      const existingImages = files.filter(f => f.isExisting).map(f => {
        // Mevcut fotoğraflar için imageId'yi kullan (API'ye gönderirken)
        return f.imageId;
      });
      const newFiles = files.filter(f => !f.isExisting);
      
      console.log("Mevcut fotoğraflar (ID'ler):", existingImages.length, existingImages);
      console.log("Yeni fotoğraflar:", newFiles.length);
      
      // Mevcut fotoğrafları hemen ekle
      uploadedImageUrls = [...existingImages];
      
      if (newFiles.length > 0) {
        try {
          const uploadPromises = newFiles.map(async (fileObj, index) => {
            try {
              const formData = new FormData();
              formData.append('file', fileObj.file);
              
              const token = localStorage.getItem("access_token");
              console.log(`Yeni fotoğraf ${index + 1} yükleniyor...`);
              console.log("Token:", token ? "Mevcut" : "Yok");
              
              const uploadResponse = await api.post("/upload", formData, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
                timeout: 30000, // 30 saniye timeout
              });
              
              console.log(`Yeni fotoğraf ${index + 1} yüklendi:`, uploadResponse.data);
              return uploadResponse.data.image?.id || uploadResponse.data.image || uploadResponse.data;
            } catch (error) {
              console.error(`Yeni fotoğraf ${index + 1} yüklenirken hata:`, error);
              throw error;
            }
          });
          
          const newUploadedImages = await Promise.all(uploadPromises);
          uploadedImageUrls = [...uploadedImageUrls, ...newUploadedImages];
          console.log("=== FOTOĞRAF YÜKLEME TAMAMLANDI ===");
          console.log("Tüm fotoğraf URL'leri:", uploadedImageUrls);
          
        } catch (uploadError) {
          console.warn("Upload endpoint başarısız, base64 yöntemine geçiliyor:", uploadError);
          
          // Fallback: Base64 yöntemi
          console.log("=== BASE64 YÖNTEMİNE GEÇİLİYOR ===");
          const imagePromises = newFiles.map(fileObj => {
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = () => {
                resolve(reader.result);
              };
              reader.readAsDataURL(fileObj.file);
            });
          });
          
          const newBase64Images = await Promise.all(imagePromises);
          uploadedImageUrls = [...uploadedImageUrls, ...newBase64Images];
          console.log("Base64 fotoğraflar hazırlandı");
        }
      } else {
        // Sadece mevcut fotoğraflar var
        console.log("Sadece mevcut fotoğraflar kullanılıyor:", uploadedImageUrls);
      }
      
      // Fotoğraf sayısını kontrol et
      if (uploadedImageUrls.length === 0) {
        console.warn("Hiç fotoğraf yok! En az bir fotoğraf gerekli olabilir.");
      }

      // API'ye gönderilecek veri objesi
      const listingData = {
        "brand_id": selectedBrand.id || "",
        "city": selectedCity,
        "currency": "TRY",
        "description": selectedDescription,
        "detail": {
          "body_type": selectedBodyType,
          "color": selectedColor,
          "drive_type": localStorage.getItem("selectedTractionType") || "Önden Çekiş",
          "engine_power": parseInt(selectedMotorGucu) || 0,
          "engine_volume": parseInt(selectedMotorHacmi) || 0,
          "front_bumper": chips["Ön Tampon"] || "Orjinal",
          "front_hood": chips["Motor kaputu"] || "Orjinal",
          "front_left_door": chips["Sol ön kapı"] || "Orjinal",
          "front_left_mudguard": chips["Sol ön çamurluk"] || "Orjinal",
          "front_right_door": chips["Sağ ön kapı"] || "Orjinal",
          "fuel_type": selectedFuelType,
          "heavy_damage": selectedDamage.tramer > 0,
          "kilometers": parseInt(selectedKm) || 0,
          "rear_bumper": chips["Arka Tampon"] || "Orjinal",
          "rear_left_door": chips["Sol arka kapı"] || "Orjinal",
          "rear_left_mudguard": chips["Sol arka çamurluk"] || "Orjinal",
          "rear_right_door": chips["Sağ arka kapı"] || "Orjinal",
          "roof": chips["Tavan"] || "Orjinal",
          "transmission_type": selectedTransmission,
          "year": parseInt(selectedYear) || 0
        },
        "district": selectedDistrict,
        "images": uploadedImageUrls,
        "model_id": selectedModel.id || "",
        "neighborhood": selectedNeighborhood,
        "price": parseInt(selectedPrice) || 0,
        "series_id": selectedSeries.id || "",
        "title": selectedTitle
      };

      console.log("=== API'YE GÖNDERİLECEK VERİ ===");
      console.log(JSON.stringify(listingData, null, 2));

      const token = localStorage.getItem("access_token");
      console.log("Token:", token ? "Mevcut" : "Yok");

      let response;
      if (isEditMode && onFinalSubmit) {
        // Edit modunda onFinalSubmit fonksiyonunu çağır
        try {
          response = await onFinalSubmit(listingData);
          console.log("onFinalSubmit response:", response);
        } catch (submitError) {
          console.error("onFinalSubmit hatası:", submitError);
          throw submitError; // Hatayı yukarı fırlat
        }
      } else {
        // Create modunda normal POST isteği
        response = await api.post("/listing/", listingData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }

      console.log("=== API YANITI ===");
      if (response) {
        console.log("Status:", response.status);
        console.log("Data:", response.data);
      } else {
        console.log("Response undefined - onFinalSubmit fonksiyonu response döndürmedi");
        // Response yoksa başarılı kabul et (onFinalSubmit zaten yönlendirme yapmış olabilir)
        if (isEditMode) {
          return; // Edit modunda response yoksa çık
        }
      }
      
      // İlan başarıyla oluşturulduktan sonra localStorage'ı temizle
      if (!isEditMode) {
        clearListingDataFromLocalStorage();
      }
      
      // Başarılı olduğunda yönlendir
      if (isEditMode) {
        showSnackbar("İlanınız başarıyla güncellendi.", "success");
        // Edit modunda onFinalSubmit zaten yönlendirme yapacak
      } else {
        showSnackbar("İlanınız başarıyla oluşturuldu.", "success");
        navigate("/");
      }
      
    } catch (error) {
      console.error("=== İLAN " + (isEditMode ? "GÜNCELLEME" : "OLUŞTURMA") + " HATASI ===");
      console.error("Error:", error);
      console.error("Error Message:", error.message);
      console.error("Error Response:", error.response?.data);
      console.error("Error Status:", error.response?.status);
      
      if (error.response?.status === 401) {
        showSnackbar("Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.", "error");
      } else if (error.response?.status === 400) {
        showSnackbar("Gönderilen veriler hatalı. Lütfen tüm alanları doldurun.", "error");
      } else if (error.message.includes('CORS') || error.code === 'ERR_NETWORK') {
        showSnackbar("Fotoğraf yükleme sırasında bağlantı hatası oluştu. Lütfen tekrar deneyin.", "error");
      } else if (error.message.includes('timeout')) {
        showSnackbar("Fotoğraf yükleme zaman aşımına uğradı. Lütfen tekrar deneyin.", "error");
      } else {
        showSnackbar("İlan " + (isEditMode ? "güncellenirken" : "oluşturulurken") + " bir hata oluştu. Lütfen tekrar deneyin.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  // localStorage'dan ilan verilerini temizle
  const clearListingDataFromLocalStorage = () => {
    console.log("=== LOCALSTORAGE TEMİZLENİYOR ===");
    
    const keysToRemove = [
      "selectedBrand",
      "selectedSeries", 
      "selectedModel",
      "selectedYear",
      "selectedBodyType",
      "selectedFuelType",
      "selectedTransmission",
      "selectedColor",
      "selectedKm",
      "selectedMotorGucu",
      "selectedMotorHacmi",
      "selectedDamage",
      "selectedPrice",
      "selectedTitle",
      "selectedDescription",
      "selectedCity",
      "selectedDistrict",
      "selectedNeighborhood",
      "selectedTractionType"
    ];

    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
      console.log(`✅ ${key} temizlendi`);
    });

    console.log("=== LOCALSTORAGE TEMİZLİĞİ TAMAMLANDI ===");
  };

  const handleSucces = () => {
    createAdvertisement();
  }

  return (
   <Box className='bg-[#f7f7f7] w-[70%] pt-5 pb-15 my-5 mx-auto rounded-sm min-h-160'>
            <Box className="bg-white w-[70%] mx-auto py-5 px-10 rounded-md flex flex-col shadow-xs border-1 border-gray-100">
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
              <Box className="bg-white rounded-md shadow-xs">
                <Box className="px-2 py-2">
                  <span className='text-lg'>{stepLabel}</span>
                </Box>  
              </Box>
              <Box >
                    <Box
                        onClick={() => fileInputRef.current.click()}
                        className="p-4 text-center rounded-lg border border-gray-400 border-dashed cursor-pointer hover:bg-gray-100"
                    >
                        <p className="text-sm text-gray-600">
                          {isEditMode && files.length > 0 
                            ? "Yeni fotoğraflar eklemek için tıklayın veya sürükleyin" 
                            : "Fotoğraflarınızı yüklemek için tıklayın veya sürükleyin"
                          }
                        </p>
                        {isEditMode && files.length > 0 && (
                          <p className="text-xs text-gray-500 mt-1">
                            Mevcut {files.length} fotoğraf görüntüleniyor. Yeni fotoğraflar ekleyebilir veya mevcut fotoğrafları silebilirsiniz.
                          </p>
                        )}
                        <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        multiple
                        className="hidden"
                        />
                    </Box>
                    {files.length > 0 && (
                        
                     <ReactSortable
                        list={files}
                        setList={setFiles}
                        className="grid grid-cols-2 gap-4 p-5 mt-5 bg-white rounded-md border-gray-100 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 shadow-sx border-1"
                    >
                        {files.map((fileObj, index) => (
                        <Box
                            key={fileObj.id}
                            className="overflow-hidden relative w-full bg-gray-50 rounded-xl shadow-md transition-transform duration-200 aspect-square group hover:scale-105"
                        >
                            <img
                            src={fileObj.preview}
                            alt={`Fotoğraf ${index + 1}`}
                            className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-110"
                            />
                            {index === 0 && (
                            <span className="absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white bg-gradient-to-r from-[#dc143c] to-pink-500 rounded shadow-lg z-10">
                                Kapak
                            </span>
                            )}
                            <Tooltip title="Fotoğrafı sil" arrow placement="right">
                                <IconButton
                                onClick={() => handleDelete(index)}
                                className="!absolute top-2 right-2 bg-white/80 hover:bg-[#dc143c] hover:text-white text-[#dc143c] shadow transition-all z-20"
                                size="small"
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        ))}
                    </ReactSortable>
                    )}
              </Box>
              <Box className="flex justify-end">
                    <Button 
                      className='w-[20%]' 
                      color='error' 
                      onClick={handleSucces}
                      disabled={loading}
                    >
                        {loading ? (isEditMode ? 'İlan Güncelleniyor...' : 'İlan Oluşturuluyor...') : (isEditMode ? 'İlanı Güncelle' : 'İlan Oluştur')}
                    </Button>
              </Box>
            </Box>
          </Box>
  )
}
