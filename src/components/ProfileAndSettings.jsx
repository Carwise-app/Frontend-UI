import React, { useEffect, useState } from 'react';
import ControlPanelHeader from './ControlPanelHeader';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import api from '../api/axios';
import { useSnackbar } from '../context/SnackbarContext';

export default function ProfileAndSettings({ onOpenClick }) {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("access_token");
  const { showSnackbar } = useSnackbar();

  const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('tr-TR');
};


  const goToNewTab = (path) => {
    window.open(path, "_blank");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/profile/", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error("Profil verisi alınamadı:", error.response?.data || error.message);
      }
    };
    fetchUser();
  }, []);

  const handlePasswordReset = async () => {
    if (!user?.email) {
      showSnackbar("E-posta adresiniz bulunamadı.", "error");
      return;
    }
    try {
      await api.post("/auth/reset-password", { email: user.email });
      showSnackbar("Şifre sıfırlama maili gönderildi.", "success");
    } catch (error) {
      showSnackbar("Şifre sıfırlama maili gönderilemedi.", "error");
    }
  };

  return (
    <Box className="flex flex-col gap-y-4">
      <ControlPanelHeader
        icon={<SettingsIcon sx={{ fontSize: 115, color: 'black', opacity: 0.1, marginRight: 1 }} />}
        title="Profil & Ayarlar"
        description="Burada profilinizle alakalı düzenlemeler ve ayarlamalar yapabilirsiniz."
      />

      <Box className="grid w-full bg-white shadow-md rounded-md grid-cols-[1fr_7fr] h-21 max-h-21 border-1 border-gray-100 ">
        <Box className="flex items-center justify-center">
          <Box className="flex bg-[#ffcd37] rounded-full p-5 text-xl font-bold">
            <span>{user?.first_name?.[0] || 'A'}</span>
            <span>{user?.last_name?.[0] || 'B'}</span>
          </Box>
        </Box>
        <Box className="flex items-center text-2xl font-medium tracking-wide">
          <span>{user ? `${user.first_name} ${user.last_name}` : "Yükleniyor..."}</span>
        </Box>
      </Box>

      <Box className="flex w-full h-12 bg-white border-gray-100 rounded-md shadow-md border-1 max-h-12">
        <Box className="flex items-center justify-between w-[95%] mx-auto">
          <Box className="flex gap-x-1">
             <span>Üyelik Tarihi:</span>
              <span className='font-medium'>
                {user ? formatDate(user.created_at) : "Yükleniyor..."}
             </span>
          </Box>
          <Box>
            <Button variant='outlined' color='error' sx={{ textTransform: 'none', fontSize: 15 }}>
              Hesabımı Sil
            </Button>
          </Box>
        </Box>
      </Box>

      <Box className="flex flex-col w-full px-5 py-5 bg-white border-gray-100 rounded-md shadow-md border-1 gap-y-4">
        <span className='text-2xl font-medium '>İletişim Bilgileri</span>
        <Box className="flex flex-col gap-y-4">

          {/* Telefon */}
          <Box className="flex flex-col gap-y-4">
            <Box className="flex flex-col">
              <span className='text-lg'>Cep Telefonu</span>
              <span className='text-sm font-light text-gray-500'>
                *İletişim bilgileriniz kullanıcıların size ulaşması için yayınladığını ilanlarda gözükmektedir.
              </span>
            </Box>
            <Box className="grid grid-cols-[1fr_15fr_2fr] rounded-md w-[85%] h-10">
              <Box className="flex items-center justify-center bg-gray-700 rounded-l-md">
                <PhoneIcon sx={{ fontWeight: 25, color: 'white', fontSize: 25 }} />
              </Box>
              <Box className="flex items-center bg-gray-200">
                <span className='px-4 text-lg font-medium tracking-wide'>
                  {user ? `(${user.phone_number.slice(0,3)}) ${user.phone_number.slice(3,6)} ${user.phone_number.slice(6)}` : "Yükleniyor..."}
                </span>
              </Box>
              <Box className="flex items-center justify-center bg-gray-200 rounded-r-md">
                <Tooltip arrow title="Telefon numaranı değiştir" placement="right">
                  <IconButton onClick={() => onOpenClick("changePhoneNumber", "notLogin")}>
                    <EditIcon sx={{ fontWeight: 25, color: 'gray', fontSize: 25 }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>

          {/* E-Mail */}
          <Box className="flex flex-col gap-y-4">
            <span className='text-lg'>E-Mail</span>
            <Box className="grid grid-cols-[1fr_15fr_2fr] rounded-md w-[85%] h-10">
              <Box className="flex items-center justify-center bg-gray-700 rounded-l-md">
                <MailOutlineIcon sx={{ fontWeight: 25, color: 'white', fontSize: 25 }} />
              </Box>
              <Box className="flex items-center bg-gray-200">
                <span className='px-4 text-lg tracking-wide text-gray-500 lowercase'>
                  {user ? user.email : "Yükleniyor..."}
                </span>
              </Box>
              <Box className="flex items-center justify-center bg-gray-200 rounded-r-md">
                <Tooltip arrow title="Mail adresini değiştir" placement="right">
                  <IconButton onClick={() => onOpenClick("changeMail", "notLogin")}>
                    <EditIcon sx={{ fontWeight: 25, color: 'gray', fontSize: 25 }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="flex w-full bg-white border-gray-100 rounded-md shadow-md border-1 ">
        <Box className="py-2 w-[95%] mx-auto flex items-center justify-between">
          <span>Şifrenizi değiştirirken güvenli bir şifre oluşturduğunuza dikkat ediniz</span>
          <Button
            variant="outlined"
            color="info"
            sx={{ textTransform: 'none', fontSize: 15 }}
            onClick={handlePasswordReset}
          >
            Şifreyi Güncelle
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
