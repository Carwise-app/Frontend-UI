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
  ListItemText,
  Divider
} from '@mui/material';

export default function TermsDialog({ open, onClose }) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h4" className="text-center font-bold text-[#dc143c]">
          Kullanım Koşulları
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box className="space-y-6">
          <Typography variant="body1" className="text-gray-700 mb-4">
            CARWISE platformunu kullanırken aşağıdaki koşulları kabul etmiş sayılırsınız. Lütfen bu koşulları dikkatlice okuyunuz.
          </Typography>

          <List>
            <ListItem>
              <ListItemText 
                primary="1. Genel Koşullar"
                secondary="CARWISE platformunu kullanarak, bu kullanım koşullarını kabul etmiş sayılırsınız. Platform üzerinden yapılan tüm işlemler bu koşullara tabidir."
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText 
                primary="2. Üyelik ve Hesap Güvenliği"
                secondary="Üyelik bilgilerinizin güvenliğinden siz sorumlusunuz. Hesabınız üzerinden yapılan tüm işlemlerden siz sorumlu tutulursunuz."
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText 
                primary="3. İlan Verme ve Satın Alma"
                secondary="Verdiğiniz ilanların doğruluğundan ve güncelliğinden siz sorumlusunuz. Yanıltıcı veya yanlış bilgi içeren ilanlar kaldırılabilir."
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText 
                primary="4. Fikri Mülkiyet Hakları"
                secondary="Platform üzerindeki tüm içerikler CARWISE'nin fikri mülkiyetidir. İzinsiz kullanımı yasaktır."
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText 
                primary="5. Sorumluluk Sınırları"
                secondary="CARWISE, kullanıcılar arasındaki işlemlerden doğacak anlaşmazlıklardan sorumlu değildir. Tüm işlemler kullanıcılar arasında gerçekleşir."
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText 
                primary="6. Değişiklikler"
                secondary="CARWISE, bu kullanım koşullarını önceden haber vermeksizin değiştirme hakkını saklı tutar. Değişiklikler platform üzerinden duyurulur."
              />
            </ListItem>
          </List>

          <Box className="bg-gray-50 p-4 rounded-lg mt-4">
            <Typography variant="body2" className="text-gray-600">
              Bu kullanım koşulları, CARWISE platformunu kullanırken uymanız gereken temel kuralları içerir. 
              Daha detaylı bilgi için lütfen iletişime geçiniz.
            </Typography>
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