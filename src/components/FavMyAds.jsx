import React from 'react'
import ControlPanelHeader from './ControlPanelHeader'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Outlet } from 'react-router-dom';
import NoAds from './NoAds';
import { Box } from '@mui/material';
import FavAdsCard from './FavAdsCard';

export default function FavMyAds() {
  return (
    <>
    <ControlPanelHeader icon={<StarBorderIcon sx={{fontSize:115,color:'black',opacity:0.1,marginRight:1}}/>} title="Favori İlanlarım" description="Beğendiğiniz veya takip etmek istediğiniz ilanları burada görebilirsiniz." />
    <Box className="mt-5">
      {/* <NoAds title="Favori ilanınız bulunmamakta" desc="Beğendiğin ilanları favorilerine ekle ve hepsine buradan ulaş" textBtn="İlanlara Göz At"/> */}
      <FavAdsCard/>
    </Box>
    </>
  )
}
