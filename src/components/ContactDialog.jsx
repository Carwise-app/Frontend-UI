import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Link
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

export default function ContactDialog({ open, onClose }) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h4" className="text-center font-bold text-[#dc143c]">
          İletişim Bilgileri
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box className="space-y-6">
          <Box className="flex items-start gap-3">
            <LocationOnIcon className="text-[#dc143c] mt-1" />
            <Box>
              <Typography variant="h6" className="font-semibold">
                Adres
              </Typography>
              <Typography variant="body1" className="text-gray-700">
                Çorlu KYK Erkek Yurdu
              </Typography>
            </Box>
          </Box>

          <Box className="flex items-start gap-3">
            <PhoneIcon className="text-[#dc143c] mt-1" />
            <Box>
              <Typography variant="h6" className="font-semibold">
                Telefon
              </Typography>
              <Link href="tel:+905376969474" className="text-gray-700 hover:text-[#dc143c]">
                +90 537 696 94 74
              </Link>
            </Box>
          </Box>

          <Box className="flex items-start gap-3">
            <EmailIcon className="text-[#dc143c] mt-1" />
            <Box>
              <Typography variant="h6" className="font-semibold">
                E-posta
              </Typography>
              <Link href="mailto:carwise@gmail.com" className="text-gray-700 hover:text-[#dc143c]">
                carwise@gmail.com
              </Link>
            </Box>
          </Box>

          <Box className="mt-6">
            <Typography variant="h6" className="font-semibold mb-2">
              Çalışma Saatleri
            </Typography>
            <Typography variant="body1" className="text-gray-700">
              Pazartesi - Cuma: 09:00 - 18:00
            </Typography>
            <Typography variant="body1" className="text-gray-700">
              Cumartesi: 10:00 - 14:00
            </Typography>
            <Typography variant="body1" className="text-gray-700">
              Pazar: Kapalı
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