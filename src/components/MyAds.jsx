import { Box } from '@mui/material'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import React, { useState } from 'react'
import ControlPanelHeader from './ControlPanelHeader';
import { NavLink, Outlet } from 'react-router-dom';

export default function MyAds() {
  
  return (
    <>
    <ControlPanelHeader icon={<FormatListBulletedIcon sx={{fontSize:115,color:'black',opacity:0.1,marginRight:1}}/>} title="İlanlarım" description="Oluşturduğunuz ilanlara kolayca bakabilirsiniz." />
    <Box className="flex justify-between mt-5 text-lg shadow-md bg-neutral-50 rounded-2xl">
      <NavLink  to="/kokpit/ilanlarim" end className={({isActive}) =>`cursor-pointer font-medium py-3 px-39 hover:text-[#dc143c] rounded-2xl ${isActive ? `bg-[rgb(220,20,60,0.2)] text-[#dc143c]`:``}`}>Yayındakiler</NavLink>
      <NavLink to="/kokpit/ilanlarim/yayinda-olmayanlar" className={({isActive}) =>`cursor-pointer font-medium py-3 px-39 hover:text-[#dc143c] rounded-2xl ${isActive ? `bg-[rgb(220,20,60,0.2)] text-[#dc143c]`:``}`}>Yayında Olmayanlar</NavLink>
    </Box>
    <Box className="mt-5">
      <Outlet/>
    </Box>
    </>
  )
}
