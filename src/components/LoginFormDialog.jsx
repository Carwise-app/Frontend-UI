import { TextField, Box, Checkbox, FormControlLabel } from "@mui/material";
import React, { useState } from 'react';
import PasswordControlLabel from "./PasswordControlLabel";
import api from "../api/axios";
import { GoogleLogin } from '@react-oauth/google';

export default function LoginFormDialog({ onSwitch, onForgotPassword }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', form: '' });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => {
    const minLength = password.length >= 7;
    const hasUpperCase = /[A-Z]/.test(password);
    return { isValid: minLength && hasUpperCase, minLength, hasUpperCase };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let emailError = '', passwordError = '', formError = '';

    if (!validateEmail(email)) emailError = 'Geçerli bir email adresi giriniz.';
    const pwCheck = validatePassword(password);
    if (!pwCheck.isValid) passwordError = !pwCheck.minLength
      ? 'Şifre en az 7 karakter olmalıdır.'
      : 'Şifre en az bir büyük harf içermelidir.';

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError, form: '' });
      return;
    }

    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      window.location.reload();
    } catch (error) {
      const errMsg = (error.response?.data?.error?.[0] || "").toLowerCase();
      let newErrors = {};
      if (errMsg.includes("user not found")) newErrors.email = "Böyle bir mail sistemde kayıtlı değil.";
      else if (errMsg.includes("invalid credentials")) newErrors.password = "Şifre yanlış girildi, lütfen kontrol ediniz.";
      else newErrors.form = "Giriş başarısız. Lütfen bilgilerinizi kontrol edin.";
      setErrors({ email: newErrors.email || '', password: newErrors.password || '', form: newErrors.form || '' });
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;
    try {
      const response = await api.get('/auth/google/id-token', {
        params: { token: idToken }
      });
      localStorage.setItem('token', response.data.token);
      window.location.reload();
    } catch (err) {
      console.error("Google login doğrulama hatası:", err);
      setErrors({ ...errors, form: "Google ile giriş başarısız oldu." });
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

      {errors.form && <span className="text-xs text-red-600 ml-1">{errors.form}</span>}

      <button
        type="submit"
        className="cursor-pointer bg-[#dc143c] py-2 w-[45%] flex justify-center mx-auto rounded-md"
      >
        <span className="text-lg font-medium text-white">Giriş Yap</span>
      </button>

      <div className="flex justify-center mt-3">
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={() => setErrors({ ...errors, form: "Google ile giriş başarısız oldu." })}
          useOneTap
        />
      </div>

      <p className="text-sm text-center mt-2">
        Hesabınız yok mu?{" "}
        <span className="text-[#dc143c] cursor-pointer" onClick={onSwitch}>
          Kayıt Ol
        </span>
      </p>
    </form>
  );
}
