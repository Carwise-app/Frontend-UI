import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import api from "../api/axios";

export default function ForgotPasswordFormDialog({ onSwitch, onSuccess }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("E-posta adresi gerekli.");
      return;
    }

    try {
      await api.post("/auth/reset-password", { email });
      setError('');
      onSuccess();
    } catch (err) {
      const message = err.response?.data?.error?.[0]?.toLowerCase() || "";
      
      if (message.includes("not found") || message.includes("email")) {
        setError("Böyle bir e-mail bulunmamaktadır.");
      } else {
        setError("Şifre sıfırlama işlemi başarısız.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box className="flex flex-col gap-y-5">
        <span>Yeni şifre oluşturmak için kayıt olduğunuz mail adresini giriniz.</span>
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(error)}
          helperText={error}
        />
        <Box className="flex flex-col gap-y-2">
          <button
            type="submit"
            className='bg-[#dc143c] py-3 w-[45%] mx-auto text-white font-medium rounded-md cursor-pointer'>
            Gönder
          </button>
          <button
            type="button"
            className='bg-gray-500 py-0.5  w-[15%] mx-auto text-white rounded-md cursor-pointer'
            onClick={onSwitch}>
            Geri
          </button>
        </Box>
      </Box>
    </form>
  );
}
