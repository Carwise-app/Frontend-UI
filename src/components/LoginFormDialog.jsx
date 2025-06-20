import { TextField, Box, Checkbox, FormControlLabel } from "@mui/material";
import React, { useState } from 'react';
import PasswordControlLabel from "./PasswordControlLabel";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function LoginFormDialog({ onSwitch, onForgotPassword, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', form: '' });

  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("access_token", response.data.access_token);
      onLoginSuccess();
    } catch (error) {
      const errMsg = (error.response?.data?.error?.[0] || "").toLowerCase();
      let newErrors = {};
      if (errMsg.includes("user not found")) newErrors.email = "Böyle bir mail sistemde kayıtlı değil.";
      else if (errMsg.includes("invalid credentials")) newErrors.password = "Şifre yanlış girildi, lütfen kontrol ediniz.";
      else newErrors.form = "Giriş başarısız. Lütfen bilgilerinizi kontrol edin.";
      setErrors({ email: newErrors.email || '', password: newErrors.password || '', form: newErrors.form || '' });
    }
  };

  return (
    <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmit}>
      <TextField
        label="Email"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={Boolean(errors.email)}
        helperText={errors.email}
      />
      <PasswordControlLabel
        title="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={Boolean(errors.password)}
        helperText={errors.password}
      />

      <Box className="flex justify-between mx-1">
        <FormControlLabel
          control={<Checkbox sx={{ padding: '1px', transform: 'scale(0.9)', '&.Mui-checked': { color: '#dc143c' } }} />}
          label={<span className='text-sm select-none'>Beni Hatırla</span>}
        />
        <Box>
          <span className="text-[#dc143c] cursor-pointer" onClick={onForgotPassword}>
            Şifremi Unuttum
          </span>
        </Box>
      </Box>

      {errors.form && <span className="ml-1 text-xs text-red-600">{errors.form}</span>}

      <button
        type="submit"
        className="cursor-pointer bg-[#dc143c] py-2 w-[45%] flex justify-center mx-auto rounded-md"
      >
        <span className="text-lg font-medium text-white">Giriş Yap</span>
      </button>

      {/* Google Login Button */}
      <button
        onClick={() => window.location.href = "https://carwisegw.yusuftalhaklc.com/auth/google"}
        type="button"
        className="cursor-pointer border border-gray-300 py-2 w-[60%] flex items-center justify-center mx-auto rounded-md mt-2 hover:bg-gray-100"
      >
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="google"
          className="w-5 h-5 mr-2"
        />
        <span className="text-sm font-medium text-gray-700">Google ile Giriş Yap</span>
      </button>

      <p className="mt-2 text-sm text-center">
        Hesabınız yok mu?{" "}
        <span className="text-[#dc143c] cursor-pointer" onClick={onSwitch}>
          Kayıt Ol
        </span>
      </p>
    </form>
  );
}
