import AdsCard from './AdsCard';
import NoAds from './NoAds'; 
import React from 'react'

//NOADS ŞU ANDA YORUM SATIRINDA İF İLE KULLANICININ İLANI YOKSA NOADS VARSA ADSCARD GÖSTERİLECEK.
//BURADA ADSCARD COMPENENTİNE PHOTO - TİTLE - PRİCE - CHİPLABEL - CHİPCOLOR GÖNDERİLECEK VE ADSCARDTA YERİNE KOYULACAK.

export default function YayindaOlanlar() {
  return (
   <>
    {/* <NoAds title="İlanınız Bulunmamakta" desc="Hemen ilan ver ve milyonlarca alıcıya anında ulaş" textBtn="Hemen ilan ver"/> */}
    <AdsCard/>
   </>
  )
}
