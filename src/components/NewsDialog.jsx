import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid
} from '@mui/material';

export default function NewsDialog({ open, onClose }) {
  const news = [
    {
      title: "CARWISE'da Yeni Dönem",
      date: "15 Mart 2024",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "Yapay zeka destekli fiyat tahmin sistemimiz güncellendi. Daha doğru ve hızlı sonuçlar için yeni algoritmalar devrede."
    },
    {
      title: "Premium Üyelik Avantajları",
      date: "10 Mart 2024",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "Premium üyelerimize özel yeni avantajlar eklendi. Sınırsız fiyat sorgulama ve öncelikli destek hizmetleri."
    },
    {
      title: "Mobil Uygulama Güncellemesi",
      date: "5 Mart 2024",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "CARWISE mobil uygulaması yeni arayüzü ve gelişmiş özellikleriyle kullanıcılarımızın hizmetinde."
    }
  ];

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h4" className="text-center font-bold text-[#dc143c]">
          Haberler
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box className="space-y-6">
          <Grid container spacing={3}>
            {news.map((item, index) => (
              <Grid item xs={12} key={index}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={item.image}
                          alt={item.title}
                          className="rounded-lg"
                        />
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Typography variant="h6" className="font-semibold mb-2">
                          {item.title}
                        </Typography>
                        <Typography variant="caption" className="text-gray-500 mb-2 block">
                          {item.date}
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                          {item.description}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error" variant="contained">
          Kapat
        </Button>
      </DialogActions>
    </Dialog>
  );
} 