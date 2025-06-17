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
  ListItemText
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PaymentIcon from '@mui/icons-material/Payment';
import DescriptionIcon from '@mui/icons-material/Description';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

export default function SafeShoppingDialog({ open, onClose }) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h4" className="text-center font-bold text-[#dc143c]">
          Güvenli Alışverişin İpuçları
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box className="space-y-6">
          <List>
            <ListItem>
              <ListItemIcon>
                <VerifiedUserIcon className="text-[#dc143c]" />
              </ListItemIcon>
              <ListItemText 
                primary="Doğrulanmış Satıcılar"
                secondary="Sadece CARWISE tarafından doğrulanmış ve güvenilir satıcılarla işlem yapın. Satıcı profilinde doğrulama rozeti olup olmadığını kontrol edin."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PaymentIcon className="text-[#dc143c]" />
              </ListItemIcon>
              <ListItemText 
                primary="Güvenli Ödeme"
                secondary="Ödemelerinizi her zaman CARWISE güvenli ödeme sistemi üzerinden yapın. Satıcıdan doğrudan ödeme talep edilmesi durumunda işlemi sonlandırın."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DescriptionIcon className="text-[#dc143c]" />
              </ListItemIcon>
              <ListItemText 
                primary="Belge Kontrolü"
                secondary="Araç alımından önce tüm belgeleri (ruhsat, sigorta, bakım kayıtları) detaylı inceleyin. Eksik veya şüpheli belgeler konusunda dikkatli olun."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LocalShippingIcon className="text-[#dc143c]" />
              </ListItemIcon>
              <ListItemText 
                primary="Teslimat Süreci"
                secondary="Aracı teslim almadan önce detaylı inceleme yapın. Herhangi bir hasar veya eksiklik durumunda CARWISE destek ekibine başvurun."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SecurityIcon className="text-[#dc143c]" />
              </ListItemIcon>
              <ListItemText 
                primary="Güvenlik Önlemleri"
                secondary="Kişisel bilgilerinizi ve iletişim detaylarınızı güvenli bir şekilde paylaşın. Şüpheli durumlarda CARWISE destek ekibine bildirin."
              />
            </ListItem>
          </List>
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