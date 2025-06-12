import {
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
  Link
} from "@mui/material";
import React, { useState } from 'react';
import PasswordControlLabel from "./PasswordControlLabel";
import api from "../api/axios";
import { GoogleLogin } from '@react-oauth/google';

export default function RegisterFormDialog({ onSwitch }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedKvkk, setAcceptedKvkk] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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

      onSwitch(); // Girişe yönlendir

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

  const handleGoogleRegisterSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;
    try {
      const response = await api.get('/auth/google/id-token', {
        params: { token: idToken }
      });
      localStorage.setItem('token', response.data.token);
      window.location.reload();
    } catch (err) {
      console.error("Google kayıt başarısız:", err);
      setErrors((prev) => ({ ...prev, form: "Google ile kayıt başarısız oldu." }));
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
        onChange={(e) => setPhoneNumber(e.target.value)}
        error={Boolean(errors.phoneNumber)}
        helperText={errors.phoneNumber}
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
        <span className="text-xs text-red-600 -mt-2 ml-2">{errors.kvkk}</span>
      )}
      {errors.form && (
        <span className="text-xs text-red-600 -mt-2 ml-2">{errors.form}</span>
      )}

      <button
        type="submit"
        className="cursor-pointer bg-[#dc143c] py-2 w-[45%] flex justify-center mx-auto rounded-md"
      >
        <span className="text-lg font-medium text-white">Kayıt Ol</span>
      </button>

      <GoogleLogin
        onSuccess={handleGoogleRegisterSuccess}
        onError={() => setErrors((prev) => ({ ...prev, form: "Google ile kayıt başarısız oldu." }))}
        width="100%"
      />

      <p className="text-sm text-center">
        Zaten bir hesabınız var mı?{" "}
        <span className="text-[#dc143c] cursor-pointer" onClick={onSwitch}>
          Giriş Yap
        </span>
      </p>
    </form>
  );
}
