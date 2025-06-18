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
    <Box className="w-full">
      {/* Başlık */}
      <Typography variant="h3" className="flex justify-center pb-6 text-2xl sm:pb-8 md:pb-10 sm:text-3xl md:text-4xl lg:text-5xl">
        Vitrin
      </Typography>

      {/* Kartlar */}
      <Box className="grid grid-cols-1 gap-x-5 px-2 gap-y-6 mx-auto max-w-[1300px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:px-4 md:px-6">
        {loading ? (
          <Box className="col-span-full flex justify-center py-8">
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
                  className="cursor-pointer"
                >
                  <ShowcaseCard listing={listing} />
                </Box>
              );
            } else {
              return (
                <Box 
                  key={listing.id || index} 
                  onClick={() => navigate(`/arac-detay/${listing.slug}`)} 
                  className="cursor-pointer"
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
        <Box className="flex justify-center py-4">
          <CircularProgress size={32} color="error" />
        </Box>
      )}

      {/* Toplam sayı göster */}
      {!loading && listings.length > 0 && (
        <Box className="text-center py-4 text-gray-600">
          {listings.length} / {total} araç gösteriliyor
        </Box>
      )}
    </Box>
  );
}
