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
  Divider
} from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SecurityIcon from '@mui/icons-material/Security';
import LockIcon from '@mui/icons-material/Lock';
import StorageIcon from '@mui/icons-material/Storage';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GavelIcon from '@mui/icons-material/Gavel';

export default function PrivacyDialog({ open, onClose }) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h4" className="text-center font-bold text-[#dc143c]">
          Kişisel Verilerin Korunması
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box className="space-y-6">
          <Typography variant="body1" className="text-gray-700 mb-4">
            CARWISE olarak, kişisel verilerinizin güvenliği bizim için önceliklidir. KVKK (Kişisel Verilerin Korunması Kanunu) kapsamında verilerinizi en üst düzeyde korumak için gerekli tüm önlemleri alıyoruz.
          </Typography>

          <Box>
            <Typography variant="h6" className="font-semibold mb-3 text-[#dc143c]">
              Veri Toplama ve İşleme
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <StorageIcon className="text-[#dc143c]" />
                </ListItemIcon>
                <ListItemText 
                  primary="Toplanan Veriler"
                  secondary="Sadece hizmetlerimizi sunmak için gerekli olan minimum düzeyde veri topluyoruz. Bu veriler: ad-soyad, iletişim bilgileri, araç bilgileri ve ödeme detaylarıdır."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <VisibilityIcon className="text-[#dc143c]" />
                </ListItemIcon>
                <ListItemText 
                  primary="Veri Kullanımı"
                  secondary="Toplanan verileriniz sadece sizin onayınız dahilinde ve belirtilen amaçlar doğrultusunda kullanılmaktadır."
                />
              </ListItem>
            </List>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" className="font-semibold mb-3 text-[#dc143c]">
              Veri Güvenliği
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <LockIcon className="text-[#dc143c]" />
                </ListItemIcon>
                <ListItemText 
                  primary="Şifreleme"
                  secondary="Tüm verileriniz endüstri standardı SSL şifreleme ile korunmaktadır. Verileriniz hem depolanırken hem de iletim sırasında şifrelenir."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SecurityIcon className="text-[#dc143c]" />
                </ListItemIcon>
                <ListItemText 
                  primary="Güvenlik Önlemleri"
                  secondary="Düzenli güvenlik denetimleri, güvenlik duvarları ve erişim kontrolü sistemleri ile verileriniz korunmaktadır."
                />
              </ListItem>
            </List>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" className="font-semibold mb-3 text-[#dc143c]">
              Kullanıcı Hakları
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <VerifiedUserIcon className="text-[#dc143c]" />
                </ListItemIcon>
                <ListItemText 
                  primary="Veri Erişimi"
                  secondary="Kişisel verilerinize erişim, düzeltme ve silme taleplerinizi 7/24 destek ekibimiz aracılığıyla yapabilirsiniz."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DeleteIcon className="text-[#dc143c]" />
                </ListItemIcon>
                <ListItemText 
                  primary="Veri Silme"
                  secondary="Hesabınızı kapatmak istediğinizde, tüm kişisel verileriniz sistemlerimizden tamamen silinir."
                />
              </ListItem>
            </List>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" className="font-semibold mb-3 text-[#dc143c]">
              Yasal Uyumluluk
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <GavelIcon className="text-[#dc143c]" />
                </ListItemIcon>
                <ListItemText 
                  primary="KVKK Uyumluluğu"
                  secondary="Tüm veri işleme süreçlerimiz KVKK ve ilgili mevzuata uygun olarak gerçekleştirilmektedir."
                />
              </ListItem>
            </List>
          </Box>

          <Typography variant="body2" className="text-gray-500 mt-4">
            * Daha detaylı bilgi için gizlilik politikamızı inceleyebilirsiniz. Herhangi bir sorunuz için destek ekibimizle iletişime geçebilirsiniz.
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