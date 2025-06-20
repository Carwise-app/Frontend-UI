import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Tab, Tabs, Avatar, Button, Typography, Paper, IconButton, Tooltip, TextField, Dialog, DialogContent, Fade } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, Phone, Chat, Map, InfoOutlined, Search, Favorite, FavoriteBorder, Close, ZoomIn } from '@mui/icons-material';
import axios from 'axios';
import SafeShoppingDialog from '../components/SafeShoppingDialog';
import api from '../api/axios';
import PricePredictionDialog from '../components/PricePredictionDialog';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ImagePredictionDialog from '../components/ImagePredictionDialog';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const TABS = [
  { label: 'Açıklama', value: 'description' },
  { label: 'Hasar Durumu', value: 'damage' },
  { label: 'Teknik Bilgileri', value: 'technical' },
  { label: 'Donanım', value: 'equipment' },
];

const mainRed = '#dc143c';
const IMAGE_BASE = 'https://carwisegw.yusuftalhaklc.com/';

export default function ProductDetailsPage({ onOpenClick }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('description');
  const [error, setError] = useState(null);
  const [mainImgIdx, setMainImgIdx] = useState(0);
  const [plate, setPlate] = useState('');
  const [openSafeShopping, setOpenSafeShopping] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [openPrediction, setOpenPrediction] = useState(false);
  const [predictionLoading, setPredictionLoading] = useState(false);
  const [predictionData, setPredictionData] = useState(null);
  const [imagePredictions, setImagePredictions] = useState({});
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [predictionDialogOpen, setPredictionDialogOpen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleOpenSafeShopping = () => setOpenSafeShopping(true);
  const handleCloseSafeShopping = () => setOpenSafeShopping(false);

  const handleFavoriteToggle = async () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      // Kullanıcı giriş yapmamış, login popup'ı aç
      onOpenClick('login', 'notLogin');
      return;
    }

    setFavoriteLoading(true);
    try {
      if (isFavorite) {
        // Favorilerden çıkar
        await api.delete(`/favorite/${data.id}`);
        setIsFavorite(false);
      } else {
        // Favorilere ekle
        await api.post(`/favorite/${data.id}`);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Favori işlemi başarısız:', error);
      // Hata durumunda kullanıcıya bilgi ver
      alert(isFavorite ? 'Favorilerden çıkarılamadı!' : 'Favorilere eklenemedi!');
    } finally {
      setFavoriteLoading(false);
    }
  };

  const handleMessageClick = () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      // Kullanıcı giriş yapmamış, login popup'ı aç
      onOpenClick('login', 'notLogin');
      return;
    }
    
    // Kullanıcı giriş yapmış, chat sayfasına yönlendir
    if (!data?.created_by?.id) {
      console.error("Satıcı bilgileri bulunamadı");
      return;
    }
    
    // Kendi ilanına mesaj göndermeye çalışıyorsa engelle
    try {
      const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
      const currentUserId = tokenPayload.user_id || tokenPayload.sub || tokenPayload.id;
      
      if (currentUserId === data.created_by.id) {
        alert("Kendi ilanınıza mesaj gönderemezsiniz!");
        return;
      }
    } catch (e) {
      console.error("Token parse hatası:", e);
    }
    
    // Chat sayfasına yönlendir
    navigate(`/sohbet/${data.created_by.id}?listing_id=${data.id}`);
  };

  const handlePredictPrice = async () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      // Kullanıcı giriş yapmamış, login popup'ı aç
      onOpenClick('login', 'notLogin');
      return;
    }

    setPredictionLoading(true);
    setOpenPrediction(true);
    
    try {
      // Hasar bilgilerini hesapla
      const damageInfo = {
        boyali: damageParts.filter(part => part.value === 'Boyalı').length,
        degisen: damageParts.filter(part => part.value === 'Değişen').length,
        orjinal: damageParts.filter(part => part.value === 'Orjinal').length,
      };
      
      const requestData = {
        "Boyalı_sayısı": damageInfo.boyali || 0,
        "Değişen_sayısı": damageInfo.degisen || 0,
        "Kasa_Tipi": technical.body_type || "",
        "Kilometre": technical.kilometers || 0,
        "Marka": data.brand?.name || "",
        "Model": data.model?.name || "",
        "Motor_Gücü": parseInt(technical.engine_power) || 0,
        "Motor_Hacmi": parseFloat(technical.engine_volume) || 0,
        "Orjinal_sayısı": damageInfo.orjinal || 0,
        "Renk": technical.color || "",
        "Seri": data.series?.name || "",
        "Tramer": 0, // Varsayılan değer
        "Vites_Tipi": technical.transmission_type || "",
        "Yakıt_Tipi": technical.fuel_type || "",
        "Yıl": technical.year || 0
      };

      const response = await api.post('/predict/', requestData);
      setPredictionData(response.data);
    } catch (error) {
      console.error('Tahmin hatası:', error);
    } finally {
      setPredictionLoading(false);
    }
  };

  // Fetch predictions for all images
  useEffect(() => {
    if (!data || !Array.isArray(data.images)) return;
    const fetchPredictions = async () => {
      const results = {};
      await Promise.all(
        data.images.map(async (img) => {
          try {
            const imgId = img.id || img.path?.split('/')?.pop()?.split('.')?.[0];
            if (!imgId) return;
            const res = await api.get(`/upload/${imgId}/predict`);
            results[imgId] = res.data;
          } catch (e) {
            console.error('Prediction fetch error for image:', e);
            const imgId = img.id || img.path?.split('/')?.pop()?.split('.')?.[0];
            if (imgId) {
              results[imgId] = { prediction: false, confidence: 0, image: { id: imgId } };
            }
          }
        })
      );
      setImagePredictions(results);
    };
    fetchPredictions();
  }, [data]);

  useEffect(() => {
    setLoading(true);
    const accessToken = localStorage.getItem('access_token');
    const config = accessToken ? {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    } : {};
    
    axios.get(`https://carwisegw.yusuftalhaklc.com/listing/${id}`, config)
      .then(res => {
        setData(res.data);
        setIsFavorite(res.data.is_favorite || false);
        setLoading(false);
        setMainImgIdx(0);
      })
      .catch(err => {
        setError('İlan bulunamadı veya bir hata oluştu.');
        setLoading(false);
      });
  }, [id]);

  // Keyboard navigation for fullscreen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (fullscreenImage !== null) {
        if (e.key === 'Escape') {
          handleCloseFullscreen();
        } else if (e.key === 'ArrowLeft') {
          handleFullscreenPrev(e);
        } else if (e.key === 'ArrowRight') {
          handleFullscreenNext(e);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenImage]);

  if (loading) return <Box className="flex justify-center items-center h-[60vh]"><CircularProgress color="error" /></Box>;
  if (error) return <Box className="mt-10 text-center text-red-600">{error}</Box>;
  if (!data) return null;

  // Breadcrumb
  const brand = data.brand?.name || '-';
  const series = data.series?.name || '-';
  const model = data.model?.name || '-';

  // Galeri
  const gallery = Array.isArray(data.images) && data.images.length > 0
    ? data.images.map(img => IMAGE_BASE + img.path.replace(/^\.?\/?/, ''))
    : [];

  // Satıcı
  const seller = data.created_by || {};
  const sellerName = seller.first_name ? seller.first_name + (seller.last_name ? ' ' + seller.last_name[0] + '.' : '') : 'Satıcı';
  // Telefonu 0 (5xx) xxx xx xx formatında göster
  let sellerPhone = '';
  if (seller.phone_number && seller.phone_number.length === 10) {
    // Eğer başında 0 yoksa ekle
    const num = seller.phone_number;
    const countryCode = seller.country_code || '+90';
    sellerPhone = `${countryCode} (${num.slice(0,3)}) ${num.slice(3,6)} ${num.slice(6,8)} ${num.slice(8,10)}`;
  } else if (seller.phone_number && seller.phone_number.length === 11 && seller.phone_number.startsWith('0')) {
    const num = seller.phone_number.slice(1);
    const countryCode = seller.country_code || '+90';
    sellerPhone = `${countryCode} (${num.slice(0,3)}) ${num.slice(3,6)} ${num.slice(6,8)} ${num.slice(8,10)}`;
  } else if (seller.country_code && seller.phone_number) {
    sellerPhone = `${seller.country_code} ${seller.phone_number}`;
  }

  // Konum
  const location = [data.city, data.district, data.neighborhood].filter(Boolean).join(', ');

  // Fiyat
  const price = data.price ? data.price.toLocaleString('tr-TR') : '-';
  const currency = data.currency || 'TL';

  // Info
  const info = [
    { label: 'Fiyat', value: (
      <Typography component="span" className="text-xl font-bold text-[#dc143c]">
        {price} {currency}
      </Typography>
    ) },
    { label: 'Marka', value: brand },
    { label: 'Seri', value: series },
    { label: 'Model', value: model },
    { label: 'Kilometre', value: data.detail?.kilometers?.toLocaleString('tr-TR') + ' km' || '-' },
    { label: 'Vites Tipi', value: data.detail?.transmission_type || '-' },
    { label: 'Yakıt Tipi', value: data.detail?.fuel_type || '-' },
    { label: 'Kasa Tipi', value: data.detail?.body_type || '-' },
    { label: 'Renk', value: data.detail?.color || '-' },
    { label: 'Motor Hacmi', value: data.detail?.engine_volume ? data.detail.engine_volume + ' cc' : '-' },
    { label: 'Motor Gücü', value: data.detail?.engine_power ? data.detail.engine_power + ' hp' : '-' },
    { label: 'Çekiş', value: data.detail?.drive_type || '-' },
    { label: 'Araç Durumu', value: data.status === 1 ? 'İkinci El' : 'Sıfır' }, 
  ];

  // Açıklama (HTML)
  const description = data.description || '';

  // Teknik Bilgiler
  const technical = data.detail || {};

  // Hasar Durumu (örnek: tüm parça alanlarını listele)
  const damageParts = Object.entries(technical)
    .filter(([key]) => [
      'front_bumper','front_hood','roof','front_right_door','rear_right_door','front_left_mudguard','front_left_door','rear_left_door','rear_left_mudguard','rear_bumper'
    ].includes(key))
    .map(([key, value]) => ({
      label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      value: value
    }));

  // Donanım (örnek: sabit veya API'den gelirse ekle)
  const equipment = [
    'ABS',
    'Klima',
    'Hız Sabitleyici',
    'Yokuş Kalkış Desteği',
    'Park Sensörü',
  ];

  // Galeri okları ve ana görsel değişimi
  const handlePrev = () => setMainImgIdx(idx => (idx === 0 ? gallery.length - 1 : idx - 1));
  const handleNext = () => setMainImgIdx(idx => (idx === gallery.length - 1 ? 0 : idx + 1));
  const handleThumbClick = idx => setMainImgIdx(idx);

  const handlePhoneClick = () => {
    if (sellerPhone) {
      // Telefonla arama yap
      const cleanPhone = sellerPhone.replace(/\s/g, '').replace(/[()]/g, '');
      window.open(`tel:${cleanPhone}`);
    }
  };

  // Full-screen handlers
  const handleOpenFullscreen = (index) => {
    setFullscreenImage(index);
  };

  const handleCloseFullscreen = () => {
    setFullscreenImage(null);
  };

  const handleFullscreenNext = (e) => {
    e.stopPropagation();
    setFullscreenImage((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  const handleFullscreenPrev = (e) => {
    e.stopPropagation();
    setFullscreenImage((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  // Image loading handler
  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  return (
    <Box className="bg-[#f7f7f7] min-h-screen flex flex-col items-center py-6 px-2 md:px-0">
      
      
      {/* Ana Grid */}
      <Box className="flex flex-col w-full max-w-5xl gap-4 md:flex-row">
        {/* Sol ana panel */}
        <Box className="flex flex-col flex-1 gap-4">
          {/* Başlık ve konum */}
          <Box className="flex flex-col gap-2 p-4 bg-white shadow rounded-2xl">
            <Typography variant="h6" className="font-bold text-black line-clamp-2 max-w-[90vw] md:max-w-[60vw]">{data.title || model}</Typography>
            <Box className="flex items-center gap-2 text-sm text-[#222] font-medium">
              <Map sx={{ fontSize: 18, color: mainRed }} />
              <span>{location}</span>
            </Box>
          </Box>

          {/* Galeri */}
          <Box className="flex flex-col items-center gap-2 p-4 bg-white shadow rounded-2xl">
            {/* Main Image Section */}
            <Box className="flex flex-col items-center gap-2 p-4 bg-white shadow rounded-2xl">
              <div 
                className="relative w-full aspect-[4/3] bg-gray-100 mb-4 overflow-hidden rounded-lg group cursor-zoom-in"
                onClick={() => handleOpenFullscreen(mainImgIdx)}
              >
                {isImageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CircularProgress color="error" />
                  </div>
                )}
                <img
                  src={`${gallery[mainImgIdx]}?quality=80&w=800`}
                  srcSet={`${gallery[mainImgIdx]}?quality=80&w=800 1x, ${gallery[mainImgIdx]}?quality=80&w=1200 2x`}
                  alt={`${brand} ${series} ${model}`}
                  className="w-full h-full object-contain transition-opacity duration-300"
                  style={{ opacity: isImageLoading ? 0 : 1 }}
                  onLoad={handleImageLoad}
                  loading="lazy"
                />
                
                {/* Navigation buttons - Main Image */}
                <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                  <IconButton
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/50 hover:bg-black/70 text-white pointer-events-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    size="large"
                  >
                    <ArrowBackIos />
                  </IconButton>
                  <IconButton
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/50 hover:bg-black/70 text-white pointer-events-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    size="large"
                  >
                    <ArrowForwardIos />
                  </IconButton>
                </div>

                {/* Image counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {mainImgIdx + 1} / {gallery.length}
                </div>

                {/* AI Detection Status */}
                {(() => {
                  const currentImg = data.images[mainImgIdx];
                  const imgId = currentImg?.id || currentImg?.path?.split('/')?.pop()?.split('.')?.[0];
                  const predictionResponse = imagePredictions[imgId];
                  
                  if (!predictionResponse) return null;
                  
                  // Get the actual prediction data from the nested structure
                  const prediction = predictionResponse.prediction || predictionResponse;
                  const isPredictionSuccess = prediction.prediction === true;
                  
                  return (
                    <div className="absolute bottom-4 left-4 bg-white/90 p-2 rounded-lg shadow-md pointer-events-auto">
                      {isPredictionSuccess ? (
                        <Tooltip title="Araç tespit edildi">
                          <CheckCircleIcon
                            className="text-green-500 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPrediction(predictionResponse);
                              setPredictionDialogOpen(true);
                            }}
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Araç tespit edilemedi">
                          <ErrorIcon 
                            className="text-red-500 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPrediction(predictionResponse);
                              setPredictionDialogOpen(true);
                            }}
                          />
                        </Tooltip>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-4">
                {gallery.map((img, idx) => (
                  <div
                    key={idx}
                    className={`relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105 ${
                      idx === mainImgIdx ? 'ring-2 ring-red-600' : ''
                    }`}
                    onClick={() => {
                      setMainImgIdx(idx);
                      setIsImageLoading(true);
                    }}
                  >
                    <img
                      src={`${img}?quality=60&w=150`}
                      alt={`${brand} ${series} ${model} - ${idx + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </Box>
          </Box>

          {/* Sekmeli alanlar */}
          <Box className="p-4 mt-2 bg-white shadow rounded-2xl">
            <Tabs value={tab} onChange={(_, v) => setTab(v)} indicatorColor="error" textColor="inherit" className="h-8 min-h-0 bg-gray-100 rounded-t">
              {TABS.map(t => <Tab key={t.value} label={t.label} value={t.value} sx={{ minHeight: 0, height: 32, fontSize: 13 }}/>) }
            </Tabs>
            <Box className="bg-white rounded-b-xl p-4 min-h-[120px] border border-gray-100">
              {tab === 'description' && (
                <Box>
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                </Box>
              )}
              {tab === 'damage' && (
                <Box>
                  <Typography className="mb-1 text-sm font-semibold">Hasar Durumu</Typography>
                  <ul className="pl-3 text-xs text-gray-700 list-disc">
                    {damageParts.map((part, i) => (
                      <li key={i}>{part.label}: {part.value}</li>
                    ))}
                  </ul>
                </Box>
              )}
              {tab === 'technical' && (
                <Box>
                  <Typography className="mb-1 text-sm font-semibold">Teknik Bilgiler</Typography>
                  <ul className="pl-3 text-xs text-gray-700 list-disc">
                    <li>Motor Gücü: {technical.engine_power} HP</li>
                    <li>Motor Hacmi: {technical.engine_volume} cm3</li>
                    <li>Çekiş: {technical.drive_type}</li>
                    <li>Vites: {technical.transmission_type}</li>
                    <li>Yakıt: {technical.fuel_type}</li>
                    <li>KM: {technical.kilometers?.toLocaleString('tr-TR')}</li>
                    <li>Yıl: {technical.year}</li>
                    <li>Renk: {technical.color}</li>
                  </ul>
                </Box>
              )}
              {tab === 'equipment' && (
                <Box>
                  <Typography className="mb-1 text-sm font-semibold">Donanım</Typography>
                  <ul className="pl-3 text-xs text-gray-700 list-disc">
                    {equipment.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        {/* Sağ panel */}
        <Box className="w-full md:w-[340px] flex flex-col gap-4">
          {/* Satıcı Kartı */}


          {/* Favori Butonu */}
          <Box className="flex flex-col gap-2 p-4 bg-white border border-gray-100 shadow rounded-2xl">
            <Button
              onClick={handlePredictPrice}
              startIcon={<span className="text-xl">✨</span>}
              variant="outlined"
              color="error"
              fullWidth
              sx={{ borderRadius: '8px', marginBottom: 1 }}
            >
              AI Fiyat Tahmini
            </Button>

            <Button
              variant={isFavorite ? "contained" : "outlined"}
              color="error"
              size="large"
              fullWidth
              startIcon={isFavorite ? <Favorite /> : <FavoriteBorder />}
              onClick={handleFavoriteToggle}
              disabled={favoriteLoading}
              className={isFavorite ? "bg-[#dc143c] hover:bg-[#b01030]" : "border-[#dc143c] text-[#dc143c] hover:bg-[#dc143c] hover:text-white"}
            >
              {favoriteLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : isFavorite ? (
                "Favorilerden Çıkar"
              ) : (
                "Favorilere Ekle"
              )}
            </Button>
          </Box>

          {/* Bilgi kutusu */}
          <Box className="bg-white rounded-2xl shadow p-4 flex flex-col gap-1 border border-gray-100">
            {info.map((item, i) => (
              <Box key={i} className="flex items-center justify-between py-1 text-sm border-b border-gray-100 last:border-b-0">
                <span className="font-medium text-gray-600">{item.label}</span>
                <span className="font-semibold text-gray-900">{item.value}</span>
              </Box>
            ))}
          </Box>
          <Box className="flex flex-col items-center gap-2 p-4 bg-white border border-gray-100 shadow rounded-2xl">
            <Avatar sx={{ width: 56, height: 56 }}>{seller.first_name ? seller.first_name[0] : 'S'}</Avatar>
            <Typography className="mt-1 text-base font-semibold">{sellerName}</Typography>  
            <Button variant="outlined" color="error" size="small" fullWidth startIcon={<Phone />} onClick={handlePhoneClick}>{sellerPhone}</Button>
            <Button variant="contained" color="error" size="small" fullWidth startIcon={<Chat />} onClick={handleMessageClick}>Mesaj Gönder</Button>
          </Box>

          {/* Güvenlik kutusu */}
          <Box className="flex flex-col gap-2 p-4 bg-white border border-gray-100 shadow rounded-2xl">
            <Box className="flex items-center gap-2">
              <InfoOutlined color="info" fontSize="small" />
              <Typography className="text-xs text-gray-700">Güvenliğiniz için kapora göndermeyin ya da benzeri hiçbir ön ödeme yapmayın.</Typography>
            </Box>
            <Button onClick={handleOpenSafeShopping} variant="text" color="primary" size="small" className="self-end px-0">Detaylı bilgi</Button>
          </Box>          
        </Box>
        <SafeShoppingDialog 
                open={openSafeShopping}
                onClose={handleCloseSafeShopping}
            />
        <PricePredictionDialog
          open={openPrediction}
          onClose={() => setOpenPrediction(false)}
          loading={predictionLoading}
          predictionData={predictionData}
        />
        <ImagePredictionDialog open={predictionDialogOpen} onClose={() => setPredictionDialogOpen(false)} prediction={selectedPrediction} />
      </Box>

      {/* Fullscreen Dialog */}
      <Dialog
        fullScreen
        open={fullscreenImage !== null}
        onClose={handleCloseFullscreen}
        TransitionComponent={Fade}
        PaperProps={{
          style: { backgroundColor: 'rgba(0, 0, 0, 0.95)' }
        }}
      >
        <DialogContent className="relative p-0 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            {fullscreenImage !== null && (
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Close button */}
                <IconButton
                  className="!absolute !right-6 !top-6 !z-50"
                  onClick={handleCloseFullscreen}
                  sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    border: '2px solid rgba(255, 255, 255, 0.5)',
                    width: '48px',
                    height: '48px',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.9)',
                      border: '2px solid rgba(255, 255, 255, 0.8)',
                    },
                    '& .MuiSvgIcon-root': {
                      color: 'white',
                      fontSize: '32px'
                    }
                  }}
                >
                  <Close />
                </IconButton>
                
                {/* Previous button */}
                <IconButton
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white"
                  onClick={handleFullscreenPrev}
                  size="large"
                >
                  <ArrowBackIos />
                </IconButton>

                {/* Main Image Container */}
                <div className="w-[1200px] h-[800px] flex items-center justify-center">
                  <img
                    src={`${gallery[fullscreenImage]}?quality=100&w=1920`}
                    alt={`${brand} ${series} ${model} - Full Screen`}
                    className="w-full h-full object-contain transition-opacity duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Next button */}
                <IconButton
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white"
                  onClick={handleFullscreenNext}
                  size="large"
                >
                  <ArrowForwardIos />
                </IconButton>

                {/* Image counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
                  {fullscreenImage + 1} / {gallery.length}
                </div>

                {/* Thumbnail strip */}
                <div className="absolute bottom-16 left-0 right-0 flex justify-center">
                  <div className="flex gap-2 px-4 py-2 bg-black/50 rounded-lg overflow-x-auto max-w-[90vw]">
                    {gallery.map((img, idx) => (
                      <div
                        key={idx}
                        className={`relative w-16 h-16 flex-shrink-0 rounded cursor-pointer transition-all duration-200 ${
                          idx === fullscreenImage 
                            ? 'ring-2 ring-white scale-110' 
                            : 'opacity-50 hover:opacity-100'
                        }`}
                        onClick={() => setFullscreenImage(idx)}
                      >
                        <img
                          src={`${img}?quality=60&w=100`}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover rounded"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
