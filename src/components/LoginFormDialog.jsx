import { TextField, Box, Stack, Checkbox, FormControlLabel } from "@mui/material";
import React, { useState } from 'react'
import PasswordControlLabel from "./PasswordControlLabel";



export default function LoginFormDialog({onSwitch,onForgotPassword}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 7;
    const hasUpperCase = /[A-Z]/.test(password);
    return {
      minLength,
      hasUpperCase,
      isValid: minLength && hasUpperCase
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let emailError = '';
    let passwordError = '';

    if (!validateEmail(email)) {
      emailError = 'Geçerli bir email adresi giriniz.';
    }
    
    const passwordCheck = validatePassword(password);
    if (!passwordCheck.isValid) {
      if (!passwordCheck.minLength) {
        passwordError = 'Şifre en az 7 karakter olmalıdır.';
      } else if (!passwordCheck.hasUpperCase) {
        passwordError = 'Şifre en az bir büyük harf içermelidir.';
      }
    }
    setErrors({ email: emailError, password: passwordError });
    
    if (emailError === '' && passwordError === '') {
      console.log("Giriş başarılı! Email:", email, "Şifre:", password);
    }
  };
  
  return (
    <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmit}>
      <TextField label="Email" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} error={Boolean(errors.email)} helperText={errors.email}/>
      <PasswordControlLabel title="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} error={Boolean(errors.password)} helperText={errors.password}/>
      <Box className="flex justify-between mx-1">
        <Box className="flex items-center mx-1">
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
                <span className='text-sm select-none'>Beni Hatırla</span>
              }
          />
        </Box>
        <Box>
          <span className="text-[#dc143c] cursor-pointer" onClick={onForgotPassword}>
            Şifremi Unuttum
          </span>
        </Box>
      </Box>
      <button type="submit" className="cursor-pointer bg-[#dc143c] py-2 w-[45%] flex justify-center mx-auto rounded-md">
        <span className="text-lg font-medium text-white">Giriş Yap</span>
      </button>
      <p className="text-sm text-center">
        Hesabınız yok mu?{" "}
        <span className="text-[#dc143c] cursor-pointer" onClick={onSwitch}>
          Kayıt Ol
        </span>
      </p>
    </form>
  )
}
