import { Box } from '@mui/material'
import NoAds from './NoAds';
import React from 'react'
import AdsCard from './AdsCard';

//ADSCARD ŞU ANDA YORUM SATIRINDA İF İLE KULLANICININ İLANI YOKSA NOADS VARSA ADSCARD GÖSTERİLECEK.
//BURADA ADSCARD COMPENENTİNE PHOTO - TİTLE - PRİCE - CHİPLABEL - CHİPCOLOR GÖNDERİLECEK VE ADSCARDTA YERİNE KOYULACAK.
export default function YayindaOlmayanlar() {
  return (
    <>
      <NoAds title="Yayında olmayan ilanınız bulunmamakta" desc="Hemen ilan ver ve milyonlarca alıcıya anında ulaş" textBtn="Hemen ilan ver"/>
      {/* <AdsCard/> */}
    </>
  )
}
