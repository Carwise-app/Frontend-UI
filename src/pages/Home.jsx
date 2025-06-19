import React, { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useSnackbar } from "../context/SnackbarContext";
import MainPageBanner from "../components/Banner"
import BlinkingScrollHint from "../components/Scroll"
import ShowcaseArea from "../components/Showcase"

export default function HomePage({ setIsLoggedIn }){
    const location = useLocation();
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const state = params.get("state");
        const code = params.get("code");
        if (state !== null && code !== null) {
            api.get(`/auth/google/callback?state=${state}&code=${code}`)
                .then(res => {
                    if (res.data && res.data.access_token) {
                        localStorage.setItem("access_token", res.data.access_token);
                        if (setIsLoggedIn) setIsLoggedIn(true);
                        showSnackbar("Google ile giriş başarılı", "success");
                        navigate("/", { replace: true });
                    }
                })
                .catch(() => {
                    showSnackbar("Google ile giriş başarısız", "error");
                });
        }
    }, [location.search, navigate, showSnackbar, setIsLoggedIn]);

    return(
        <>
            <MainPageBanner/>
            <BlinkingScrollHint/>
            <ShowcaseArea/>
        </>
        
    )
}