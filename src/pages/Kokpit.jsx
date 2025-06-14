import { Box } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import GridViewIcon from '@mui/icons-material/GridView';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PanelPhoto from '../assets/ControlPanelPhoto.jpg'
import { NavLink, Outlet } from 'react-router-dom';
import React from 'react'

export default function Kokpit({onLogout}) {

  

  return (
    <Box className="flex min-h-[calc(100vh-90px)] w-[80%] mx-auto gap-x-3">
        <Box className="w-[25%] flex flex-col bg-neutral-800">
          <Box className="relative px-6 py-12 bg-center bg-cover" sx={{ backgroundImage: `url(${PanelPhoto})` }}>
            <Box className="absolute inset-0 z-0 bg-black/25" />
            <Box className="relative z-10 flex flex-col">
              <span className='text-xl font-bold text-white'>Merhaba, BATUHAN</span>
              <span className='text-xs tracking-wider text-gray-300'>ID: 14612581</span>
            </Box>
          </Box>  
          <Box className="flex-grow px-6 py-6 bg-neutral-700">
            <Box className="flex flex-col font-medium gap-y-8">
              <NavLink to="/kokpit" end className={({isActive}) => `flex items-center gap-x-1 hover:text-[#dc143c] cursor-pointer ${isActive ? `text-[#dc143c]` : `text-white`}`}>
                  <GridViewIcon />Hızlı İşlemler
              </NavLink>
              <NavLink to="/kokpit/ilanlarim" className={({isActive}) => `flex items-center gap-x-1 hover:text-[#dc143c] cursor-pointer ${isActive ? `text-[#dc143c]` : `text-white`}`}>
                <FormatListBulletedIcon />İlanlarım
              </NavLink>
              <NavLink to="/kokpit/fav-ilan" className={({isActive}) => `flex items-center gap-x-1 hover:text-[#dc143c] cursor-pointer ${isActive ? `text-[#dc143c]` : `text-white`}`}>
                <StarBorderIcon />Favori İlanlar
              </NavLink>
              <NavLink to="/kokpit/mesajlarim" className={({isActive}) => `flex items-center gap-x-1 hover:text-[#dc143c] cursor-pointer ${isActive ? `text-[#dc143c]` : `text-white`}`}>
                <MailOutlineIcon />Mesajlarım
              </NavLink>
              <NavLink to="/kokpit/profil-ve-ayarlar" className={({isActive}) => `flex items-center gap-x-1 hover:text-[#dc143c] cursor-pointer ${isActive ? `text-[#dc143c]` : `text-white`}`}>
                <SettingsIcon />Profil & Ayarlar
              </NavLink>
            </Box>
          </Box>
          <Box className="sticky bottom-0 z-10 px-6 py-4 bg-neutral-600">
            <span className='flex items-center gap-x-1 cursor-pointer text-white hover:text-[#dc143c]' onClick={onLogout}>
              <LogoutIcon />Çıkış Yap
            </span>
          </Box>
        </Box>
        <Box className="flex flex-col w-[75%] mb-5">
          <Outlet/>
        </Box>
    </Box>
  )
}
