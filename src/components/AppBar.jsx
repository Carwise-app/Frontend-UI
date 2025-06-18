import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Badge,
  Tooltip,
  TextField,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import LoginAccount from "./LoginAccount";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Home as HomeIcon,
  DirectionsCar as CarIcon,
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import api from "../api/axios";

// JWT token'ı decode etmek için güvenli fonksiyon
const parseJwt = (token) => {
  try {
    if (!token) return null;
    
    // JWT token'ın payload kısmını al (ikinci kısım)
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    
    // Base64'ten decode et
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('JWT decode hatası:', error);
    return null;
  }
};

export default function AppBar({
  onOpenClick,
  isLoggedIn,
  onLogout,
  setIsLoggedIn,
}) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchMenuOpen, setSearchMenuOpen] = useState(false);
  const location = useLocation();
  const hideFooterRoutes = ["/kokpit", "/fiyat-ogren"];
  const shouldHideFooter = hideFooterRoutes.some((path) =>
    location.pathname.startsWith(path)
  );
  const isKokpitOrFiyatOgren =
    location.pathname.startsWith("/kokpit") ||
    location.pathname.startsWith("/fiyat-ogren");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [unreadCount, setUnreadCount] = useState(0);

  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      navigate(`/arac-satin-al?query=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue("");
      setSearchMenuOpen(false);
    }
  };

  const handleGoToFiyatOgren = () => {
    navigate("/fiyat-ogren");
    setMobileMenuOpen(false);
  };

  const handleGoToIlanVer = () => {
    navigate("/ilan-olustur/marka");
    setMobileMenuOpen(false);
  };

  const handleGoToAracAl = () => {
    navigate("/arac-satin-al");
    setMobileMenuOpen(false);
  };

  const handleGoToKokpit = () => {
    navigate("/kokpit");
    setMobileMenuOpen(false);
  };

  const handleGoToNotifications = () => {
    navigate("/kokpit/bildirimlerim");
    setMobileMenuOpen(false);
  };

  const handleGoToProfile = () => {
    navigate("/kokpit/profil-ve-ayarlar");
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const currentToken = localStorage.getItem("access_token");
    setToken(currentToken);
    
    if (currentToken && isLoggedIn) {
      try {
        const decodedToken = parseJwt(currentToken);
        if (decodedToken) {
          setUser(decodedToken);
        } else {
          console.warn('JWT token decode edilemedi, profil API\'si kullanılacak');
          setUser(null);
        }
      } catch (error) {
        console.error('JWT decode hatası:', error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [isLoggedIn]);

  // Listen for storage changes
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error(
          "Profil verisi alınamadı:",
          error.response?.data || error.message
        );
      }
    };
    fetchUser();
  }, []);

  // Bildirim sayısını API'den al
  useEffect(() => {
    if (isLoggedIn) {
      const fetchUnreadCount = async () => {
        try {
          const response = await api.get('/notification', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUnreadCount(response.data.unread || 0);
        } catch (error) {
          console.error('Bildirim sayısı alınamadı:', error);
          setUnreadCount(0);
        }
      };

      fetchUnreadCount();

      // Her 30 saniyede bir güncelle
      const interval = setInterval(fetchUnreadCount, 30000);

      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleSearchMenu = () => setSearchMenuOpen(!searchMenuOpen);

  return (
    <>
      {/* Desktop/Tablet AppBar */}
      <Box
        className={`w-full flex items-center justify-between px-6 md:px-10 lg:px-16 py-4 ${
          isKokpitOrFiyatOgren 
            ? "shadow-sm backdrop-blur-sm bg-white/95" 
            : "shadow-md backdrop-blur-sm bg-white/95"
        } border-b border-gray-100`}
      >
        {/* Logo */}
        <NavLink to="/" className="flex-shrink-0 group">
          <p className="text-2xl md:text-3xl lg:text-4xl text-gray-900 font-serif font-black cursor-pointer tracking-wide transition-all duration-300 group-hover:text-[#dc143c] group-hover:scale-105">
            CARWISE
          </p>
        </NavLink>

        {/* Desktop Search */}
        {!shouldHideFooter && (
          <Box className="hidden bg-gray-50 border border-gray-200 rounded-2xl w-80 lg:flex shadow-sm hover:shadow-md transition-all duration-300 focus-within:shadow-lg focus-within:border-[#dc143c]">
            <input
              type="search"
              id="search"
              name="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              placeholder="Kelime, ilan numarası veya satıcı adı ara"
              className="px-4 py-3 w-full text-sm placeholder-gray-500 text-gray-700 bg-transparent rounded-l-2xl border-none outline-none focus:outline-none"
            />
            <button
              className="rounded-r-2xl bg-[#dc143c] px-6 py-3 text-white cursor-pointer hover:bg-[#b01030] transition-all duration-300 font-medium text-sm"
              onClick={handleSearch}
            >
              Ara
            </button>
          </Box>
        )}

        {/* Desktop Navigation */}
        <Box className="hidden gap-5 items-center md:flex lg:gap-7">
          {!shouldHideFooter && (
            <>
              
                <NavLink to="/arac-satin-al" className="group">
                  <Box className="flex gap-2 items-center px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-100 group-hover:scale-105">
                    <CarIcon className="text-gray-600 group-hover:text-[#dc143c]" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-[#dc143c] lg:text-base">
                      Tüm İlanlar
                    </span>
                  </Box>
                </NavLink>
      
                <Box
                  className="cursor-pointer group"
                  onClick={isLoggedIn ? handleGoToIlanVer : () => onOpenClick("login")}
                >
                  <Box className="flex gap-2 items-center px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-100 group-hover:scale-105">
                    <AddIcon className="text-gray-600 group-hover:text-[#dc143c]" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-[#dc143c] lg:text-base">
                      İlan Ver
                    </span>
                  </Box>
                </Box>
                      
                <Box
                  className="cursor-pointer group"
                  onClick={isLoggedIn ? handleGoToFiyatOgren : () => onOpenClick("login")}
                >
                  <Box className="flex gap-2 items-center px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-100 group-hover:scale-105">
                    <TrendingUpIcon className="text-gray-600 group-hover:text-[#dc143c]" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-[#dc143c] lg:text-base">
                      Fiyat Öğren
                    </span>
                  </Box>
                </Box>
            </>
          )}
        </Box>

        {/* Desktop Auth */}
        <Box className="hidden gap-3 items-center md:flex">
          {isLoggedIn ? (
            <>
              <Tooltip title="Bildirimler" arrow placement="bottom">
                <IconButton 
                  onClick={handleGoToNotifications}
                  className="text-gray-600 hover:text-[#dc143c] hover:bg-red-50 transition-all duration-300"
                  size="small"
                >
                  <Badge badgeContent={unreadCount} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              
              <LoginAccount
                onLogout={onLogout}
                fullName={
                  user
                    ? `${user?.first_name} ${user?.last_name
                        .slice(0, 1)
                        .toUpperCase()}`
                    : " "
                }
              />
            </>
          ) : (
            <button
              className="bg-[#dc143c] px-5 py-2.5 rounded-xl text-white cursor-pointer hover:bg-[#b01030] transition-all duration-300 text-sm lg:text-base font-medium shadow-sm hover:shadow-md transform hover:scale-105"
              onClick={() => onOpenClick("login", "notLogin")}
            >
              Giriş Yap
            </button>
          )}
        </Box>

        {/* Mobile Menu Button */}
        <Box className="flex gap-2 items-center md:hidden">
          {!shouldHideFooter && (
            <IconButton 
              onClick={toggleSearchMenu} 
              className="text-gray-600 hover:text-[#dc143c] hover:bg-red-50 transition-all duration-300"
              size="small"
            >
              <SearchIcon />
            </IconButton>
          )}
          <IconButton 
            onClick={toggleMobileMenu} 
            className="text-gray-600 hover:text-[#dc143c] hover:bg-red-50 transition-all duration-300"
            size="small"
          >
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
          <Box className="p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
            <Box className="flex gap-2 items-center">
              <Box className="flex flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <input
                  type="search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  placeholder="Kelime, ilan numarası veya satıcı adı ara"
                  className="px-4 py-3 w-full text-sm placeholder-gray-400 text-gray-700 bg-transparent rounded-l-2xl border-none outline-none"
                />
                <button
                  className="rounded-r-2xl bg-gradient-to-r from-[#dc143c] to-[#ef4444] px-4 py-3 text-white cursor-pointer font-medium"
                  onClick={handleSearch}
                >
                  Ara
                </button>
              </Box>
              <IconButton 
                onClick={toggleSearchMenu}
                className="text-gray-600 hover:text-[#dc143c] hover:bg-red-50 transition-all duration-300"
              >
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
        <Box className="p-6 w-72 h-full bg-gradient-to-b from-gray-50 to-white">
          <Box className="flex justify-between items-center mb-6">
            <p className="text-2xl font-bold text-gray-800">CARWISE</p>
            <IconButton 
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-[#dc143c] hover:bg-red-50 transition-all duration-300"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <List className="space-y-2">
            {!shouldHideFooter && (
              <>
                <ListItem 
                  button 
                  onClick={handleGoToAracAl}
                  className="mb-2 rounded-xl transition-all duration-300 hover:bg-gray-100"
                >
                  <Box className="flex gap-3 items-center w-full">
                    <CarIcon className="text-gray-600" />
                    <ListItemText primary="Araç Al" className="text-lg font-medium" />
                  </Box>
                </ListItem>
                <ListItem
                  button
                  onClick={isLoggedIn ? handleGoToIlanVer : () => onOpenClick("login")}
                  className="mb-2 rounded-xl transition-all duration-300 hover:bg-gray-100"
                >
                  <Box className="flex gap-3 items-center w-full">
                    <AddIcon className="text-gray-600" />
                    <ListItemText primary="İlan Ver" className="text-lg font-medium" />
                  </Box>
                </ListItem>
                <ListItem
                  button
                  onClick={isLoggedIn ? handleGoToFiyatOgren : () => onOpenClick("login")}
                  className="mb-2 rounded-xl transition-all duration-300 hover:bg-gray-100"
                >
                  <Box className="flex gap-3 items-center w-full">
                    <TrendingUpIcon className="text-gray-600" />
                    <ListItemText primary="Fiyat Öğren" className="text-lg font-medium" />
                  </Box>
                </ListItem>
                {isLoggedIn && (
                  <ListItem
                    button
                    onClick={handleGoToProfile}
                    className="mb-2 rounded-xl transition-all duration-300 hover:bg-gray-100"
                  >
                    <Box className="flex gap-3 items-center w-full">
                      <PersonIcon className="text-gray-600" />
                      <ListItemText primary="Profil & Ayarlar" className="text-lg font-medium" />
                    </Box>
                  </ListItem>
                )}
                {isLoggedIn && (
                  <ListItem
                    button
                    onClick={handleGoToNotifications}
                    className="mb-2 rounded-xl transition-all duration-300 hover:bg-gray-100"
                  >
                    <Box className="flex gap-3 items-center w-full">
                      <Badge badgeContent={unreadCount} color="error">
                        <NotificationsIcon className="text-gray-600" />
                      </Badge>
                      <ListItemText primary="Bildirimler" className="text-lg font-medium" />
                    </Box>
                  </ListItem>
                )}
                <Divider className="my-4" />
              </>
            )}

            <ListItem className="mt-4">
              {isLoggedIn ? (
                <Box className="space-y-4 w-full">
                  <Box className="flex gap-4 items-center p-3 bg-gray-50 rounded-xl">
                    <Avatar className="bg-gradient-to-r from-[#dc143c] to-[#ef4444] text-white">
                      {user?.first_name ? user.first_name[0] : "U"}
                    </Avatar>
                    <Box className="flex-1">
                      <Typography className="font-semibold text-gray-800">
                        {user
                          ? `${user?.first_name} ${user?.last_name}`
                          : "Kullanıcı"}
                      </Typography>
                      <Typography className="text-sm text-gray-500">
                        {user?.email}
                      </Typography>
                    </Box>
                  </Box>
                  <button
                    className="py-3 w-full font-medium text-white bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-md transition-all duration-300 transform hover:from-red-700 hover:to-red-800 hover:shadow-lg hover:scale-105"
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
                  className="w-full bg-gradient-to-r from-[#dc143c] to-[#ef4444] text-white py-4 rounded-xl hover:from-[#b01030] hover:to-[#dc2626] transition-all duration-300 text-lg font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                  onClick={() => {
                    onOpenClick("login", "notLogin");
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
