import { Routes, Route } from 'react-router-dom'
import AppBar from './components/AppBar'
import MainPageBanner from './components/Banner'
import BlinkingScrollHint from './components/Scroll'
import React, { useState } from 'react'
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
import Kokpit from './pages/Kokpit'

// ÇALIŞMADAKİ YORUM SATIRLARI YAPILACAK İŞLERİ TEMSİL ETMEKTEDİR. YAPILMASI GEREKENLER YAPILMADAN YORUM SATIRINI SİLMEYİN !!!
// YAPILDIKTAN SONRA İSE SİLMEYİ UNUTMAYIN.

export default function App() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authView, setAuthView ] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  //const [user, setUser] = useState(null); // opsiyonel
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');

  const showSnackbar = (message, severity) => {
  setSnackbarMessage(message);
  setSnackbarSeverity(severity);
  setSnackbarOpen(true);
  };

  const handleOpenClick = (mode, id) => {
    setAuthView(mode)
    setAuthOpen(true)
    {if(id !== "login-bton"){
      showSnackbar('Bu işlemi yapmak için giriş yapınız.','error')
    }} 
  } 

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setAuthOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    //setUser(null);
  };


  return (
    <>
    <AppBar onOpenClick={handleOpenClick} isLoggedIn={isLoggedIn} onLogout={handleLogout}/>
    <AnimatePresence mode='wait'>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/arac-satin-al'>
          <Route index element={<SearchCar/>}/>
          <Route path=':brand' element={<SearchCar/>}/>
          {/*:brand route kısmı card verileri dinamik olarak çekildikten sonra düzeltilecektir 
          ve sadece cardList filtrelenerek güncellenecektir.
          */}
        </Route>
        <Route path='/fiyat-ogren' element={<LearnPrice isLoggedIn={isLoggedIn}/>}>
            <Route index element={<LearnLoginPage/>}/>
            <Route path="marka" element={<LearnMainPage/>}/>
            <Route path="yil" element={<LearnMainPage />} />
            <Route path="model" element={<LearnMainPage />} />
            <Route path="renk" element={<LearnMainPage />} />
            <Route path="yakit-tipi" element={<LearnMainPage />} />
            <Route path="vites-tipi" element={<LearnMainPage />} />
        </Route>
        <Route path='/kokpit' element={<Kokpit/>}>
            <Route path='ilan' />
        </Route>
      </Routes>
    </AnimatePresence>
    <SnackbarAlert open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} onClose={()=> setSnackbarOpen(false)}/>
    <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} view={authView} setView={setAuthView} onLoginSuccess={handleLoginSuccess}/>
    {/* <Footer/> */}
    </>
  )
}


