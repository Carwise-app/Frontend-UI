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
  CardContent,
  Divider
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import SpeedIcon from '@mui/icons-material/Speed';
import SupportIcon from '@mui/icons-material/Support';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';

export default function PremiumAccountDialog({ open, onClose }) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h4" className="text-center font-bold text-[#dc143c]">
          Premium Hesap
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box className="space-y-6">
          <Typography variant="body1" className="text-gray-700 mb-4">
            CARWISE Premium üyeliği ile araç alım satım süreçlerinizi daha verimli ve avantajlı hale getirin. Özel hizmetler ve avantajlarla tanışın.
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent>
                  <Box className="flex flex-col items-center text-center">
                    <StarIcon className="text-[#dc143c] text-4xl mb-3" />
                    <Typography variant="h6" className="font-semibold mb-2">
                      Premium Özellikler
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      Sınırsız fiyat sorgulama, detaylı raporlar ve öncelikli destek hizmetleri.
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
                      Hızlı İşlemler
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      Öncelikli işlem hakkı ve hızlı onay süreçleri ile zaman kazanın.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Divider />

          <Typography variant="h6" className="font-semibold mt-4 text-[#dc143c]">
            Premium Avantajları
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <AnalyticsIcon className="text-[#dc143c]" />
              </ListItemIcon>
              <ListItemText 
                primary="Detaylı Piyasa Analizi"
                secondary="Günlük, haftalık ve aylık piyasa trendleri, fiyat değişimleri ve detaylı analiz raporları."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <NotificationsIcon className="text-[#dc143c]" />
              </ListItemIcon>
              <ListItemText 
                primary="Özel Bildirimler"
                secondary="İlgilendiğiniz araçlar için anlık fiyat değişikliği ve yeni ilan bildirimleri."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SupportIcon className="text-[#dc143c]" />
              </ListItemIcon>
              <ListItemText 
                primary="7/24 Öncelikli Destek"
                secondary="Premium üyelere özel destek ekibi ile her zaman yanınızdayız."
              />
            </ListItem>
          </List>

          <Box className="bg-gray-50 p-4 rounded-lg mt-4">
            <Typography variant="h6" className="font-semibold mb-2 text-[#dc143c]">
              Premium Üyelik Paketleri
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Card className="h-full">
                  <CardContent>
                    <Typography variant="h6" className="text-center font-semibold mb-2">
                      Aylık
                    </Typography>
                    <Typography variant="h4" className="text-center text-[#dc143c] font-bold mb-2">
                      199₺
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <SecurityIcon className="text-[#dc143c]" />
                        </ListItemIcon>
                        <ListItemText primary="Tüm Premium Özellikler" />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card className="h-full">
                  <CardContent>
                    <Typography variant="h6" className="text-center font-semibold mb-2">
                      6 Aylık
                    </Typography>
                    <Typography variant="h4" className="text-center text-[#dc143c] font-bold mb-2">
                      999₺
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <SecurityIcon className="text-[#dc143c]" />
                        </ListItemIcon>
                        <ListItemText primary="Tüm Premium Özellikler" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <StarIcon className="text-[#dc143c]" />
                        </ListItemIcon>
                        <ListItemText primary="%15 İndirim" />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card className="h-full">
                  <CardContent>
                    <Typography variant="h6" className="text-center font-semibold mb-2">
                      Yıllık
                    </Typography>
                    <Typography variant="h4" className="text-center text-[#dc143c] font-bold mb-2">
                      1799₺
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <SecurityIcon className="text-[#dc143c]" />
                        </ListItemIcon>
                        <ListItemText primary="Tüm Premium Özellikler" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <StarIcon className="text-[#dc143c]" />
                        </ListItemIcon>
                        <ListItemText primary="%25 İndirim" />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
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