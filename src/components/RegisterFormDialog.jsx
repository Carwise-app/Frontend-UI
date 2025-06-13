import {
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
  Link,
  InputAdornment
} from "@mui/material";
import React, { useState } from 'react';
import PasswordControlLabel from "./PasswordControlLabel";
import api from "../api/axios";

export default function RegisterFormDialog({ onSwitch }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedKvkk, setAcceptedKvkk] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let tempErrors = {};

    if (!firstName) tempErrors.firstName = "İsim gerekli.";
    if (!lastName) tempErrors.lastName = "Soyisim gerekli.";
    if (!validateEmail(email)) tempErrors.email = "Geçerli bir e-posta girin.";
    if (!phoneNumber || phoneNumber.length < 10) tempErrors.phoneNumber = "Geçerli bir telefon numarası girin.";
    if (password.length < 7 || !/[A-Z]/.test(password)) {
      tempErrors.password = "Şifre en az 7 karakter ve bir büyük harf içermelidir.";
    }
    if (password !== confirmPassword) tempErrors.confirmPassword = "Şifreler eşleşmiyor.";
    if (!acceptedKvkk) tempErrors.kvkk = "KVKK metnini kabul etmelisiniz.";

    setErrors(tempErrors);
    if (Object.keys(tempErrors).length > 0) return;

    try {
      await api.post("/auth/register", {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        phone_number: phoneNumber,
        country_code: "+90"
      });

      onSwitch(); // Kayıt sonrası giriş ekranına yönlendir
    } catch (error) {
      const errMsg = (error.response?.data?.error?.[0] || "").toLowerCase();
      let newErrors = {};

      if (errMsg.includes("email")) {
        newErrors.email = "Bu e-posta ile zaten üye olunmuş.";
      }
      if (errMsg.includes("phone")) {
        newErrors.phoneNumber = "Bu telefon numarası ile zaten üye olunmuş.";
      }
      if (Object.keys(newErrors).length === 0) {
        newErrors.form = "Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.";
      }

      setErrors(newErrors);
    }
  };

  return (
    <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmit}>
      <Box className="flex gap-x-3">
        <TextField
          label="İsim"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName}
        />
        <TextField
          label="Soyisim"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName}
        />
      </Box>

      <TextField
        label="Email"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={Boolean(errors.email)}
        helperText={errors.email}
      />

      <TextField
        label="Telefon Numarası"
        type="tel"
        fullWidth
        value={phoneNumber}
        onChange={(e) => {
          const value = e.target.value;
          if (/^\d*$/.test(value) && value.length <= 10) {
            setPhoneNumber(value);
          }
        }}
        error={Boolean(errors.phoneNumber)}
        helperText={errors.phoneNumber}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              +90
            </InputAdornment>
          ),
        }}
      />


      <PasswordControlLabel
        title="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={Boolean(errors.password)}
        helperText={errors.password}
      />

      <PasswordControlLabel
        title="Yeniden Şifre"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={Boolean(errors.confirmPassword)}
        helperText={errors.confirmPassword}
      />

      <Box className="flex items-center mx-1.5">
        <FormControlLabel
          control={
            <Checkbox
              checked={acceptedKvkk}
              onChange={(e) => setAcceptedKvkk(e.target.checked)}
              sx={{
                padding: '1px',
                transform: 'scale(0.9)',
                '&.Mui-checked': { color: '#dc143c' }
              }}
            />
          }
          label={
            <span className="text-sm select-none">
              <Link href="#">KVKK</Link> metnini okudum, onaylıyorum.
            </span>
          }
        />
      </Box>

      {errors.kvkk && (
        <span className="ml-2 -mt-2 text-xs text-red-600">{errors.kvkk}</span>
      )}
      {errors.form && (
        <span className="ml-2 -mt-2 text-xs text-red-600">{errors.form}</span>
      )}

      <button
        type="submit"
        className="cursor-pointer bg-[#dc143c] py-2 w-[45%] flex justify-center mx-auto rounded-md"
      >
        <span className="text-lg font-medium text-white">Kayıt Ol</span>
      </button>

      {/* Google ile Kayıt Butonu */}
      <button
        onClick={() => window.location.href = "https://carwisegw.yusuftalhaklc.com/auth/google"}
        type="button"
        className="cursor-pointer border border-gray-300 py-2 w-[65%] flex items-center justify-center mx-auto rounded-md mt-2 hover:bg-gray-100"
      >
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="google"
          className="w-5 h-5 mr-2"
        />
        <span className="text-sm font-medium text-gray-700">Google ile Kayıt Ol</span>
      </button>

      <p className="mt-2 text-sm text-center">
        Zaten bir hesabınız var mı?{" "}
        <span className="text-[#dc143c] cursor-pointer" onClick={onSwitch}>
          Giriş Yap
        </span>
      </p>
    </form>
  );
}
