import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box
} from '@mui/material';

export default function AboutUsDialog({ open, onClose }) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h4" className="text-center font-bold text-[#dc143c]">
          CARWISE Hakkında
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box className="space-y-4">
          <Typography variant="body1" className="text-gray-700">
            CARWISE, 2024 yılında kurulmuş, Türkiye'nin önde gelen araç değerleme ve satış platformudur. Misyonumuz, araç alım satım süreçlerini şeffaf, güvenilir ve kullanıcı dostu bir hale getirmektir.
          </Typography>

          <Typography variant="body1" className="text-gray-700">
            Platformumuz, yapay zeka destekli değerleme sistemi ile araç sahiplerine en doğru fiyat tahminlerini sunarken, alıcılara da güvenilir ve detaylı araç bilgileri sağlamaktadır. CARWISE olarak, her gün binlerce kullanıcımıza hizmet veriyor ve araç piyasasının dijital dönüşümüne öncülük ediyoruz.
          </Typography>

          <Typography variant="h6" className="font-semibold mt-4">
            Neden CARWISE?
          </Typography>

          <Typography variant="body1" className="text-gray-700">
            • Yapay zeka destekli hassas fiyat tahminleri
            • Detaylı araç geçmişi raporları
            • Güvenli alım-satım süreçleri
            • 7/24 müşteri desteği
            • Şeffaf ve kullanıcı dostu arayüz
          </Typography>

          <Typography variant="h6" className="font-semibold mt-4">
            Vizyonumuz
          </Typography>

          <Typography variant="body1" className="text-gray-700">
            Türkiye'nin en güvenilir ve kapsamlı araç değerleme platformu olarak, araç alım satım süreçlerini tamamen dijitalleştirmeyi ve kullanıcılarımıza en iyi deneyimi sunmayı hedefliyoruz. Sürekli gelişen teknolojimiz ve yenilikçi çözümlerimizle, araç piyasasının geleceğini şekillendiriyoruz.
          </Typography>

          <Typography variant="h6" className="font-semibold mt-4">
            Değerlerimiz
          </Typography>

          <Typography variant="body1" className="text-gray-700">
            • Müşteri odaklılık
            • Şeffaflık
            • Yenilikçilik
            • Güvenilirlik
            • Sürekli gelişim
          </Typography>
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