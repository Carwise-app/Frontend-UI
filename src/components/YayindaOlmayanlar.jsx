import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Button, Pagination, Typography } from '@mui/material';
import NoAds from './NoAds';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import ShowcaseCard from './Card';

// JWT token'ı decode etmek için güvenli fonksiyon
const parseJwt = (token) => {
  try {
    if (!token) return null;
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('JWT decode hatası:', error);
    return null;
  }
};

export default function YayindaOlmayanlar() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  const fetchUserListings = (pageNum = 1, append = false) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    // JWT token'dan user_id'yi al
    const token = localStorage.getItem('access_token');
    let userId = null;
    
    if (token) {
      try {
        const decodedToken = parseJwt(token);
        userId = decodedToken?.user_id || decodedToken?.sub || decodedToken?.id;
      } catch (error) {
        console.error('Token parse hatası:', error);
      }
    }

    if (!userId) {
      setLoading(false);
      setLoadingMore(false);
      return;
    }

    api.get(`/listing/?created_by=${userId}`, {
      params: {
        page: pageNum,
        limit: 10,
        status: 2 // Yayında olmayan ilanlar
      }
    })
    .then(res => {
      const newListings = res.data.listings || [];
      setListings(prev => append ? [...prev, ...newListings] : newListings);
      setTotalCount(res.data.total || 0);
      setTotalPages(Math.ceil((res.data.total || 0) / 10));
      setHasMore(newListings.length > 0 && pageNum < Math.ceil((res.data.total || 0) / 10));
      if (append) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    })
    .catch(err => {
      console.error("Kullanıcı ilanları alınamadı:", err);
      if (append) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    });
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchUserListings(nextPage, true);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    fetchUserListings(value, false);
  };

  useEffect(() => {
    fetchUserListings(1, false);
  }, []);

  if (loading) {
    return (
      <Box className="flex justify-center items-center py-12">
        <CircularProgress color="error" />
      </Box>
    );
  }

  if (listings.length === 0) {
    return (
      <NoAds 
        title="Yayında olmayan ilanınız bulunmamakta" 
        desc="Hemen ilan ver ve milyonlarca alıcıya anında ulaş" 
        textBtn="Hemen ilan ver"
        onClick={() => navigate('/ilan-olustur/marka')}
      />
    );
  }

  return (
    <>
      <Box className="mb-4">
        <Typography variant="h6" className="text-gray-700">
          Toplam {totalCount} yayında olmayan ilanınız bulunmaktadır
        </Typography>
      </Box>
      
      <Box className="grid grid-cols-1 gap-6 sm:gap-8 gap-y-8 sm:gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {listings.map((listing, index) => (
          <Box 
            key={listing.id || index} 
            onClick={() => navigate(`/arac-detay/${listing.slug}`)}
            className="cursor-pointer group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <ShowcaseCard listing={listing} />
          </Box>
        ))}
      </Box>

      {loadingMore && (
        <Box className="flex justify-center py-4">
          <CircularProgress size={24} />
        </Box>
      )}

      {hasMore && !loadingMore && (
        <Box className="flex justify-center py-4">
          <Button 
            variant="outlined" 
            onClick={loadMore}
            sx={{ 
              color: '#dc2626', 
              borderColor: '#dc2626', 
              '&:hover': { 
                borderColor: '#b91c1c', 
                backgroundColor: 'rgba(220, 38, 38, 0.04)' 
              } 
            }}
          >
            Daha Fazla Yükle
          </Button>
        </Box>
      )}

      {totalPages > 1 && (
        <Box className="flex justify-center py-4">
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handlePageChange}
            color="primary"
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#dc2626',
                '&.Mui-selected': {
                  backgroundColor: '#dc2626',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#b91c1c',
                  }
                }
              }
            }}
          />
        </Box>
      )}
    </>
  );
}
