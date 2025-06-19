import React from 'react';
import {
  Dialog,
  DialogContent,
  Button,
  Typography,
  Box
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

export default function ImagePredictionDialog({ open, onClose, prediction }) {
  if (!prediction) {
    return null;
  }

  // Handle nested prediction structure
  const predictionData = prediction.prediction || prediction;
  const isPredictionSuccess = predictionData.prediction === true;
  
  const confidence = predictionData.confidence !== undefined && predictionData.confidence !== null
    ? Math.round((predictionData.confidence) * 100) + '%'
    : '0%';
  
  const imageId = predictionData.image?.id || predictionData.image_id || predictionData.id || '-';
  
  // Handle different timestamp formats
  let formattedDate = '-';
  if (predictionData.created_at) {
    try {
      const date = new Date(predictionData.created_at * 1000);
      if (!isNaN(date.getTime())) {
        formattedDate = date.toLocaleDateString('tr-TR', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }) + ' ' + date.toLocaleTimeString('tr-TR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
      }
    } catch (e) {
      console.error('Date parsing error:', e);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: '20px', p: 2 } }}>
      <DialogContent>
        <Box className="flex flex-col items-center gap-2 mb-2">
          {isPredictionSuccess ? (
            <CheckCircleIcon sx={{ color: '#43b581', fontSize: 48 }} />
          ) : (
            <ErrorIcon sx={{ color: '#dc143c', fontSize: 48 }} />
          )}
          <Typography variant="h5" sx={{ color: isPredictionSuccess ? '#43b581' : '#dc143c', fontWeight: 700 }}>
            {isPredictionSuccess ? 'Araç Tespit Edildi' : 'Araç Tespit Edilemedi'}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            carwise-prediction-service-v3
          </Typography>
        </Box>
        <Box sx={{ borderBottom: '1px solid #eee', mb: 2 }} />
        <Box className="flex flex-col gap-1 mb-2">
          <Typography variant="body1" fontWeight={500}>
            Güven Oranı
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {confidence}
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            Tahmin Tarihi
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {formattedDate}
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            Image ID
          </Typography>
          <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
            {imageId}
          </Typography>
        </Box>
        <Typography variant="caption" color="textSecondary" className="block text-center mt-2 mb-4">
          Bu sonuç AI tarafından tahmin edilmiştir. Sadece referans amaçlıdır.
        </Typography>
        <Button onClick={onClose} variant="contained" color="error" fullWidth sx={{ borderRadius: '8px', py: 1.2, fontWeight: 700 }}>
          Kapat
        </Button>
      </DialogContent>
    </Dialog>
  );
} 