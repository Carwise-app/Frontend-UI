import React, { useState } from 'react';
import ControlPanelHeader from './ControlPanelHeader';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Box, Button, Typography } from '@mui/material';
import FavAdsCard from './FavAdsCard';
import { useNavigate } from 'react-router-dom';
import NoAds from './NoAds';

export default function FavMyAds() {
  const [favCount, setFavCount] = useState(0);
  const navigate = useNavigate();

  return (
    <>
      <ControlPanelHeader
        icon={<StarBorderIcon sx={{ fontSize: 115, color: 'black', opacity: 0.1, marginRight: 1 }} />}
        title="Favori İlanlarım"
        description="Beğendiğiniz veya takip etmek istediğiniz ilanları burada görebilirsiniz."
      />
      <Box className="mt-5">
        <FavAdsCard onFavoriteCountChange={setFavCount} />
      </Box>
    </>
  );
}
