import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Tab, Tabs, Avatar, Button, Typography, Paper, IconButton, Tooltip, TextField } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, Phone, Chat, Map, InfoOutlined, Search } from '@mui/icons-material';
import axios from 'axios';
import SafeShoppingDialog from '../components/SafeShoppingDialog';

const TABS = [
  { label: 'Açıklama', value: 'description' },
  { label: 'Hasar Durumu', value: 'damage' },
  { label: 'Teknik Bilgileri', value: 'technical' },
  { label: 'Donanım', value: 'equipment' },
];

const mainRed = '#dc143c';
const IMAGE_BASE = 'https://carwisegw.yusuftalhaklc.com/';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('description');
  const [error, setError] = useState(null);
  const [mainImgIdx, setMainImgIdx] = useState(0);
  const [plate, setPlate] = useState('');
  const [openSafeShopping, setOpenSafeShopping] = useState(false);

  const handleOpenSafeShopping = () => setOpenSafeShopping(true);
  const handleCloseSafeShopping = () => setOpenSafeShopping(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`https://carwisegw.yusuftalhaklc.com/listing/${id}`)
      .then(res => {
        setData(res.data);
        setLoading(false);
        setMainImgIdx(0);
      })
      .catch(err => {
        setError('İlan bulunamadı veya bir hata oluştu.');
        setLoading(false);
      });
  }, [id]);

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
            <Box className="relative flex items-center justify-center w-full">
              <IconButton onClick={handlePrev} className="!absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white" size="small"><ArrowBackIos fontSize="small" /></IconButton>
              <img src={gallery[mainImgIdx]} alt="Araba" className="object-contain w-full max-h-[340px] rounded-xl" style={{maxWidth: 480}} />
              <IconButton onClick={handleNext} className="!absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white" size="small"><ArrowForwardIos fontSize="small" /></IconButton>
              <Box className="absolute bottom-2 right-2 bg-black/60 text-white text-xs rounded px-2 py-0.5">{gallery.length ? `${mainImgIdx+1}/${gallery.length}` : ''}</Box>
            </Box>
            <Box className="flex justify-center w-full gap-1 mt-2 overflow-x-auto">
              {gallery.map((img, i) => (
                <Box key={i} onClick={() => handleThumbClick(i)} className={`border-2 ${mainImgIdx===i ? 'border-[#dc143c]' : 'border-transparent'} rounded cursor-pointer transition-all`} style={{minWidth: 56, minHeight: 40, maxWidth: 56, maxHeight: 40, overflow: 'hidden'}}>
                  <img src={img} alt="thumb" className="object-cover w-full h-full" />
                </Box>
              ))}
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
          <Box className="flex flex-col items-center gap-2 p-4 bg-white border border-gray-100 shadow rounded-2xl">
            <Avatar sx={{ width: 56, height: 56 }}>{seller.first_name ? seller.first_name[0] : 'S'}</Avatar>
            <Typography className="mt-1 text-base font-semibold">{sellerName}</Typography>  
            <Button variant="outlined" color="error" size="small" fullWidth startIcon={<Phone />} onClick={handlePhoneClick}>{sellerPhone}</Button>
            <Button variant="contained" color="error" size="small" fullWidth startIcon={<Chat />}>Mesaj Gönder</Button>
          </Box>

          {/* Fiyat kutusu */}
          <Box className="flex flex-col gap-2 p-4 bg-white border border-gray-100 shadow rounded-2xl">
            <Typography className="text-right text-[#dc143c] !font-bold text-2xl">{price} <span className="text-base font-bold">{currency}</span></Typography>
          </Box>

          {/* Bilgi kutusu */}
          <Box className="bg-white rounded-2xl shadow p-4 flex flex-col gap-1 border border-gray-100 max-h-[340px] overflow-y-auto">
            {info.map((item, i) => (
              <Box key={i} className="flex items-center justify-between py-1 text-sm border-b border-gray-100 last:border-b-0">
                <span className="font-medium text-gray-600">{item.label}</span>
                <span className="font-semibold text-gray-900">{item.value}</span>
              </Box>
            ))}
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
      </Box>
    </Box>
  );
}
