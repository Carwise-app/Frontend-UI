import { Routes, Route, useLocation } from 'react-router-dom'
import AppBar from './components/AppBar'
import MainPageBanner from './components/Banner'
import BlinkingScrollHint from './components/Scroll'
import React, { useState, useEffect } from 'react'
import ShowcaseArea from './components/Showcase'
import Footer from './components/Footer'
import HomePage from './pages/Home'
import LearnPrice from './pages/LearnPrice'
import SearchCar from './pages/SearchCar'
import LearnMainPage from './components/LearnMainPage'
import LearnLoginPage from './components/LearnLoginPage'
import AuthDialog from './components/AuthDialog'
import { AnimatePresence } from 'framer-motion';
import SnackbarAlert from './components/SnackbarAlert'
import api from './api/axios' // api importu
import Kokpit from './pages/Kokpit';
import QuickTransactions from './components/QuickTransactions'
import MyAds from './components/MyAds'
import FavMyAds from './components/FavMyAds'
import MyMessages from './components/MyMessages'
import ProfileAndSettings from './components/ProfileAndSettings'

// ÇALIŞMADAKİ YORUM SATIRLARI YAPILACAK İŞLERİ TEMSİL ETMEKTEDİR. YAPILMASI GEREKENLER YAPILMADAN YORUM SATIRINI SİLMEYİN !!!
// YAPILDIKTAN SONRA İSE SİLMEYİ UNUTMAYIN.
//GPT'den OLAN YORUM SATIRLARINI KALDIR BE ADAM ERENSARIALP'E MESAJ :d

export default function App() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authView, setAuthView] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [user, setUser] = useState(null); // opsiyonel
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');

  // Giriş sonrası snackbar gösterme fonksiyonu
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // Login/Register modalını açar
  const handleOpenClick = (mode, id) => {
    setAuthView(mode)
    setAuthOpen(true)
    if (id !== "login-bton") {
      showSnackbar('Bu işlemi yapmak için giriş yapınız.', 'error')
    }
  }

  // Başarılı giriş sonrası yapılacaklar
  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    //setUser(userData);
    setAuthOpen(false);
  };

  // Çıkış işlemi
  const handleLogout = () => {
    setIsLoggedIn(false);
    //setUser(null);
    localStorage.removeItem("token");
  };

  // Sayfa yenilendiğinde token varsa kullanıcıyı kontrol et
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/auth/profile')
        .then(() => {
          setIsLoggedIn(true);
          // setUser(response.data); // Kullanıcı verisi tutulmak istenirse açılabilir
        })
        .catch(() => {
          setIsLoggedIn(false);
          localStorage.removeItem("token");
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
            {/* :brand route kısmı card verileri dinamik olarak çekildikten sonra düzeltilecektir 
                ve sadece cardList filtrelenerek güncellenecektir.
            */}
          </Route>
          <Route path='/fiyat-ogren' element={<LearnPrice isLoggedIn={isLoggedIn} />}>
            <Route index element={<LearnLoginPage />} />
            <Route path="marka" element={<LearnMainPage />} />
            <Route path="yil" element={<LearnMainPage />} />
            <Route path="model" element={<LearnMainPage />} />
            <Route path="renk" element={<LearnMainPage />} />
            <Route path="yakit-tipi" element={<LearnMainPage />} />
            <Route path="vites-tipi" element={<LearnMainPage />} />
          </Route>
          <Route path='/kokpit' element={<Kokpit/>}>
              <Route index element={<QuickTransactions/>}/>
              <Route path='ilan' element={<MyAds/>}/>
              <Route path='fav-ilan' element={<FavMyAds/>}/>
              <Route path='mesajlarim' element={<MyMessages/>}/>
              <Route path='profil-ve-ayarlar' element={<ProfileAndSettings/>}/>
          </Route>
        </Routes>
      </AnimatePresence>
      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />
      <AuthDialog
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        view={authView}
        setView={setAuthView}
        onLoginSuccess={handleLoginSuccess}
      />
      <Footer />
    </>
  );
}
