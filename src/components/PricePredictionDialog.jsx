import React from 'react';
import {
  Dialog,
  DialogContent,
  Button,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';

export default function PricePredictionDialog({ open, onClose, loading, predictionData }) {
  const formatPrice = (price) => {
    if (!price) return "0";
    // Virgülden sonra sadece iki basamak göster
    return Math.round(price).toLocaleString('tr-TR');
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '20px',
          padding: '24px',
          minHeight: '360px',
          maxWidth: '400px'
        }
      }}
    >
      <DialogContent>
        {loading ? (
          <Box className="flex flex-col items-center justify-center py-12 gap-6">
            <div className="relative">
              <CircularProgress color="error" size={60} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
            </div>
            <Typography className="text-lg text-gray-700">
              Yapay zeka fiyat tahmini yapıyor...
            </Typography>
          </Box>
        ) : predictionData ? (
          <Box className="flex flex-col items-center justify-center min-h-[280px] gap-4">
            <Box className="flex items-center gap-3 mb-2">
              <span className="text-2xl">✨</span>
              <Typography 
                className="font-medium text-gray-800"
                sx={{ fontSize: '1.25rem' }}
              >
                AI Fiyat Tahmini
              </Typography>
            </Box>
            
            <Box className="flex items-baseline justify-center gap-2 mb-2">
              <Typography 
                className="font-bold text-[#dc143c] tracking-tight"
                sx={{ 
                  fontSize: '2.75rem',
                  lineHeight: 1
                }}
              >
                {formatPrice(predictionData.tahmini_fiyat)}
              </Typography>
              <Typography 
                className="font-bold text-[#dc143c]"
                sx={{ fontSize: '2.75rem' }}
              >
                TL
              </Typography>
            </Box>
            
            <Box className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
              <Typography 
                className="text-gray-600"
                sx={{ fontSize: '0.9rem' }}
              >
                Sapma Payı:
              </Typography>
              <Typography 
                className="text-gray-800 font-bold"
                sx={{ fontSize: '0.9rem' }}
              >
                ±{formatPrice(predictionData.mae)} TL
              </Typography>
            </Box>
            
            <Typography 
              className="text-gray-500 text-center max-w-[280px] mt-3"
              sx={{ fontSize: '0.875rem' }}
            >
              Bu tahmin AI modeli tarafından yapılmıştır<br/>
              ve son bir yıldaki benzer araç fiyatları<br/>
              referans alınmıştır.
            </Typography>

            <Button 
              onClick={onClose} 
              variant="contained" 
              color="error" 
              sx={{ 
                mt: 3,
                textTransform: 'none',
                borderRadius: '8px',
                padding: '8px 32px',
                fontSize: '0.9rem'
              }}
            >
              Kapat
            </Button>
          </Box>
        ) : null}
      </DialogContent>
    </Dialog>
  );
} 