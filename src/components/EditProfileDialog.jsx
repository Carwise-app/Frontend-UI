import { Box, Button, TextField, InputAdornment } from "@mui/material";
import { useSnackbar } from '../context/SnackbarContext';
import React, { useState, useEffect } from "react";
import api from '../api/axios';

export default function EditProfileDialog({ onClose, user }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setPhone(user.phone_number || "");
    }
  }, [user]);

  const handlePhoneChange = (e) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    if (onlyNumbers.length <= 10) {
      setPhone(onlyNumbers);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!firstName.trim() || !lastName.trim() || !phone.trim()) {
      showSnackbar("Tüm alanları doldurunuz.", "error");
      return;
    }

    if (phone.length !== 10) {
      showSnackbar("Geçerli bir telefon numarası giriniz.", "error");
      return;
    }

    setLoading(true);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('first_name', firstName.trim());
      formData.append('last_name', lastName.trim());
      formData.append('country_code', '+90');
      formData.append('phone_number', phone);

      const response = await api.put("/profile/edit", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      showSnackbar("Profil bilgileri başarıyla güncellendi.", "success");
      
      onClose();
      
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      console.error("Profil güncelleme hatası:", error.response?.data || error.message);
      showSnackbar("Profil güncellenirken hata oluştu.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box className="flex flex-col gap-y-3 mb-6">
        <span>
          Profil bilgilerinizi güncelleyebilirsiniz. Bu bilgiler profilinizde ve ilanlarınızda görünecektir.
        </span>
        <Box className="flex text-lg gap-x-2">
          <span>Mevcut Bilgiler:</span>
          <span className="font-bold tracking-wide">
            {user ? `${user.first_name} ${user.last_name} - (${user.phone_number?.slice(0,3)}) ${user.phone_number?.slice(3,6)} ${user.phone_number?.slice(6)}` : "Yükleniyor..."}
          </span>
        </Box>
      </Box>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Box className="grid grid-cols-2 gap-4">
          <TextField
            label="İsim"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            required
            disabled={loading}
          />
          
          <TextField
            label="Soyisim"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            required
            disabled={loading}
          />
        </Box>

        <TextField
          label="Telefon Numarası"
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          inputProps={{ maxLength: 10 }}
          fullWidth
          required
          disabled={loading}
          InputProps={{
            startAdornment: <InputAdornment position="start">+90</InputAdornment>,
          }}
        />

        <Box className="flex justify-end gap-x-2 mt-4">
          <Button
            variant="outlined"
            onClick={onClose}
            disabled={loading}
            sx={{ textTransform: "none" }}
          >
            İptal
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={loading || !firstName.trim() || !lastName.trim() || !phone.trim() || phone.length !== 10}
            sx={{
              backgroundColor: "#dc143c",
              textTransform: "none",
              color: "white",
              "&:disabled": {
                backgroundColor: "rgba(220, 20, 60, 0.5)",
                color: "#ffffff",
                cursor: "not-allowed",
              },
            }}
          >
            {loading ? "Güncelleniyor..." : "Güncelle"}
          </Button>
        </Box>
      </form>
    </Box>
  );
} 