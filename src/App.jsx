import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import AppBar from './components/AppBar';
import MainPageBanner from './components/Banner';
import BlinkingScrollHint from './components/Scroll';
import React, { useState, useEffect } from 'react';
import ShowcaseArea from './components/Showcase';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import LearnPrice from './pages/LearnPrice';
import SearchCar from './pages/SearchCar';
import LearnMainPage from './components/LearnMainPage';
import LearnLoginPage from './components/LearnLoginPage';
import AuthDialog from './components/AuthDialog';
import { AnimatePresence } from 'framer-motion';
import api from './api/axios';
import Kokpit from './pages/Kokpit';
import QuickTransactions from './components/QuickTransactions';
import MyAds from './components/MyAds';
import FavMyAds from './components/FavMyAds';
import MyMessages from './components/MyMessages';
import ProfileAndSettings from './components/ProfileAndSettings';
import YayindaOlanlar from './components/YayindaOlanlar';
import YayindaOlmayanlar from './components/YayindaOlmayanlar';
import { useSnackbar } from './context/SnackbarContext';
import ResetPassword from './pages/ResetPassword';
import CreateAdverts from './pages/CreateAdverts';

export default function App() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authView, setAuthView] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const location = useLocation();
  const { showSnackbar } = useSnackbar();
  const hideFooterRoutes = ['/kokpit', '/fiyat-ogren', '/sifre-yenile', '/ilan-olustur'];
  const shouldHideFooter = hideFooterRoutes.some(path => location.pathname.startsWith(path));
  const navigate = useNavigate()

  const handleOpenClick = (mode, id) => {
    setAuthView(mode);
    setAuthOpen(true);
    if (id !== "notLogin") {
      showSnackbar('Bu işlemi yapmak için giriş yapınız.', 'error');
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setAuthOpen(false);
    showSnackbar("Giriş başarılı!", "success");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("access_token");
    showSnackbar("Çıkış yapıldı.", "info");
    navigate("/")
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      api.get('/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(() => {
          setIsLoggedIn(true);
        })
        .catch(() => {
          setIsLoggedIn(false);
          // localStorage.removeItem("access_token");
        });
    }
  }, []);

  return (
    <>
      <AppBar onOpenClick={handleOpenClick} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <AnimatePresence mode='wait'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/arac-satin-al'>
            <Route index element={<SearchCar />} />
            <Route path=':brand' element={<SearchCar />} />
          </Route>
          <Route path='/fiyat-ogren' element={<LearnPrice isLoggedIn={isLoggedIn} />}>
            <Route index element={<LearnLoginPage />} />
            <Route path="marka" element={<LearnMainPage />} />
            <Route path="yil" element={<LearnMainPage />} />
            <Route path="model" element={<LearnMainPage />} />
            <Route path="govde-tipi" element={<LearnMainPage />} />
            <Route path="renk" element={<LearnMainPage />} />
            <Route path="yakit-tipi" element={<LearnMainPage />} />
            <Route path="vites-tipi" element={<LearnMainPage />} />
            <Route path="km" element={<LearnMainPage />} />
            <Route path="hasar" element={<LearnMainPage />} />
            <Route path="sonuc" element={<LearnMainPage />} />
          </Route>
          <Route path='/kokpit' element={<Kokpit onLogout={handleLogout} />}>
            <Route index element={<QuickTransactions />} />
            <Route path='ilanlarim' element={<MyAds />}>
              <Route index element={<YayindaOlanlar />} />
              <Route path='yayinda-olmayanlar' element={<YayindaOlmayanlar />} />
            </Route>
            <Route path='fav-ilan' element={<FavMyAds />} />
            <Route path='mesajlarim' element={<MyMessages />} />
            <Route path='profil-ve-ayarlar' element={<ProfileAndSettings onOpenClick={handleOpenClick} />} />
          </Route>
          <Route path='/sifre-yenile' element={<ResetPassword />} />
          <Route path='/ilan-olustur' element={<CreateAdverts isLoggedIn={isLoggedIn} />}>
            <Route index path="marka" element={<CreateAdverts />} />
            <Route path="yil" element={<CreateAdverts />} />
            <Route path="model" element={<CreateAdverts />} />
            <Route path="govde-tipi" element={<CreateAdverts />} />
            <Route path="renk" element={<CreateAdverts />} />
            <Route path="yakit-tipi" element={<CreateAdverts />} />
            <Route path="vites-tipi" element={<CreateAdverts />} />
            <Route path="detaylar" element={<CreateAdverts />} />
            <Route path="hasar" element={<CreateAdverts />} />
            <Route path="fiyat-ve-baslik" element={<CreateAdverts />} />
          </Route>
        </Routes>
      </AnimatePresence>

      <AuthDialog
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        view={authView}
        setView={setAuthView}
        onLoginSuccess={handleLoginSuccess}
      />

      {!shouldHideFooter && <Footer />}
    </>
  );
}
