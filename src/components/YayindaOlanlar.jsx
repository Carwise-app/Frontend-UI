import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Pagination, Typography } from '@mui/material';
import NoAds from './NoAds';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import ActiveListingCard from './ActiveListingCard';

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

export default function YayindaOlanlar() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  const fetchUserListings = (pageNum = 1) => {
    setLoading(true);

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
      return;
    }

    api.get(`/listing/?created_by=${userId}`, {
      params: {
        page: pageNum,
        limit: 10,
        status: 1 // Yayında olan ilanlar
      }
    })
    .then(res => {
      const newListings = res.data.listings || [];
      setListings(newListings);
      setTotalCount(res.data.total || 0);
      setTotalPages(Math.ceil((res.data.total || 0) / 10));
      setLoading(false);
    })
    .catch(err => {
      console.error("Kullanıcı ilanları alınamadı:", err);
      setLoading(false);
    });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    fetchUserListings(value);
  };

  const handleEdit = (listing) => {
    // TODO: Implement edit functionality
    console.log('Edit listing:', listing);
  };

  const handleToggleStatus = (listing) => {
    // TODO: Implement status toggle functionality
    console.log('Toggle status for listing:', listing);
  };

  const handleDelete = (listing) => {
    // TODO: Implement delete functionality
    console.log('Delete listing:', listing);
  };

  useEffect(() => {
    fetchUserListings(1);
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
        title="İlanınız Bulunmamakta" 
        desc="Hemen ilan ver ve milyonlarca alıcıya anında ulaş" 
        textBtn="Hemen ilan ver"
        onClick={() => navigate('/ilan-olustur/marka')}
      />
    );
  }

  return (
    <>
      <Box className="mb-6">
        <Typography variant="h6" className="text-gray-700 font-semibold">
          Toplam {totalCount} aktif ilanınız bulunmaktadır
        </Typography>
      </Box>
      
      <Box className="flex flex-col gap-4 mb-8">
        {listings.map((listing, index) => (
          <ActiveListingCard
            key={listing.id || index}
            listing={listing}
            onEdit={handleEdit}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDelete}
          />
        ))}
      </Box>

      {totalPages > 1 && (
        <Box className="flex justify-center">
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handlePageChange}
            color="primary"
            size="large"
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#dc2626',
                fontSize: '1rem',
                fontWeight: '500',
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                  color: 'white',
                  fontWeight: 'bold',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)',
                  }
                },
                '&:hover': {
                  backgroundColor: 'rgba(220, 38, 38, 0.08)',
                }
              }
            }}
          />
        </Box>
      )}
    </>
  );
}
