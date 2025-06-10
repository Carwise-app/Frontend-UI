import { Button, FormControl, InputLabel, OutlinedInput, TextField, Box, Stack, FormControlLabel, Checkbox, Link } from "@mui/material";
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
      <Box className="flex gap-x-3">
      <TextField label="İsim" fullWidth />
      <TextField label="Soyisim" fullWidth />
      </Box>
      <TextField label="Email" type="email" fullWidth />
      <PasswordControlLabel title="Şifre"/>
      <PasswordControlLabel title="Yeniden Şifre"/>
      <Box className="flex items-center mx-1.5">
        <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          padding: '1px',            
                          transform: 'scale(0.9)',   
                            '&.Mui-checked': {
                              color: '#dc143c',       
                            },
                        }}
                      />
                    }
                      label={
                        <span className='text-sm select-none'>
                          <Link href="#">KVKK</Link> metninin okudum, onaylıyorum.</span>
                      }
                  />
      </Box>
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
