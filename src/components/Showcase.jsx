import { Box, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ShowcaseCard from "./Card";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function ShowcaseArea() {
  const [showAll, setShowAll] = useState(false);
  const [listings, setListings] = useState([]);
  const [randomExtras, setRandomExtras] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/listing/", {
        params: {
          page: 1,
          limit: 100,
        },
      })
      .then((res) => {
        setListings(res.data.listings || []);
      })
      .catch((err) => {
        console.error("Vitrin verileri alınamadı:", err);
      });
  }, []);

  const handleShowMore = () => {
    // İlk 4'ü dışarıda tut, geri kalanlar içinden rastgele 8 tanesini seç
    const remaining = listings.slice(4);
    const shuffled = [...remaining].sort(() => 0.5 - Math.random());
    const selectedExtras = shuffled.slice(0, 8);
    setRandomExtras(selectedExtras);
    setShowAll(prev => !prev);
  };

  // Gösterilecek veriler:
  const firstFour = listings.slice(0, 4);
  const visibleListings = showAll ? [...firstFour, ...randomExtras] : firstFour;

  return (
    <Box className="m-10">
      {/* Başlık */}
      <Typography variant="h3" className="flex justify-center pb-10">
        Vitrin
      </Typography>

      {/* Kartlar */}
      <Box className="grid grid-cols-4 gap-5 px-5">
        {visibleListings.map((listing, index) => (
          <Box key={index} onClick={() => navigate(`/arac-detay/${listing.slug}`)} className="cursor-pointer">
            <ShowcaseCard listing={listing} />
          </Box>
        ))}
      </Box>

      {listings.length > 12 &&  (
        <Box className="flex justify-center mt-3">
          <button
            onClick={handleShowMore}
            className="text-xl rounded-4xl px-8 py-2 cursor-pointer mt-3
              border-2 border-gray-400 text-gray-400 hover:bg-[#dc143c] hover:border-[#dc143c] hover:text-white transition"
          >
            {!showAll ? "Daha Fazlası" : "Gizle"}
          </button>
        </Box>
      )}
    </Box>
  );
}
