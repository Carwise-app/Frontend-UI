import { Box, Link, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import AboutUsDialog from "./AboutUsDialog";
import ContactDialog from "./ContactDialog";
import PrivacyDialog from "./PrivacyDialog";
import NewsDialog from "./NewsDialog";
import SafeShoppingDialog from "./SafeShoppingDialog";

export default function Footer(){
    const [openAboutUs, setOpenAboutUs] = useState(false);
    const [openContact, setOpenContact] = useState(false);
    const [openPrivacy, setOpenPrivacy] = useState(false);
    const [openNews, setOpenNews] = useState(false);
    const [openSafeShopping, setOpenSafeShopping] = useState(false);

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
        <Box className="bg-gray-200  px-30">
            <Stack className="text-3xl font-semibold mb-8 pt-10">
                CARWISE
            </Stack>
            <Box className="flex gap-20">
                <Box className="flex flex-col gap-y-2">
                    <span className="text-2xl ">Gizlilik ve Kullanım</span>
                    <Link component="button" onClick={handleOpenSafeShopping} underline="none" className="p-0 m-0 text-left"><span className="text-gray-700 text-sm">Güvenli Alışverişin İpuçları</span></Link>
                    <Link component="button" onClick={handleOpenPrivacy} underline="none" className="p-0 m-0 text-left"><span className="text-gray-700 text-sm">Kişisel Verilerin Korunması</span></Link>                                         
                </Box>
                <Box className="flex flex-col gap-y-2">
                    <span className="text-2xl ">Hizmetlerimiz</span>
                    <span className="text-gray-700 text-sm">Arabamın Fiyatı Ne Kadar?</span>
                    <span className="text-gray-700 text-sm">Araç Al</span>
                    <span className="text-gray-700 text-sm">İlan Ver</span>
                </Box>
                <Box className="flex flex-col gap-y-2">
                    <span className="text-2xl ">Kurumsal</span>
                    <Link component="button" onClick={handleOpenAboutUs} underline="none" className="p-0 m-0 text-left"><span className="text-gray-700 text-sm">Hakkımızda</span></Link>
                    <Link component="button" onClick={handleOpenNews} underline="none" className="p-0 m-0 text-left"><span className="text-gray-700 text-sm">Haberler</span></Link>
                    <Link component="button" onClick={handleOpenContact} underline="none" className="p-0 m-0 text-left"><span className="text-gray-700 text-sm">İletişim</span></Link>
                </Box>
            </Box>
            <hr className="border-t border-gray-600 w-full mt-8"/>
            <span className="flex justify-center mt-2 text-sm tracking-wide">Tüm Haklar CARWİSE Şirketine Aittir.</span>

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