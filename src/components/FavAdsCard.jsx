import { Box, IconButton, Tooltip } from '@mui/material';
import AdsPhoto from '../assets/DenemeArabaCard2.jpg';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useEffect, useState } from 'react';
import api from '../api/axios';

export default function FavAdsCard({ onFavoriteCountChange }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    api.get('/favorite')
      .then(res => {
        setFavorites(res.data || []);
        if (onFavoriteCountChange) {
          onFavoriteCountChange(res.data?.length || 0);
        }
      })
      .catch(err => {
        console.error('Favoriler alınamadı:', err);
      });
  }, []);

  const handleDelete = (listingId) => {
    api.delete(`/favorite/${listingId}`)
      .then(() => {
        const updated = favorites.filter(fav => fav.id !== listingId);
        setFavorites(updated);
        if (onFavoriteCountChange) {
          onFavoriteCountChange(updated.length);
        }
      })
      .catch(err => {
        console.error('Favori silinemedi:', err);
      });
  };

  if (favorites.length === 0) return null;

  return (
    <>
      {favorites.map((fav) => (
        <Box
          key={fav.id}
          className="grid grid-cols-[1fr_2fr_1fr_1fr_0.5fr] w-full max-h-30 h-30 bg-white rounded-sm shadow-md gap-x-1 cursor-pointer border-1 border-gray-100 transition-transform duration-300 hover:-translate-y-1 mb-2"
        >
          <Box className="flex items-center justify-center w-full bg-gray-100 rounded-l-sm h-30 max-h-30">
            <img src={fav.photo || AdsPhoto} alt="ad" className="object-contain h-full" />
          </Box>
          <Box className="flex items-center justify-center text-lg font-medium">
            <span>{fav.title || "Başlık Bilgisi Yok"}</span>
          </Box>
          <Box className="flex items-center text-xl text-[#dc143c] font-medium border-l border-gray-100 justify-center">
            <span>{fav.price?.toLocaleString()} ₺</span>
          </Box>
          <Box className="flex items-center justify-center border-l border-gray-100">
            <LocationOnIcon />
            <span className="text-sm">{fav.city}/{fav.district}</span>
          </Box>
          <Box className="flex items-center justify-center">
            <Tooltip title="Favorilerden Çıkar" arrow placement="right">
              <IconButton onClick={() => handleDelete(fav.id)}>
                <ClearIcon sx={{ fontSize: 25, color: "#dc143c" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      ))}
    </>
  );
}
