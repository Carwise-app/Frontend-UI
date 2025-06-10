import { Button, FormControl, InputLabel, OutlinedInput, TextField, Box } from "@mui/material";
import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PasswordControlLabel from "./PasswordControlLabel";

export default function RegisterFormDialog({onSwitch}) {
  const [showPassword, setShowPassword] = useState(false);
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  return (
    <form className="flex flex-col gap-4 mt-2">
      <TextField label="Ad Soyad" fullWidth />
      <TextField label="Email" type="email" fullWidth />
      <PasswordControlLabel title="Şifre"/>
      <PasswordControlLabel title="Yeniden Şifre"/>
      <button type="submit" className="cursor-pointer bg-[#dc143c] py-2 w-[45%] flex justify-center mx-auto rounded-md">
        <span className="text-lg font-medium text-white">Kayıt Ol</span>
      </button>
      <p className="text-sm text-center">
        Zaten bir hesabınız var mı?{" "}
        <span className="text-[#dc143c] cursor-pointer" onClick={onSwitch}>
          Giriş Yap
        </span>
      </p>
    </form>
  )
}
