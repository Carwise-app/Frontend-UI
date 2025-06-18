import { Box, Typography } from '@mui/material';
import React from 'react';

export default function ActiveListingCard({ listing, onClick }) {
  const imageUrl = listing.image?.path
    ? `https://carwisegw.yusuftalhaklc.com${listing.image.path}`
    : 'https://via.placeholder.com/120x90?text=Araç';

  const formatPrice = (price) => price?.toLocaleString('tr-TR') || '0';
  const formatKm = (km) => km?.toLocaleString('tr-TR') || '0';
  const formatDate = (timestamp) => {
    if (!timestamp) return '-';
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  return (
    <Box
      onClick={() => onClick?.(listing)}
      className="w-full flex items-center bg-white hover:bg-gray-50 transition cursor-pointer border-b border-gray-200 px-2 py-2 md:py-3 rounded-none md:rounded-xl group"
      sx={{ minHeight: 80 }}
    >
      {/* Image */}
      <Box className="flex-shrink-0 w-[80px] h-[60px] md:w-[120px] md:h-[90px] rounded overflow-hidden border border-gray-200 bg-white flex items-center justify-center mr-2 md:mr-4">
        <img
          src={imageUrl}
          alt={listing.title}
          className="object-cover w-full h-full"
          onError={e => { e.target.src = 'https://via.placeholder.com/120x90?text=Araç'; }}
        />
      </Box>
      {/* Model */}
      <Box className="w-[110px] md:w-[140px] text-sm md:text-base font-medium text-gray-700 truncate mr-2 md:mr-4">
        {listing.model?.name || '-'}
      </Box>
      {/* Title */}
      <Box className="flex-1 min-w-0">
        <Typography
          component="a"
          href={`/arac-detay/${listing.slug}`}
          onClick={e => { e.stopPropagation(); }}
          className="text-blue-700 font-semibold underline underline-offset-2 hover:text-blue-900 truncate block text-sm md:text-base"
          sx={{ cursor: 'pointer' }}
        >
          {listing.title}
        </Typography>
      </Box>
      {/* Year */}
      <Box className="w-[50px] text-center text-xs md:text-base text-gray-600 mx-1">
        {listing.year || '-'}
      </Box>
      {/* KM */}
      <Box className="w-[70px] text-center text-xs md:text-base text-gray-600 mx-1">
        {formatKm(listing.kilometers)}
      </Box>
      {/* Color */}
      <Box className="w-[60px] text-center text-xs md:text-base text-gray-600 mx-1">
        {listing.color || '-'}
      </Box>
      {/* Price */}
      <Box className="w-[90px] flex items-center justify-end font-bold text-[#dc143c] text-sm md:text-lg mx-1 truncate whitespace-nowrap overflow-hidden">
        {formatPrice(listing.price)} TL
      </Box>
      {/* Date */}
      <Box className="w-[110px] text-center text-xs md:text-base text-gray-600 mx-1">
        {formatDate(listing.created_at)}
      </Box>
      {/* City/District */}
      <Box className="w-[120px] text-center text-xs md:text-base text-gray-700 mx-1 truncate">
        {listing.city} <span className="text-gray-400">/</span> {listing.district}
      </Box>
    </Box>
  );
} 