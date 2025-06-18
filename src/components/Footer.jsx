import { Box, Link, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import AboutUsDialog from "./AboutUsDialog";
import ContactDialog from "./ContactDialog";
import PrivacyDialog from "./PrivacyDialog";
import NewsDialog from "./NewsDialog";
import SafeShoppingDialog from "./SafeShoppingDialog";
import { useNavigate } from "react-router-dom";

export default function Footer(){
    const [openAboutUs, setOpenAboutUs] = useState(false);
    const [openContact, setOpenContact] = useState(false);
    const [openPrivacy, setOpenPrivacy] = useState(false);
    const [openNews, setOpenNews] = useState(false);
    const [openSafeShopping, setOpenSafeShopping] = useState(false);
    const navigate = useNavigate();

    const handleOpenAboutUs = () => setOpenAboutUs(true);
    const handleCloseAboutUs = () => setOpenAboutUs(false);
    const handleOpenContact = () => setOpenContact(true);
    const handleCloseContact = () => setOpenContact(false);
    const handleOpenPrivacy = () => setOpenPrivacy(true);
    const handleClosePrivacy = () => setOpenPrivacy(false);
    const handleOpenNews = () => setOpenNews(true);
    const handleCloseNews = () => setOpenNews(false);
    const handleOpenSafeShopping = () => setOpenSafeShopping(true);
    const handleCloseSafeShopping = () => setOpenSafeShopping(false);

    return(
        <Box className="px-4 bg-gray-200 sm:px-8 md:px-16 lg:px-30">
            <Stack className="pt-8 mb-6 text-2xl font-semibold sm:text-3xl sm:mb-8 sm:pt-10">
                CARWISE
            </Stack>
            
           
            <Box className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 sm:gap-8 lg:gap-20">
                
                <Box className="flex flex-col gap-y-2">
                    <span className="text-lg font-semibold sm:text-xl lg:text-2xl">Gizlilik ve Kullanım</span>
                    <Link 
                        component="button" 
                        onClick={handleOpenSafeShopping} 
                        underline="none" 
                        className="p-0 m-0 text-left hover:text-[#dc143c] transition-colors"
                    >
                        <span className="text-sm text-gray-700 sm:text-base">Güvenli Alışverişin İpuçları</span>
                    </Link>
                    <Link 
                        component="button" 
                        onClick={handleOpenPrivacy} 
                        underline="none" 
                        className="p-0 m-0 text-left hover:text-[#dc143c] transition-colors"
                    >
                        <span className="text-sm text-gray-700 sm:text-base">Kişisel Verilerin Korunması</span>
                    </Link>                                         
                </Box>

                <Box className="flex flex-col gap-y-2">
                    <span className="text-2xl">Hizmetlerimiz</span>
                    <span className="text-sm text-gray-700 cursor-pointer" onClick={() => navigate('/fiyat-ogren')}>Arabamın Fiyatı Ne Kadar?</span>
                    <span className="text-sm text-gray-700 cursor-pointer" onClick={() => navigate('/arac-satin-al')}>Araç Al</span>
                    <span className="text-sm text-gray-700 cursor-pointer" onClick={() => navigate('/ilan-olustur/marka')}>İlan Ver</span>
                </Box>

                <Box className="flex flex-col gap-y-2">
                    <span className="text-lg font-semibold sm:text-xl lg:text-2xl">Kurumsal</span>
                    <Link 
                        component="button" 
                        onClick={handleOpenAboutUs} 
                        underline="none" 
                        className="p-0 m-0 text-left hover:text-[#dc143c] transition-colors"
                    >
                        <span className="text-sm text-gray-700 sm:text-base">Hakkımızda</span>
                    </Link>
                    <Link 
                        component="button" 
                        onClick={handleOpenNews} 
                        underline="none" 
                        className="p-0 m-0 text-left hover:text-[#dc143c] transition-colors"
                    >
                        <span className="text-sm text-gray-700 sm:text-base">Haberler</span>
                    </Link>
                    <Link 
                        component="button" 
                        onClick={handleOpenContact} 
                        underline="none" 
                        className="p-0 m-0 text-left hover:text-[#dc143c] transition-colors"
                    >
                        <span className="text-sm text-gray-700 sm:text-base">İletişim</span>
                    </Link>
                </Box>
            </Box>

            <hr className="mt-6 w-full border-t border-gray-600 sm:mt-8"/>
            <span className="flex justify-center mt-2 text-xs tracking-wide text-gray-600 sm:text-sm">
                Tüm Haklar CARWİSE Şirketine Aittir.
            </span>
            
            <AboutUsDialog 
                open={openAboutUs}
                onClose={handleCloseAboutUs}
            />
            <ContactDialog 
                open={openContact}
                onClose={handleCloseContact}
            />
            <PrivacyDialog 
                open={openPrivacy}
                onClose={handleClosePrivacy}
            />
            <NewsDialog 
                open={openNews}
                onClose={handleCloseNews}
            />
            <SafeShoppingDialog 
                open={openSafeShopping}
                onClose={handleCloseSafeShopping}
            />
        </Box>
    )
}