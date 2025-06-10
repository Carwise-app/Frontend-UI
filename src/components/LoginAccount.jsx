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

export default function LoginAccount({fullName, isLoggedIn, setIsLoggedIn}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
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

const handleClickLogOut = () => {
    // True ise false yap, false ise true yap
    setIsLoggedIn((prev) => !prev);
  };
  return (
    <Box>
      <button
        className='bg-[#dc143c] px-2 py-1 rounded-md cursor-pointer max-w-40 min-w-35 text-white'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <span>{formatName(fullName)}<ExpandMoreIcon/></span>
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
        <Box className="flex flex-col gap-y-2 px-3 cursor-pointer"> 
            <span className='hover:text-[#dc143c]'><AssignmentIcon sx={{marginRight:0.5, fontSize:18}}/>Kokpit</span>
            <span className='hover:text-[#dc143c]'><SettingsIcon sx={{marginRight:0.5, fontSize:18}}/>Ayarlar</span>
            <span className='hover:text-[#dc143c]' onClick={handleClickLogOut}><LogoutIcon sx={{marginRight:0.5, fontSize:18}}/>Çıkış Yap</span>
        </Box>
      </Menu>
    </Box>
  );
}