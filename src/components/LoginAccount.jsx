import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExpandMoreIcon  from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function LoginAccount({fullName, onLogout}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function formatName(fullName) {
  if (!fullName) return "";

  const parts = fullName.trim().split(" ");
  const firstName = parts[0];
  const lastNameInitial = parts.length > 1 ? parts[parts.length - 1][0] + "." : "";
  return `${firstName} ${lastNameInitial}`;
}

  return (
    <Box>
      <button
        id="basic-button"
        className='bg-[#dc143c] px-2 py-1 rounded-md cursor-pointer max-w-40 min-w-35 text-white'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <span className='flex justify-center gap-x-2'>{formatName(fullName)}<ExpandMoreIcon/></span>
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
        PaperProps={{
          style: {
            minWidth: anchorEl ? anchorEl.offsetWidth : undefined,
          },
        }}
      >
        <Box className="flex flex-col px-3 cursor-pointer gap-y-2"> 
          <NavLink to="/kokpit" onClick={handleClose}>
            <span className='hover:text-[#dc143c]'><AssignmentIcon sx={{marginRight:0.5, fontSize:18}}/>Kokpit</span>
          </NavLink>
          <NavLink to="/kokpit/profil-ve-ayarlar" onClick={handleClose}>
            <span className='hover:text-[#dc143c]'><SettingsIcon sx={{marginRight:0.5, fontSize:18}}/>Ayarlar</span>
          </NavLink>
            <span className='hover:text-[#dc143c]' onClick={onLogout}><LogoutIcon sx={{marginRight:0.5, fontSize:18}}/>Çıkış Yap</span>
        </Box>
      </Menu>
    </Box>
  );
}