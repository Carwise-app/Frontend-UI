import { Avatar, Box, IconButton, Menu, MenuItem, Stack } from '@mui/material';
import React, { useState } from 'react';
import LoginAccount from './LoginAccount';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import api from '../api/axios';


export default function AppBar({onOpenClick, isLoggedIn, onLogout, setIsLoggedIn}) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation()
  const hideFooterRoutes = ['/kokpit', '/fiyat-ogren'];
  const shouldHideFooter = hideFooterRoutes.some(path => location.pathname.startsWith(path));
  const isKokpitOrFiyatOgren = location.pathname.startsWith('/kokpit') || location.pathname.startsWith('/fiyat-ogren');
  const [user, setUser] = useState(null);

  const handleSearch = () => {
  if (searchValue.trim() !== '') {
    navigate(`/arac-satin-al?q=${encodeURIComponent(searchValue.trim())}`);
    setSearchValue('');
  }
};
 
  const handleGoToFiyatOgren = () => (
    navigate('/fiyat-ogren')
  );
  const handleGoToIlanVer = () => (
    navigate('/ilan-olustur/marka')
  )

  const token = localStorage.getItem("access_token");
   useEffect(() => {
    const fetchUser = async () => {
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
    };
    fetchUser();
  }, []);

  return (
    <>
    <Box className={`bg-[#FDFDFD] w-full h-18 shadow-md flex items-center ${isKokpitOrFiyatOgren ? `justify-between px-[7%]`:`justify-around`}`}>
      <Box className='flex gap-28'>
        <NavLink to="/">
          <p className='text-[32px] text-black  font-serif font-black cursor-pointer tracking-wide'>CARWISE</p>
        </NavLink>
        {!shouldHideFooter &&
          <Box className='flex bg-gray-200 rounded w-90'>
            <input 
              type="search" 
              id='search' 
              name='search'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
              placeholder='Kelime, ilan numarası veya satıcı adı ara' 
              className='w-full px-4 py-2 text-sm text-black bg-transparent border-none outline-none focus:outline-none'
              />
              <button className='rounded bg-[#dc143c] px-6 py-2 text-white cursor-pointer' onClick={handleSearch}>
                Ara
              </button>
          </Box>
        }
      </Box>
      <Box className='flex items-center gap-8 text-lg cursor-pointer '>
        {!shouldHideFooter && 
          <>
              <NavLink to="/arac-satin-al">
                <span className="relative group ">
                  Araç Al
                  <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#dc143c] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </NavLink>
              <span className="relative group " onClick={isLoggedIn ? (handleGoToIlanVer) : () => onOpenClick("login")}>
                İlan Ver
                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#dc143c] transition-all duration-300 group-hover:w-full"></span>
              </span>
              <span className="relative group" onClick={isLoggedIn ? (handleGoToFiyatOgren) : () => onOpenClick("login")}>
                Fiyat Öğren
                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#dc143c] transition-all duration-300 group-hover:w-full"></span>
              </span>
          </>
        }
            {isLoggedIn ? (
              <LoginAccount onLogout={onLogout} fullName={user ? `${user?.first_name} ${user?.last_name.slice(0,1).toUpperCase()}` : " "}/>
            ): (
              <button className='bg-[#dc143c] px-4 py-2 rounded-xl text-white cursor-pointer' onClick={() => onOpenClick("login","notLogin")}>
                Giriş Yap
              </button>           
            )}
      </Box>
    </Box>
    </>
  );
}