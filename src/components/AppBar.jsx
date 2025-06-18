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
} from "@mui/material";
import React, { useState } from "react";
import LoginAccount from "./LoginAccount";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Close as CloseIcon,
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

  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      navigate(`/arac-satin-al?q=${encodeURIComponent(searchValue.trim())}`);
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

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleSearchMenu = () => setSearchMenuOpen(!searchMenuOpen);

  return (
    <>
      {/* Desktop/Tablet AppBar */}
      <Box
        className={`bg-[#FDFDFD] w-full shadow-md flex items-center justify-between px-4 md:px-8 lg:px-12 py-3 ${
          isKokpitOrFiyatOgren ? "justify-between" : "justify-between"
        }`}
      >
        {/* Logo */}
        <NavLink to="/" className="flex-shrink-0">
          <p className="text-2xl md:text-3xl lg:text-[32px] text-black font-serif font-black cursor-pointer tracking-wide">
            CARWISE
          </p>
        </NavLink>

        {/* Desktop Search */}
        {!shouldHideFooter && (
          <Box className="hidden bg-gray-200 rounded-lg w-80 lg:flex">
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
              className="w-full px-4 py-2 text-sm text-black bg-transparent border-none rounded-l-lg outline-none focus:outline-none"
            />
            <button
              className="rounded-r-lg bg-[#dc143c] px-6 py-2 text-white cursor-pointer hover:bg-[#b01030] transition-colors"
              onClick={handleSearch}
            >
              Ara
            </button>
          </Box>
        )}

        {/* Desktop Navigation */}
        <Box className="items-center hidden gap-6 md:flex lg:gap-8">
          {!shouldHideFooter && (
            <>
              <NavLink to="/arac-satin-al">
                <span className="relative text-base cursor-pointer group lg:text-lg">
                  Araç Al
                  <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#dc143c] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </NavLink>
              <span
                className="relative text-base cursor-pointer group lg:text-lg"
                onClick={
                  isLoggedIn ? handleGoToIlanVer : () => onOpenClick("login")
                }
              >
                İlan Ver
                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#dc143c] transition-all duration-300 group-hover:w-full"></span>
              </span>
              <span
                className="relative text-base cursor-pointer group lg:text-lg"
                onClick={
                  isLoggedIn ? handleGoToFiyatOgren : () => onOpenClick("login")
                }
              >
                Fiyat Öğren
                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#dc143c] transition-all duration-300 group-hover:w-full"></span>
              </span>
            </>
          )}
        </Box>

        {/* Desktop Auth */}
        <Box className="items-center hidden gap-4 md:flex">
          {isLoggedIn ? (
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
          ) : (
            <button
              className="bg-[#dc143c] px-4 py-2 rounded-xl text-white cursor-pointer hover:bg-[#b01030] transition-colors text-sm lg:text-base"
              onClick={() => onOpenClick("login", "notLogin")}
            >
              Giriş Yap
            </button>
          )}
        </Box>

        {/* Mobile Menu Button */}
        <Box className="flex items-center gap-2 md:hidden">
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
            <Box className="flex items-center gap-2">
              <Box className="flex flex-1 bg-gray-200 rounded-lg">
                <input
                  type="search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  placeholder="Kelime, ilan numarası veya satıcı adı ara"
                  className="w-full px-4 py-3 text-sm text-black bg-transparent border-none rounded-l-lg outline-none"
                />
                <button
                  className="rounded-r-lg bg-[#dc143c] px-4 py-3 text-white cursor-pointer"
                  onClick={handleSearch}
                >
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
        <Box className="w-64 p-4">
          <Box className="flex items-center justify-between mb-4">
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
                <ListItem
                  button
                  onClick={
                    isLoggedIn ? handleGoToIlanVer : () => onOpenClick("login")
                  }
                >
                  <ListItemText primary="İlan Ver" className="text-lg" />
                </ListItem>
                <ListItem
                  button
                  onClick={
                    isLoggedIn
                      ? handleGoToFiyatOgren
                      : () => onOpenClick("login")
                  }
                >
                  <ListItemText primary="Fiyat Öğren" className="text-lg" />
                </ListItem>
                {isLoggedIn && (
                  <ListItem
                    button
                    onClick={() => {
                      navigate("/kokpit");
                      setMobileMenuOpen(false);
                    }}
                  >
                    <ListItemText primary="Kokpit" className="text-lg" />
                  </ListItem>
                )}
                {isLoggedIn && (
                  <ListItem
                    button
                    onClick={() => {
                      navigate("/kokpit/profil-ve-ayarlar");
                      setMobileMenuOpen(false);
                    }}
                  >
                    <ListItemText primary="Ayarlar" className="text-lg" />
                  </ListItem>
                )}
                {isLoggedIn && (
                  <ListItem
                    button
                    onClick={() => {
                      navigate("/kokpit/bildirimlerim");
                      setMobileMenuOpen(false);
                    }}
                  >
                    <ListItemText primary="Bildirimler" className="text-lg" />
                  </ListItem>
                )}
                <Divider className="my-2" />
              </>
            )}

            <ListItem>
              {isLoggedIn ? (
                <Box className="w-full">
                  <Box className="flex items-center gap-3 mb-3">
                    <Avatar>
                      {user?.first_name ? user.first_name[0] : "U"}
                    </Avatar>
                    <Box>
                      <Typography className="font-semibold">
                        {user
                          ? `${user?.first_name} ${user?.last_name}`
                          : "Kullanıcı"}
                      </Typography>
                      <Typography className="text-xs text-gray-500">
                        {user?.email}
                      </Typography>
                    </Box>
                  </Box>
                  <button
                    className="w-full py-2 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
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
                  className="w-full bg-[#dc143c] text-white py-3 rounded-lg hover:bg-[#b01030] transition-colors text-lg"
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
