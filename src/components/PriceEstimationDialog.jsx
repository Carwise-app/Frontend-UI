import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SpeedIcon from '@mui/icons-material/Speed';
import TimelineIcon from '@mui/icons-material/Timeline';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CompareIcon from '@mui/icons-material/Compare';
import HistoryIcon from '@mui/icons-material/History';

export default function PriceEstimationDialog({ open, onClose }) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h4" className="text-center font-bold text-[#dc143c]">
          Arabamın Fiyatı Ne Kadar?
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box className="space-y-6">
          <Typography variant="body1" className="text-gray-700 mb-4">
            CARWISE'ın yapay zeka destekli fiyat tahmin sistemi, aracınızın gerçek piyasa değerini en doğru şekilde belirlemenize yardımcı olur. Binlerce veri noktasını analiz ederek, size en güncel ve doğru fiyat tahminini sunar.
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent>
                  <Box className="flex flex-col items-center text-center">
                    <TimelineIcon className="text-[#dc143c] text-4xl mb-3" />
                    <Typography variant="h6" className="font-semibold mb-2">
                      Detaylı Analiz
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      Aracınızın marka, model, yıl, kilometre, hasar durumu gibi tüm özelliklerini analiz ederek, piyasadaki benzer araçların fiyatlarını karşılaştırır.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent>
                  <Box className="flex flex-col items-center text-center">
                    <SpeedIcon className="text-[#dc143c] text-4xl mb-3" />
                    <Typography variant="h6" className="font-semibold mb-2">
                      Anlık Güncelleme
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      Piyasa fiyatları sürekli güncellenir ve sistemimiz bu değişiklikleri anlık olarak takip eder.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Typography variant="h6" className="font-semibold mt-4 text-[#dc143c]">
            Nasıl Çalışır?
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <HistoryIcon className="text-[#dc143c]" />
              </ListItemIcon>
              <ListItemText 
                primary="Araç Bilgilerini Girin"
                secondary="Aracınızın tüm detaylarını sisteme girin. Ne kadar detaylı bilgi girerseniz, o kadar doğru sonuç alırsınız."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CompareIcon className="text-[#dc143c]" />
              </ListItemIcon>
              <ListItemText 
                primary="Piyasa Analizi"
                secondary="Sistemimiz, benzer özellikteki araçların son satış fiyatlarını analiz eder."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <VerifiedUserIcon className="text-[#dc143c]" />
              </ListItemIcon>
              <ListItemText 
                primary="Doğrulanmış Sonuç"
                secondary="Yapay zeka algoritmamız, tüm verileri değerlendirerek size en doğru fiyat tahminini sunar."
              />
            </ListItem>
          </List>

          <Box className="bg-gray-50 p-4 rounded-lg mt-4">
            <Typography variant="h6" className="font-semibold mb-2 text-[#dc143c]">
              Premium Avantajları
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <AttachMoneyIcon className="text-[#dc143c]" />
                </ListItemIcon>
                <ListItemText 
                  primary="Sınırsız Sorgulama"
                  secondary="Premium üyeler sınırsız sayıda fiyat sorgulaması yapabilir."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <VerifiedUserIcon className="text-[#dc143c]" />
                </ListItemIcon>
                <ListItemText 
                  primary="Detaylı Raporlar"
                  secondary="Fiyat tahmininin yanı sıra, detaylı piyasa analizi ve trend raporları sunulur."
                />
              </ListItem>
            </List>
          </Box>
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