import React from 'react'
import ControlPanelHeader from './ControlPanelHeader'
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit'; 
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Button, IconButton, Toolbar, Tooltip } from '@mui/material';


export default function ProfileAndSettings({onOpenClick}) {
  
  return (
    <Box className="flex flex-col gap-y-4">
      <ControlPanelHeader icon={<SettingsIcon sx={{fontSize:115,color:'black',opacity:0.1,marginRight:1}}/>} title="Profil & Ayarlar" description="Burada profilinizle alakalı düzenlemeler ve ayarlamalar yapabilirsiniz." />
      <Box className="grid w-full bg-white shadow-md  rounded-md grid-cols-[1fr_7fr] h-21 max-h-21 border-1 border-gray-100 ">
        <Box className="flex items-center justify-center">
          <Box className="flex bg-[#ffcd37] rounded-full p-5 text-xl font-bold">
            <span>B</span>
            <span>G</span>
          </Box>
        </Box>
        <Box className="flex items-center text-2xl font-medium tracking-wide">
          <span>BATUHAN GÖZÜPEK</span>
        </Box>
      </Box>
      <Box className="flex w-full h-12 bg-white border-gray-100 rounded-md shadow-md border-1 max-h-12">
        <Box className="flex items-center justify-between w-[95%] mx-auto">
          <Box className="flex gap-x-1">
            <span>Üyelik Tarihi:</span>
            <span className='font-medium'>13.06.2025</span>
          </Box>
          <Box>
            <Button variant='outlined' color='error' sx={{ textTransform: 'none', fontSize:15,}}> 
              Hesabımı Sil
            </Button>
          </Box>
        </Box>
      </Box>
      <Box className="flex flex-col w-full px-5 py-5 bg-white border-gray-100 rounded-md shadow-md border-1 gap-y-4">
        <span className='text-2xl font-medium '>İletişim Bilgileri</span>
        <Box className="flex flex-col gap-y-4">
          <Box className="flex flex-col gap-y-4">
            <Box className="flex flex-col">  
              <span className='text-lg'>Cep Telefonu</span>
              <span className='text-sm font-light text-gray-500'>*İletişim bilgileriniz kullanıcıların size ulaşması için yayınladığını ilanlarda gözükmektedir.</span>
            </Box>
            <Box className="grid grid-cols-[1fr_15fr_2fr] rounded-md w-[85%] h-10">
              <Box className="flex items-center justify-center bg-gray-700 rounded-l-md">
                <PhoneIcon sx={{fontWeight:25, color:'white',fontSize:25}}/>
              </Box>
              <Box className="flex items-center bg-gray-200">
                <span className='px-4 text-lg font-medium tracking-wide'>(543) 671 94 37</span>
              </Box>
              <Box className="flex items-center justify-center bg-gray-200 rounded-r-md">
                <Tooltip arrow title="Telefon numaranı değiştir" placement="right">
                  <IconButton onClick={() => onOpenClick("changePhoneNumber","notLogin")}>
                      <EditIcon sx={{fontWeight:25, color:'gray',fontSize:25}}/>
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
          <Box className="flex flex-col gap-y-4">
            <span className='text-lg'>E-Mail</span>
            <Box className="grid grid-cols-[1fr_15fr_2fr] rounded-md w-[85%] h-10">
              <Box className="flex items-center justify-center bg-gray-700 rounded-l-md">
                <MailOutlineIcon sx={{fontWeight:25, color:'white',fontSize:25}}/>
              </Box>
              <Box className="flex items-center bg-gray-200">
                <span className='px-4 text-lg tracking-wide text-gray-500 lowercase'>Bgozupek1106@gmail.com</span>
              </Box>
              <Box className="flex items-center justify-center bg-gray-200 rounded-r-md">
                <Tooltip arrow title="Mail adresini değiştir" placement="right">
                  <IconButton onClick={() => onOpenClick("login","notLogin")}>
                      <EditIcon sx={{fontWeight:25, color:'gray',fontSize:25}}/>
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
          <Box className="flex flex-col gap-y-4">
            <span className='text-lg'>Konum Bilgisi</span>
            <Box className="grid grid-cols-[1fr_15fr_2fr] rounded-md w-[85%] h-10">
              <Box className="flex items-center justify-center bg-gray-700 rounded-l-md">
                <LocationOnIcon sx={{fontWeight:25, color:'white',fontSize:25}}/>
              </Box>
              <Box className="flex items-center bg-gray-200">
                <span className='px-4 text-lg font-medium tracking-wide'>Adres Ekle</span>
              </Box>
              <Box className="flex items-center justify-center bg-gray-200 rounded-r-md">
                <Tooltip arrow title="Telefon numaranı değiştir" placement="right">
                  <IconButton>
                      <EditIcon sx={{fontWeight:25, color:'white',fontSize:25}}/>
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
          <Button variant="outlined" color="info" sx={{ textTransform: 'none', fontSize:15,}}>
            Şifreyi Güncelle
          </Button>
        </Box>
      </Box>
    </Box> 
  )
}
