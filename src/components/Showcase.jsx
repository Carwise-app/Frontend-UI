import { Box, Link, Typography, CircularProgress } from "@mui/material";
import React, { useEffect, useState, useRef, useCallback } from "react";
import ShowcaseCard from "./Card";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function ShowcaseArea() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const observerRef = useRef();
  const loadingRef = useRef();

  // Intersection Observer callback
  const lastElementRef = useCallback(node => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loadingMore) {
        loadMore();
      }
    });
    if (node) observerRef.current.observe(node);
  }, [loading, hasMore, loadingMore]);

  const loadMore = () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    
    api.get("/listing/", {
      params: {
        page: nextPage,
        limit: 10,
      },
    })
    .then((res) => {
      const newListings = res.data.listings || [];
      setListings(prev => [...prev, ...newListings]);
      setHasMore(newListings.length > 0 && listings.length + newListings.length < total);
      setLoadingMore(false);
    })
    .catch((err) => {
      console.error("Daha fazla veri alınamadı:", err);
      setLoadingMore(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    api
      .get("/listing/", {
        params: {
          page: 1,
          limit: 10,
        },
      })
      .then((res) => {
        const initialListings = res.data.listings || [];
        setListings(initialListings);
        setTotal(res.data.total || 0);
        setHasMore(initialListings.length > 0 && initialListings.length < (res.data.total || 0));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Vitrin verileri alınamadı:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Box className="w-full bg-gradient-to-b from-gray-50 to-white py-8 md:py-12 lg:py-16">
      {/* Başlık */}
      <Box className="text-center mb-8 md:mb-12">
        <Typography 
          variant="h3" 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2"
        >
          Vitrin
        </Typography>
      </Box>

      {/* Kartlar */}
      <Box className="grid grid-cols-1 gap-6 sm:gap-8 px-4 sm:px-6 md:px-8 gap-y-8 sm:gap-y-10 mx-auto max-w-[1400px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          <Box className="col-span-full flex justify-center py-12">
            <CircularProgress color="error" />
          </Box>
        ) : (
          listings.map((listing, index) => {
            if (listings.length === index + 1) {
              return (
                <Box 
                  key={listing.id || index} 
                  ref={lastElementRef}
                  onClick={() => navigate(`/arac-detay/${listing.slug}`)}
                  className="cursor-pointer group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <ShowcaseCard listing={listing} />
                </Box>
              );
            } else {
              return (
                <Box 
                  key={listing.id || index} 
                  onClick={() => navigate(`/arac-detay/${listing.slug}`)}
                  className="cursor-pointer group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <ShowcaseCard listing={listing} />
                </Box>
              );
            }
          })
        )}
      </Box>

      {/* Loading indicator */}
      {loadingMore && (
        <Box className="flex justify-center py-8">
          <CircularProgress size={32} color="error" />
        </Box>
      )}

      {/* Toplam sayı göster */}
      {!loading && listings.length > 0 && (
        <Box className="text-center py-6 md:py-8">
          <Typography className="text-gray-600 text-sm md:text-base">
            <span className="font-semibold text-[#dc143c]">{listings.length}</span> / {total} araç gösteriliyor
          </Typography>
        </Box>
      )}
    </Box>
  );
}
