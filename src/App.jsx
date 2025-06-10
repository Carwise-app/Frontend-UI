import { Routes, Route } from 'react-router-dom';
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
import AuthDialog from './components/AuthDialog';

// ÇALIŞMADAKİ YORUM SATIRLARI YAPILACAK İŞLERİ TEMSİL ETMEKTEDİR. YAPILMASI GEREKENLER YAPILMADAN YORUM SATIRINI SİLMEYİN !!!
// YAPILDIKTAN SONRA İSE SİLMEYİ UNUTMAYIN.

export default function App() {
  const [authOpen, setAuthOpen] = useState(false)  
  const [authView, setAuthView ] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // opsiyonel

  const handleOpenClick = (mode) => {
    setAuthView(mode)
    setAuthOpen(true)
  } 

  const handleLoginSuccess = (userData) => {
    // Burada login olmuş gibi işaretliyoruz
    setIsLoggedIn(true);
    setUser(userData); // opsiyonel → { name, email, picture }
    setAuthOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };


  return (
    <>
    <AppBar onOpenClick={handleOpenClick} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout}/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/arac-satin-al'>
        <Route index element={<SearchCar/>}/>
        <Route path=':brand' element={<SearchCar/>}/>
        {/*:brand route kısmı card verileri dinamik olarak çekildikten sonra düzeltilecektir 
         ve sadece cardList filtrelenerek güncellenecektir.
        */}
      </Route>
      <Route path='/fiyat-ogren' element={<LearnPrice/>}>
          <Route index element={<LearnLoginPage/>}/>
          <Route path="marka" element={<LearnMainPage/>}/>
          <Route path="yil" element={<LearnMainPage />} />
          <Route path="model" element={<LearnMainPage />} />
          <Route path="renk" element={<LearnMainPage />} />
          <Route path="yakit-tipi" element={<LearnMainPage />} />
          <Route path="vites-tipi" element={<LearnMainPage />} />
      </Route>
    </Routes>
    <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} view={authView} setView={setAuthView} onLoginSuccess={handleLoginSuccess}/>
    <Footer/>

    
    
    </>
   
  )
}


