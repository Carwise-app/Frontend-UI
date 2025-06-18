import { Box, Typography, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function LearnLoginPage() {
  const navigate = useNavigate();
  const handleGoToBrand = () => navigate("/fiyat-ogren/marka");

  return (
    <Box className="min-h-screen bg-white relative overflow-hidden">
      <Box className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <Box className="text-center mb-20">
          <Typography className="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tight">
            Fiyat Öğren
          </Typography>
          <Typography className="text-2xl text-gray-600 font-light">
            Aracınızın değerini saniyeler içinde öğrenin
          </Typography>
        </Box>

        {/* Main Content Card */}
        <Box className="bg-gray-50 rounded-3xl border border-gray-200 p-12 mb-16 shadow-lg">
          <Typography className="text-xl text-gray-700 leading-relaxed text-center font-light">
            CARWISE'ın akıllı algoritması, aracınızın marka, model, kilometre, hasar durumu ve 
            piyasa koşullarını analiz ederek güncel değerini hesaplar.
          </Typography>
        </Box>

        {/* Features Grid */}
        <Box className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Box className="group text-center p-8 bg-white rounded-2xl border border-gray-200 hover:border-[#dc143c] hover:shadow-lg transition-all duration-500 hover:scale-105">
            <Box className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🚗</Box>
            <Typography className="text-xl font-semibold text-gray-900 mb-2">
              Araç Bilgileri
            </Typography>
          </Box>

          <Box className="group text-center p-8 bg-white rounded-2xl border border-gray-200 hover:border-[#dc143c] hover:shadow-lg transition-all duration-500 hover:scale-105">
            <Box className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🔧</Box>
            <Typography className="text-xl font-semibold text-gray-900 mb-2">
              Teknik Analiz
            </Typography>
          </Box>

          <Box className="group text-center p-8 bg-white rounded-2xl border border-gray-200 hover:border-[#dc143c] hover:shadow-lg transition-all duration-500 hover:scale-105">
            <Box className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">💰</Box>
            <Typography className="text-xl font-semibold text-gray-900 mb-2">
              Fiyat Tahmini
            </Typography>
          </Box>
        </Box>

        {/* Disclaimer */}
        <Box className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-16">
          <Typography className="text-sm text-yellow-800 text-center font-light">
            * Tüketiciden tüketiciye satış piyasa değeridir
          </Typography>
        </Box>

        {/* CTA Button */}
        <Box className="text-center">
          <Button
            variant="contained"
            onClick={handleGoToBrand}
            className="bg-gradient-to-r from-[#dc143c] to-[#b01030] hover:from-[#b01030] hover:to-[#8a0d25] text-white px-16 py-6 text-2xl font-bold rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-500"
            sx={{
              background: 'linear-gradient(135deg, #dc143c 0%, #b01030 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #b01030 0%, #8a0d25 100%)',
                boxShadow: '0 25px 50px -12px rgba(220, 20, 60, 0.25)',
              }
            }}
          >
            Başla
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
