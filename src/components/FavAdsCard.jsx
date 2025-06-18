import { Box, IconButton, Tooltip, Skeleton, Pagination } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import ActiveListingCard from './ActiveListingCard';
import { useNavigate } from 'react-router-dom';
import NoAds from './NoAds';

const PAGE_SIZE = 10;

export default function FavAdsCard({ onFavoriteCountChange }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showShimmer, setShowShimmer] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const fetchFavorites = (pageNum = 1) => {
    setLoading(true);
    api.get('/favorite/', { params: { page: pageNum, limit: PAGE_SIZE } })
      .then(res => {
        setFavorites(res.data.listings || []);
        setTotal(res.data.total || 0);
        if (onFavoriteCountChange) {
          onFavoriteCountChange(res.data.total || 0);
        }
      })
      .catch(err => {
        console.error('Favoriler alınamadı:', err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchFavorites(1);
  }, []);

  useEffect(() => {
    setShowShimmer(false);
    const timer = setTimeout(() => setShowShimmer(true), 1000);
    return () => clearTimeout(timer);
  }, [loading]);

  const handleDelete = (listingId) => {
    api.delete(`/favorite/${listingId}`)
      .then(() => {
        fetchFavorites(page);
      })
      .catch(err => {
        console.error('Favori silinemedi:', err);
      });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    fetchFavorites(value);
  };

  if (loading && !showShimmer) {
    return null;
  }

  if (loading && showShimmer) {
    return (
      <Box className="flex flex-col gap-2">
        {[...Array(4)].map((_, i) => (
          <Box key={i} className="flex items-center gap-2 p-2 rounded-xl bg-white border border-gray-100">
            <Skeleton variant="rectangular" width={120} height={70} className="rounded" />
            <Skeleton variant="text" width={120} height={28} />
            <Skeleton variant="text" width={220} height={28} />
            <Skeleton variant="text" width={60} height={28} />
            <Skeleton variant="text" width={80} height={28} />
            <Skeleton variant="circular" width={32} height={32} />
          </Box>
        ))}
      </Box>
    );
  }

  if (!loading && total === 0) {
    return (
      <>
        <NoAds
          title="Favori İlanınız Yok"
          desc="Henüz favori ilan eklemediniz."
          textBtn="Araçlara Göz Atın"
          onClick={() => navigate('/arac-satin-al')}
        />
      </>
    );
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <Box className="flex flex-col gap-2 mb-8">
        {favorites.map((fav) => (
          <Box key={fav.id} className="relative group">
            <ActiveListingCard
              listing={fav}
              onClick={() => navigate(`/arac-detay/${fav.slug}`)}
            />
            <Tooltip title="Favorilerden Kaldır" arrow placement="left">
              <IconButton
                onClick={e => {
                  e.stopPropagation();
                  handleDelete(fav.id);
                }}
                className="!absolute right-2 top-2 z-10"
                size="small"
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 12,
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  color: '#dc143c',
                  boxShadow: 'none',
                  transition: 'background 0.2s',
                  '&:hover': {
                    background: '#f3f4f6',
                    borderColor: '#dc143c',
                  },
                }}
              >
                <ClearIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
          </Box>
        ))}
      </Box>
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
    </>
  );
}