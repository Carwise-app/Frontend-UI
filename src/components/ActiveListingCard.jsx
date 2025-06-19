import { Box, Typography, IconButton, Tooltip, Chip, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  VisibilityOff as UnpublishIcon,
} from '@mui/icons-material';
import { useSnackbar } from '../context/SnackbarContext';

export default function ActiveListingCard({ listing, onClick, onEdit, onDelete, onUnpublish }) {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  // CSS-based placeholder component
  const PlaceholderImage = () => (
    <Box className="flex justify-center items-center w-full h-full bg-gray-200">
      <Box className="text-center">
        <Box className="mx-auto mb-2 w-12 h-8 bg-gray-400 rounded"></Box>
        <Box className="mx-auto w-8 h-8 bg-gray-400 rounded-full"></Box>
      </Box>
    </Box>
  );

  const imageUrl = listing.image?.path
    ? `https://carwisegw.yusuftalhaklc.com${listing.image.path}`
    : null;

  const formatPrice = (price) => price?.toLocaleString('tr-TR') || '0';
 

  const handleImageError = (e) => {
    console.warn('Resim yüklenemedi, placeholder gösteriliyor:', e.target.src);
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit?.(listing);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    setDeleteLoading(true);
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch(`https://carwisegw.yusuftalhaklc.com/listing/${listing.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {}),
        },
      });
      if (!response.ok) throw new Error('İlan silinemedi');
      onDelete?.(listing);
      showSnackbar('İlan başarıyla silindi', 'success');
      window.location.reload();
    } catch (err) {
      showSnackbar('İlan silinirken bir hata oluştu.', 'error');
      console.error('İlan silinemedi:', err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleUnpublish = (e) => {
    e.stopPropagation();
    onUnpublish?.(listing);
  };

  // İlan durumunu kontrol et
  const isActive = listing.status === 1 || listing.status === true;
  const statusText = isActive ? 'Aktif' : 'Aktif Değil';
  const statusColor = isActive ? 'success' : 'default';

  return (
    <Box
      onClick={() => {
        window.location.href = `/arac-detay/${listing.slug}`;
        onClick?.(listing);
      }}
      className={`flex items-center w-full px-2 py-2 transition border-b border-gray-200 rounded-none cursor-pointer hover:bg-gray-50 md:py-3 md:rounded-xl group ${
        isActive ? 'bg-gray-50' : 'bg-white'
      }`}
      sx={{ minHeight: 80 }}
    >
      {/* Image */}
      <Box className="flex-shrink-0 w-[80px] h-[60px] md:w-[120px] md:h-[90px] rounded overflow-hidden border border-gray-200 bg-white flex items-center justify-center mr-2 md:mr-4 relative">
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt={listing.title || 'Araç resmi'}
              className="object-cover w-full h-full"
              onError={handleImageError}
              loading="lazy"
            />
            <Box className="hidden absolute inset-0" style={{ display: 'none' }}>
              <PlaceholderImage />
            </Box>
          </>
        ) : (
          <PlaceholderImage />
        )}
      </Box>
      
      {/* Model */}
      <Tooltip title={listing.model?.name || '-'}>
        <Box className="mr-2 text-sm font-medium text-gray-700 truncate w-[100px] md:text-base md:mr-4">
          {listing.model?.name || '-'}
        </Box>
      </Tooltip>
      
      {/* Title */}
      <Box className="flex-1 min-w-0">
        <Typography
          component="span"
          onClick={e => { e.stopPropagation(); }}
          className="block text-sm font-semibold truncate md:text-base"
          sx={{ cursor: 'pointer' }}
        >
          {listing.title}
        </Typography>
      </Box>
      
      {/* Year - Sola kaydırıldı */}
      <Box className="w-[50px] text-center text-xs md:text-base text-gray-600 mx-1">
        {listing.year || '-'}
      </Box>
      
      {/* Price - Sola kaydırıldı */}
      <Box className="w-[130px] flex items-center justify-end font-bold text-[#dc143c] text-sm md:text-lg mx-1 truncate whitespace-nowrap overflow-hidden">
        {formatPrice(listing.price)} TL
      </Box>
      
      {/* Status Badge */}
      <Box className="mx-2">
        <Chip
          label={statusText}
          color={statusColor}
          size="small"
          className={`text-xs font-medium ${
            isActive 
              ? '!bg-gray-500 text-green-800 border border-green-200':'bg-gray-100 text-gray-600 border border-gray-200'}`}
          sx={{
            '& .MuiChip-label': {
              fontSize: '0.75rem',
              fontWeight: '500',
            }
          }}
        />
      </Box>
      
      {/* Action Buttons */}
      <Box className="flex gap-1 items-center ml-2">
        <Tooltip title="Düzenle" arrow placement="top">
          <IconButton
            onClick={handleEdit}
            className="text-blue-600 transition-all duration-200 hover:text-blue-800 hover:bg-blue-50"
            size="small"
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Yayından Kaldır" arrow placement="top">
          <IconButton
            onClick={handleUnpublish}
            className="text-orange-600 transition-all duration-200 hover:text-orange-800 hover:bg-orange-50"
            size="small"
          >
            <UnpublishIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Sil" arrow placement="top">
          <span>
            <IconButton
              onClick={handleDelete}
              className="text-red-600 transition-all duration-200 hover:text-red-800 hover:bg-red-50"
              size="small"
              disabled={deleteLoading}
            >
              {deleteLoading ? <CircularProgress size={18} color="error" /> : <DeleteIcon fontSize="small" />}
            </IconButton>
          </span>
        </Tooltip>
      </Box>
    </Box>
  );
} 