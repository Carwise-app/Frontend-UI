import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AppBar from "./components/AppBar";
import MainPageBanner from "./components/Banner";
import BlinkingScrollHint from "./components/Scroll";
import React, { useState, useEffect } from "react";
import ShowcaseArea from "./components/Showcase";
import Footer from "./components/Footer";
import HomePage from "./pages/Home";
import LearnPrice from "./pages/LearnPrice";
import SearchCar from "./pages/SearchCar";
import LearnMainPage from "./components/LearnMainPage";
import LearnLoginPage from "./components/LearnLoginPage";
import AuthDialog from "./components/AuthDialog";
import { AnimatePresence } from "framer-motion";
import api from "./api/axios";
import Kokpit from "./pages/Kokpit";
import QuickTransactions from "./components/QuickTransactions";
import MyAds from "./components/MyAds";
import FavMyAds from "./components/FavMyAds";
import MyMessages from "./components/MyMessages";
import ChatDetail from "./components/ChatDetail";
import Notifications from "./components/Notifications";
import ProfileAndSettings from "./components/ProfileAndSettings";
import YayindaOlanlar from "./components/YayindaOlanlar";
import YayindaOlmayanlar from "./components/YayindaOlmayanlar";
import { useSnackbar } from "./context/SnackbarContext";
import ResetPasswordKokpit from "./pages/ResetPasswordKokpit";
import CreateAdverts from "./pages/CreateAdverts";
import EditAdverts from "./pages/EditAdverts";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import DashboardKokpit from "./components/DashboardKokpit";
import DashboardUsersKokpit from "./components/DashboardUsersKokpit";
import DashboardBrandsKokpit from "./components/DashboardBrandsKokpit";

export default function App() {
  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authView, setAuthView] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const { showSnackbar } = useSnackbar();
  const hideFooterRoutes = [
    "/kokpit",
    "/fiyat-ogren",
    "/kokpit/reset-password",
    "/giris",
    "/kayit",
    "/sifre-yenile",
    "/ilan-olustur",
    "/ilan-duzenle",
  ];
  const shouldHideFooter = hideFooterRoutes.some((path) =>
    location.pathname.startsWith(path)
  );
  const navigate = useNavigate();

  const handleOpenClick = (mode, id) => {
    setAuthView(mode);
    setAuthOpen(true);
    if (id !== "notLogin") {
      showSnackbar("Bu işlemi yapmak için giriş yapınız.", "error");
    }
  };

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const response = await api.get("/profile/", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error("Profil verisi alınamadı:", error.response?.data || error.message);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
    if (token) {
      fetchUserProfile();
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setAuthOpen(false);
    showSnackbar("Giriş başarılı!", "success");
    fetchUserProfile();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null)
    localStorage.removeItem("access_token");
    showSnackbar("Çıkış yapıldı.", "info");
    navigate("/");
  };

  const handleProfileUpdate = () => {
    fetchUserProfile();
  };

  return (
    <>
      <AppBar
        onOpenClick={handleOpenClick}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        setIsLoggedIn={setIsLoggedIn}
      />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomePage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/arac-satin-al" >
            <Route index element={<SearchCar />} />
            <Route path=":brand" element={<SearchCar />} />
          </Route>
          <Route path="/arac-detay/:id" element={<ProductDetailsPage onOpenClick={handleOpenClick} />} />
          <Route
            path="/fiyat-ogren"
            element={<LearnPrice isLoggedIn={isLoggedIn} />}
          >
            <Route index element={<LearnLoginPage />} />
            <Route path="marka" element={<LearnMainPage />} />
            <Route path="seri" element={<LearnMainPage/>}/>
            <Route path="model" element={<LearnMainPage />} />
            <Route path="yil" element={<LearnMainPage />} />
            <Route path="govde-tipi" element={<LearnMainPage />} />
            <Route path="renk" element={<LearnMainPage />} />
            <Route path="motor-bilgisi" element={<LearnMainPage />} />
            <Route path="yakit-tipi" element={<LearnMainPage />} />
            <Route path="vites-tipi" element={<LearnMainPage />} />
            <Route path="km" element={<LearnMainPage />} />
            <Route path="hasar" element={<LearnMainPage />} />
            <Route path="sonuc" element={<LearnMainPage />} />
          </Route>
          <Route path="/kokpit" element={<Kokpit onLogout={handleLogout} />}>
            <Route index element={<QuickTransactions />} />
            <Route path="dashboard" element={<DashboardKokpit />}>
              <Route index element={<DashboardUsersKokpit />} />
              <Route path="marka" element={<DashboardBrandsKokpit />} />
            </Route>
            <Route path="ilanlarim" element={<MyAds />}>
              <Route index element={<YayindaOlanlar />} />
              <Route
                path="yayinda-olmayanlar"
                element={<YayindaOlmayanlar />}
              />
            </Route>
            <Route path="fav-ilan" element={<FavMyAds />} />
            <Route path="mesajlarim" element={<MyMessages />} />
            <Route path="bildirimlerim" element={<Notifications />} />
            <Route
              path="profil-ve-ayarlar"
              element={<ProfileAndSettings onOpenClick={handleOpenClick} onProfileUpdate={handleProfileUpdate} />}
            />
          </Route>
          <Route path="/sohbet/:receiver_id" element={<ChatDetail />} />
          <Route path="/kokpit/reset-password" element={<ResetPasswordKokpit />} />
          <Route
            path="/ilan-olustur"
            element={<CreateAdverts isLoggedIn={isLoggedIn} />}
          >
            <Route index path="marka" element={<CreateAdverts />} />
            <Route path="yil" element={<CreateAdverts />} />
            <Route path="seri" element={<CreateAdverts />} />
            <Route path="model" element={<CreateAdverts />} />
            <Route path="govde-tipi" element={<CreateAdverts />} />
            <Route path="renk" element={<CreateAdverts />} />
            <Route path="yakit-tipi" element={<CreateAdverts />} />
            <Route path="vites-tipi" element={<CreateAdverts />} />
            <Route path="detaylar" element={<CreateAdverts />} />
            <Route path="hasar" element={<CreateAdverts />} />
            <Route path="fiyat-ve-baslik" element={<CreateAdverts />} />
            <Route path="aciklama" element={<CreateAdverts />} />
            <Route path="konum-bilgisi" element={<CreateAdverts />} />
            <Route path="fotograf-yukle" element={<CreateAdverts />} />
          </Route>
          <Route
            path="/ilan-duzenle/:id"
            element={<EditAdverts isLoggedIn={isLoggedIn} />}
          >
            <Route index path="marka" element={<EditAdverts />} />
            <Route path="yil" element={<EditAdverts />} />
            <Route path="seri" element={<EditAdverts />} />
            <Route path="model" element={<EditAdverts />} />
            <Route path="govde-tipi" element={<EditAdverts />} />
            <Route path="renk" element={<EditAdverts />} />
            <Route path="yakit-tipi" element={<EditAdverts />} />
            <Route path="vites-tipi" element={<EditAdverts />} />
            <Route path="detaylar" element={<EditAdverts />} />
            <Route path="hasar" element={<EditAdverts />} />
            <Route path="fiyat-ve-baslik" element={<EditAdverts />} />
            <Route path="aciklama" element={<EditAdverts />} />
            <Route path="konum-bilgisi" element={<EditAdverts />} />
            <Route path="fotograf-yukle" element={<EditAdverts />} />
          </Route>
        </Routes>
      </AnimatePresence>

      <AuthDialog
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        view={authView}
        setView={setAuthView}
        onLoginSuccess={handleLoginSuccess}
        user={user}
      />

      {!shouldHideFooter && <Footer />}
    </>
  );
}
