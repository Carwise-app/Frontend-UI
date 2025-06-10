import { Box, Link, Stack, Typography } from "@mui/material";
import React from "react";

export default function Footer(){
    return(
        <Box className="bg-gray-200  px-30">
            <Stack className="text-3xl font-semibold mb-8 pt-10">
                CARWISE
            </Stack>
            <Box className="flex gap-20">
                <Box className="flex flex-col gap-y-2">
                    <span className="text-2xl ">Gizlilik ve Kullanım</span>
                    <Link href="#" underline="none"><span className="text-gray-700 text-sm">Güvenli Alışverişin İpuçları</span></Link>
                    <Link href="#" underline="none"><span className="text-gray-700 text-sm">Kişisel Verilerin Korunması</span></Link>                                         
                </Box>
                <Box className="flex flex-col gap-y-2">
                    <span className="text-2xl ">Hizmetlerimiz</span>
                    <Link href="#" underline="none"><span className="text-gray-700 text-sm">Arabamın Fiyatı Ne Kadar?</span></Link>
                    <Link href="#" underline="none"><span className="text-gray-700 text-sm">Premium Hesap</span></Link>
                    <Link href="#" underline="none"><span className="text-gray-700 text-sm">İlanı Öne Çıkarma</span></Link>
                </Box>
                <Box className="flex flex-col gap-y-2">
                    <span className="text-2xl ">Kurumsal</span>
                    <Link href="#" underline="none"><span className="text-gray-700 text-sm">Hakkımızda</span></Link>
                    <Link href="#" underline="none"><span className="text-gray-700 text-sm">Haberler</span></Link>
                    <Link href="#" underline="none"><span className="text-gray-700 text-sm">İletişim</span></Link>
                </Box>
            </Box>
            <hr className="border-t border-gray-600 w-full mt-8"/>
            <span className="flex justify-center mt-2 text-sm tracking-wide">Tüm Haklar CARWİSE Şirketine Aittir.</span>
        </Box>
    )
}