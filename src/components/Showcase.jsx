import { Box, Link, Typography, CircularProgress, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import ShowcaseCard, { ShowcaseCardSkeleton } from "./Card";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function ShowcaseArea() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api
      .get("/listing/", {
        params: {
          page: 1,
          limit: 12,
        },
      })
      .then((res) => {
        const initialListings = res.data.listings || [];
        setListings(initialListings);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Vitrin verileri alınamadı:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Box className="py-8 w-full bg-gradient-to-b from-gray-50 to-white md:py-12 lg:py-16">
      {/* Başlık */}
      <Box className="mb-8 text-center md:mb-12">
        <Typography 
          variant="h3" 
          className="mb-2 text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 sm:text-4xl md:text-5xl lg:text-6xl"
        >
          Vitrin
        </Typography>
      </Box>

      {/* Kartlar */}
      <Box className="grid grid-cols-1 gap-6 sm:gap-8 px-4 sm:px-6 md:px-8 gap-y-8 sm:gap-y-10 mx-auto max-w-[1400px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <ShowcaseCardSkeleton key={i} />
            ))
          : listings.map((listing, index) => (
              <Box
                key={listing.id || index}
                onClick={() => navigate(`/arac-detay/${listing.slug}`)}
                className="transition-all duration-300 transform cursor-pointer group hover:scale-105"
              >
                <ShowcaseCard listing={listing} />
              </Box>
            ))}
      </Box>

      {/* Tüm İlanlar Butonu */}
      {!loading && listings.length > 0 && (
        <Box className="py-8 text-center md:py-12">
          <Button
            variant="outlined"
            onClick={() => navigate('/arac-satin-al')}
            className="bg-[#dc143c] hover:bg-[#b01030] text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 "
            sx={{
              '&:hover': {
                background: '#dc143c',
                color: 'white',
                transition: 'all 0.3s ease-in-out ',
              }
            }}
            color="error"
          >
            Tüm İlanlar
          </Button>
        </Box>
      )}
    </Box>
  );
}
