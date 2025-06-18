import React, { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import MainPageBanner from "../components/Banner"
import BlinkingScrollHint from "../components/Scroll"
import ShowcaseArea from "../components/Showcase"
import { Box, CircularProgress, Typography } from '@mui/material';
import api from "../api/axios";

export default function HomePage({ onLoginSuccess }){
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isProcessingGoogleAuth, setIsProcessingGoogleAuth] = useState(false);
    const [googleAuthError, setGoogleAuthError] = useState(null);

    useEffect(() => {
        const handleGoogleCallback = async () => {
            const code = searchParams.get('code');
            const state = searchParams.get('state');

            if (code && state) {
                setIsProcessingGoogleAuth(true);
                try {
                    // Make API request to exchange code for access token
                    const response = await api.get(`/auth/google/callback?code=${code}&state=${state}`);
                    
                    if (response.data.access_token) {
                        // Store the access token
                        localStorage.setItem("access_token", response.data.access_token);
                        
                        // Call the login success callback
                        if (onLoginSuccess) {
                            onLoginSuccess();
                        }
                        
                        // Clear URL parameters
                        navigate('/', { replace: true });
                    } else {
                        setGoogleAuthError('Token alınamadı');
                    }
                } catch (error) {
                    console.error('Google callback error:', error);
                    setGoogleAuthError(error.response?.data?.message || 'Google ile giriş başarısız oldu');
                } finally {
                    setIsProcessingGoogleAuth(false);
                }
            }
        };

        handleGoogleCallback();
    }, [searchParams, navigate, onLoginSuccess]);

    if (isProcessingGoogleAuth) {
        return (
            <Box className="flex flex-col items-center justify-center min-h-screen">
                <CircularProgress size={60} sx={{ color: '#dc143c' }} />
                <Typography className="mt-4 text-lg">Google ile giriş yapılıyor...</Typography>
            </Box>
        );
    }

    if (googleAuthError) {
        return (
            <Box className="flex flex-col items-center justify-center min-h-screen">
                <Typography className="text-red-600 text-lg mb-4">{googleAuthError}</Typography>
                <button 
                    onClick={() => {
                        setGoogleAuthError(null);
                        navigate('/', { replace: true });
                    }}
                    className="bg-[#dc143c] text-white px-6 py-2 rounded-lg hover:bg-[#b01030] transition-colors"
                >
                    Ana Sayfaya Dön
                </button>
            </Box>
        );
    }

    return(
        <>
            <MainPageBanner/>
            <BlinkingScrollHint/>
            <ShowcaseArea/>
        </>
    )
}