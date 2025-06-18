import { Avatar, Box, IconButton, Menu, MenuItem, Stack, Drawer, List, ListItem, ListItemText, Divider, Typography } from '@mui/material';
import React, { useState } from 'react';
import LoginAccount from './LoginAccount';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Menu as MenuIcon, Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import api from '../api/axios';

export default function AppBar({onOpenClick, isLoggedIn, onLogout, setIsLoggedIn}) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchMenuOpen, setSearchMenuOpen] = useState(false);
  const location = useLocation()
  const hideFooterRoutes = ['/kokpit', '/fiyat-ogren'];
  const shouldHideFooter = hideFooterRoutes.some(path => location.pathname.startsWith(path));
  const isKokpitOrFiyatOgren = location.pathname.startsWith('/kokpit') || location.pathname.startsWith('/fiyat-ogren');
  const [user, setUser] = useState(null);

  const handleSearch = () => {
    if (searchValue.trim() !== '') {
      navigate(`/arac-satin-al?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue('');
      setSearchMenuOpen(false);
    }
  };

  const handleGoToFiyatOgren = () => {
    navigate('/fiyat-ogren');
    setMobileMenuOpen(false);
  };

  const handleGoToIlanVer = () => {
    navigate('/ilan-olustur/marka');
    setMobileMenuOpen(false);
  };

  const handleGoToAracAl = () => {
    navigate('/arac-satin-al');
    setMobileMenuOpen(false);
  };

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

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleSearchMenu = () => setSearchMenuOpen(!searchMenuOpen);

  return (
    <>
      {/* Desktop/Tablet AppBar */}
      <Box className={`bg-[#FDFDFD] w-full shadow-md flex items-center justify-between px-4 md:px-8 lg:px-12 py-3 ${isKokpitOrFiyatOgren ? 'justify-between' : 'justify-between'}`}>
        {/* Logo */}
        <NavLink to="/" className="flex-shrink-0">
          <p className='text-2xl md:text-3xl lg:text-[32px] text-black font-serif font-black cursor-pointer tracking-wide'>CARWISE</p>
        </NavLink>

        {/* Desktop Navigation */}
        <Box className="hidden gap-6 items-center md:flex lg:gap-8">
          {!shouldHideFooter && (
            <>
              <NavLink to="/arac-satin-al">
                <span className="relative text-base cursor-pointer group lg:text-lg">
                  Araç Al
                  <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#dc143c] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </NavLink>
              <span className="relative text-base cursor-pointer group lg:text-lg" onClick={isLoggedIn ? handleGoToIlanVer : () => onOpenClick("login")}>
                İlan Ver
                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#dc143c] transition-all duration-300 group-hover:w-full"></span>
              </span>
              <span className="relative text-base cursor-pointer group lg:text-lg" onClick={isLoggedIn ? handleGoToFiyatOgren : () => onOpenClick("login")}>
                Fiyat Öğren
                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#dc143c] transition-all duration-300 group-hover:w-full"></span>
              </span>
            </>
          )}
        </Box>

        {/* Desktop Search */}
        {!shouldHideFooter && (
          <Box className="hidden w-80 bg-gray-200 rounded-lg lg:flex">
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
              className='px-4 py-2 w-full text-sm text-black bg-transparent rounded-l-lg border-none outline-none focus:outline-none'
            />
            <button className='rounded-r-lg bg-[#dc143c] px-6 py-2 text-white cursor-pointer hover:bg-[#b01030] transition-colors' onClick={handleSearch}>
              Ara
            </button>
          </Box>
        )}

        {/* Desktop Auth */}
        <Box className="hidden gap-4 items-center md:flex">
          {isLoggedIn ? (
            <LoginAccount onLogout={onLogout} fullName={user ? `${user?.first_name} ${user?.last_name.slice(0,1).toUpperCase()}` : " "}/>
          ) : (
            <button className='bg-[#dc143c] px-4 py-2 rounded-xl text-white cursor-pointer hover:bg-[#b01030] transition-colors text-sm lg:text-base' onClick={() => onOpenClick("login","notLogin")}>
              Giriş Yap
            </button>
          )}
        </Box>

        {/* Mobile Menu Button */}
        <Box className="flex gap-2 items-center md:hidden">
          {!shouldHideFooter && (
            <IconButton onClick={toggleSearchMenu} className="text-gray-600">
              <SearchIcon />
            </IconButton>
          )}
          <IconButton onClick={toggleMobileMenu} className="text-gray-600">
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Mobile Search Drawer */}
      {!shouldHideFooter && (
        <Drawer
          anchor="top"
          open={searchMenuOpen}
          onClose={toggleSearchMenu}
          className="md:hidden"
        >
          <Box className="p-4 bg-white border-b">
            <Box className="flex gap-2 items-center">
              <Box className="flex flex-1 bg-gray-200 rounded-lg">
                <input 
                  type="search" 
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearch();
                  }}
                  placeholder='Kelime, ilan numarası veya satıcı adı ara' 
                  className='px-4 py-3 w-full text-sm text-black bg-transparent rounded-l-lg border-none outline-none'
                />
                <button className='rounded-r-lg bg-[#dc143c] px-4 py-3 text-white cursor-pointer' onClick={handleSearch}>
                  Ara
                </button>
              </Box>
              <IconButton onClick={toggleSearchMenu}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </Drawer>
      )}

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        className="md:hidden"
      >
        <Box className="p-4 w-64">
          <Box className="flex justify-between items-center mb-4">
            <p className="text-xl font-bold text-black">CARWISE</p>
            <IconButton onClick={toggleMobileMenu}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          <List>
            {!shouldHideFooter && (
              <>
                <ListItem button onClick={handleGoToAracAl}>
                  <ListItemText primary="Araç Al" className="text-lg" />
                </ListItem>
                <ListItem button onClick={isLoggedIn ? handleGoToIlanVer : () => onOpenClick("login")}>
                  <ListItemText primary="İlan Ver" className="text-lg" />
                </ListItem>
                <ListItem button onClick={isLoggedIn ? handleGoToFiyatOgren : () => onOpenClick("login")}>
                  <ListItemText primary="Fiyat Öğren" className="text-lg" />
                </ListItem>
                <Divider className="my-2" />
              </>
            )}
            
            <ListItem>
              {isLoggedIn ? (
                <Box className="w-full">
                  <Box className="flex gap-3 items-center mb-3">
                    <Avatar>{user?.first_name ? user.first_name[0] : 'U'}</Avatar>
                    <Box>
                      <Typography className="font-semibold">{user ? `${user?.first_name} ${user?.last_name}` : 'Kullanıcı'}</Typography>
                      <Typography className="text-xs text-gray-500">{user?.email}</Typography>
                    </Box>
                  </Box>
                  <button 
                    className='py-2 w-full text-white bg-red-600 rounded-lg transition-colors hover:bg-red-700'
                    onClick={() => {
                      onLogout();
                      toggleMobileMenu();
                    }}
                  >
                    Çıkış Yap
                  </button>
                </Box>
              ) : (
                <button 
                  className='w-full bg-[#dc143c] text-white py-3 rounded-lg hover:bg-[#b01030] transition-colors text-lg'
                  onClick={() => {
                    onOpenClick("login","notLogin");
                    toggleMobileMenu();
                  }}
                >
                  Giriş Yap
                </button>
              )}
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}