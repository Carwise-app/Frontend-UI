import { Box, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LearnLoginPage() {
    const navigate = useNavigate();
    const handleGoToBrand = () => (
        navigate("/fiyat-ogren/marka")
    )

  return (
    <Box className='bg-[#f8f8f8] w-[70%] h-auto py-15 my-5 mx-auto rounded-sm'>
        <Box className='flex flex-col gap-y-4'>
            <Box className="bg-white w-[85%] mx-auto py-5 px-10 rounded-md flex flex-col shadow-md ">
                <span className='text-3xl mb-2 text-[#de143c] font-semibold'>Fiyat Öğren Nedir?</span>
                <span className='text-sm text-gray-600 tracking-wide'>
                    CARWISE’ın Fiyat Öğren özelliği sayesinde artık “Arabam ne kadar eder?” sorusu cevapsız kalmayacak.
                    Aracını satmayı mı düşünüyorsun? Ya da sadece aklından “Acaba şimdi ne kadar eder?” diye mi geçirdin?
                    Boya durumu, değişen parçalar, hasar geçmişi ve güncel piyasa koşullarını dikkate alan akıllı algoritmamız sayesinde araç değerini saniyeler içinde öğrenebilirsin.
                    Gereksiz sorularla zaman kaybetme CARWISE her zaman yanında.
                </span>
            </Box>
            <Box className="bg-white w-[85%] mx-auto py-5 px-10 rounded-md flex flex-col shadow-md ">
                <span className='text-3xl mb-2 text-[#de143c] font-semibold'>Aracının Fiyatı Nasıl Hesaplanır?</span>
                <span className='text-sm text-gray-600 tracking-wide'>
                    CARWISE Fiyat Öğren özelliği, sadece marka ve model gibi genel bilgilerle yetinmez; 
                    aracınıza özel boya durumu, değişen parçalar ve tramer kaydı gibi detayları da dikkate alır.
                    Hesaplama sürecinde, yüzbinlerce güncel ilan analiz edilir, piyasa koşulları ve arz-talep dengesi de göz önünde bulundurulur.
                    Bu sayede hem alıcıyı hem satıcıyı memnun edecek, gerçekçi ve güvenilir bir referans fiyat sunulur.         
                </span>
            </Box>
        </Box>    
        <Box className='w-[85%] mx-auto'>
            <span className='text-xs text-gray-500'>
                * Bu fiyat, araçların tüketiciden tüketiciye satışında ortaya çıkan ortalama piyasa değeridir. 
                Galeri ya da aracı firmalarla yapılan satışlarda farklılık gösterebilir.
            </span>
        </Box>
        <Box className="w-[85%] mx-auto flex justify-center">
            <button className='
                bg-white px-12 py-4 text-xl font-medium rounded-2xl shadow-md mt-10 cursor-pointer 
                hover:bg-[#dc143c] hover:text-white duration-300'
                onClick={handleGoToBrand}
            >
                Aracının Fiyatını Öğren
            </button>
        </Box>
    </Box>
    
  )
}
