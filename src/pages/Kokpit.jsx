import { Box } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import GridViewIcon from '@mui/icons-material/GridView';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PanelPhoto from '../assets/ControlPanelPhoto.jpg'
import NoCrashIcon from '@mui/icons-material/NoCrash';
import SellIcon from '@mui/icons-material/Sell';
import React from 'react'
import PanelQuickTransactions from '../components/PanelQuickTransactions';

export default function Kokpit() {



  return (
    <Box className="flex min-h-[calc(100vh-90px)] w-[80%] mx-auto gap-x-3">
        <Box className="w-[25%] flex flex-col bg-neutral-800">
          <Box className="relative px-6 py-12 bg-cover bg-center" sx={{ backgroundImage: `url(${PanelPhoto})` }}>
            <Box className="absolute inset-0 bg-black/30 z-0" />
            <Box className="relative z-10 flex flex-col">
              <span className='text-xl text-white font-bold'>Merhaba, BATUHAN</span>
              <span className='text-xs text-gray-300 tracking-wider'>ID: 14612581</span>
            </Box>
          </Box>  
          <Box className="flex-grow px-6 py-6 bg-neutral-700">
            <Box className="flex flex-col gap-y-8 font-medium">
              <span className='flex items-center gap-x-1 text-white hover:text-[#dc143c] cursor-pointer'>
                <GridViewIcon />Hızlı İşlemler
              </span>
              <span className='flex items-center gap-x-1 text-white hover:text-[#dc143c] cursor-pointer'>
                <FormatListBulletedIcon />İlanlarım
              </span>
              <span className='flex items-center gap-x-1 text-white hover:text-[#dc143c] cursor-pointer'>
                <StarBorderIcon />Favori İlanlar
              </span>
              <span className='flex items-center gap-x-1 text-white hover:text-[#dc143c] cursor-pointer'>
                <MailOutlineIcon />Mesajlar
              </span>
              <span className='flex items-center gap-x-1 text-white hover:text-[#dc143c] cursor-pointer'>
                <SettingsIcon />Profil & Ayarlar
              </span>
            </Box>
          </Box>
          <Box className="px-6 py-4 bg-neutral-600 sticky bottom-0 z-10">
            <span className='flex items-center gap-x-1 text-white hover:text-[#dc143c] '>
              <LogoutIcon />Çıkış Yap
            </span>
          </Box>
        </Box>
        <Box className="flex flex-col w-[75%]">
          <Box className="flex justify-between bg-[#ffc107] rounded-b-lg">
            <Box className="flex flex-col justify-center ps-10 py-10 text-white ">
              <span className='text-3xl font-bold'>Hızlı İşlemler</span>
              <span className='font-light'>Bu sekmede hızlı bir şekilde işlemlere ulaşabilirsiniz.</span>
            </Box>
            <GridViewIcon sx={{fontSize:115,color:'black',opacity:0.1,marginRight:1}}/>
          </Box>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            <PanelQuickTransactions icon={<FormatListBulletedIcon sx={{fontSize:50, color:'black'}}/>} title="İlan Ver" description="İlan ver, aracın CARWISE ile satılsın."/>
            <PanelQuickTransactions icon={<NoCrashIcon sx={{fontSize:50, color:'black'}}/>} title="Araç İlanlarını Gör" description="Hayalindeki araç için diğer satıcıların ilanlarına göz at."/>
            <Box className="md:col-span-2 md:justify-self-center w-full md:w-4/5  ">
              <PanelQuickTransactions icon={<SellIcon sx={{fontSize:50, color:'black'}}/>} title="Arabam Ne Kadar ?" description="CARWISE'nın yeni yapay zeka aracı ile aracının marka, model, kilometre ve renk gibi özelliklerini söyle aracının değerinin ne olduğunı anında gör."/>
            </Box>
          </Box>
        </Box>
    </Box>
  )
}
