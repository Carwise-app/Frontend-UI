import React, { useEffect, useState } from 'react'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import ControlPanelHeader from './ControlPanelHeader';
import PersonIcon from '@mui/icons-material/Person';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MessageIcon from '@mui/icons-material/Message';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BarChartIcon from '@mui/icons-material/BarChart';
import api from '../api/axios';

export default function DashboardKokpit() {
  const [counts, setCounts] = useState({
    user_count: 0,
    listing_count: 0,
    message_count: 0,
    favorite_count: 0,
    notification_count: 0,
    predict_count: 0,
    image_count: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/admin/count');
        setCounts(response.data);
      } catch (err) {
        setError('Veriler alınamadı.');
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  return (
    <>
      <ControlPanelHeader
        icon={
          <SpaceDashboardIcon
            sx={{ fontSize: 115, color: "black", opacity: 0.1, marginRight: 1 }}
          />
        }
        title="Dashboard"
        description="Sistem istatistiklerini görüntüleyebilirsiniz"
      />
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {/* Toplam Kullanıcı Kartı */}
        <Card className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group">
          <Box className="absolute inset-0 bg-gradient-to-br from-[#dc143c] to-[#ff1f4f] opacity-90"/>
          <CardContent className="relative p-6">
            <Box className="flex items-center justify-between">
              <Box>
                <Typography className="text-white/80 text-sm font-medium mb-1">
                  Toplam Kullanıcı
                </Typography>
                <Typography className="text-3xl font-bold text-white">
                  {loading ? '-' : counts.user_count}
                </Typography>
              </Box>
              <Box className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                <PersonIcon sx={{ fontSize: 32, color: 'white' }} />
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Toplam İlan Kartı */}
        <Card className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group">
          <Box className="absolute inset-0 bg-gradient-to-br from-[#16a34a] to-[#22c55e] opacity-90"/>
          <CardContent className="relative p-6">
            <Box className="flex items-center justify-between">
              <Box>
                <Typography className="text-white/80 text-sm font-medium mb-1">
                  Toplam İlan
                </Typography>
                <Typography className="text-3xl font-bold text-white">
                  {loading ? '-' : counts.listing_count}
                </Typography>
              </Box>
              <Box className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                <ListAltIcon sx={{ fontSize: 32, color: 'white' }} />
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Toplam Mesaj Kartı */}
        <Card className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group">
          <Box className="absolute inset-0 bg-gradient-to-br from-[#2563eb] to-[#3b82f6] opacity-90"/>
          <CardContent className="relative p-6">
            <Box className="flex items-center justify-between">
              <Box>
                <Typography className="text-white/80 text-sm font-medium mb-1">
                  Toplam Mesaj
                </Typography>
                <Typography className="text-3xl font-bold text-white">
                  {loading ? '-' : counts.message_count}
                </Typography>
              </Box>
              <Box className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                <MessageIcon sx={{ fontSize: 32, color: 'white' }} />
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Toplam Favori Kartı */}
        <Card className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group">
          <Box className="absolute inset-0 bg-gradient-to-br from-[#ec4899] to-[#f472b6] opacity-90"/>
          <CardContent className="relative p-6">
            <Box className="flex items-center justify-between">
              <Box>
                <Typography className="text-white/80 text-sm font-medium mb-1">
                  Toplam Favori
                </Typography>
                <Typography className="text-3xl font-bold text-white">
                  {loading ? '-' : counts.favorite_count}
                </Typography>
              </Box>
              <Box className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                <FavoriteIcon sx={{ fontSize: 32, color: 'white' }} />
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Toplam Bildirim Kartı */}
        <Card className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group">
          <Box className="absolute inset-0 bg-gradient-to-br from-[#eab308] to-[#facc15] opacity-90"/>
          <CardContent className="relative p-6">
            <Box className="flex items-center justify-between">
              <Box>
                <Typography className="text-white/80 text-sm font-medium mb-1">
                  Toplam Bildirim
                </Typography>
                <Typography className="text-3xl font-bold text-white">
                  {loading ? '-' : counts.notification_count}
                </Typography>
              </Box>
              <Box className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                <NotificationsIcon sx={{ fontSize: 32, color: 'white' }} />
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Toplam Tahmin Kartı */}
        <Card className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group">
          <Box className="absolute inset-0 bg-gradient-to-br from-[#9333ea] to-[#a855f7] opacity-90"/>
          <CardContent className="relative p-6">
            <Box className="flex items-center justify-between">
              <Box>
                <Typography className="text-white/80 text-sm font-medium mb-1">
                  Toplam Tahmin
                </Typography>
                <Typography className="text-3xl font-bold text-white">
                  {loading ? '-' : counts.predict_count}
                </Typography>
              </Box>
              <Box className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                <BarChartIcon sx={{ fontSize: 32, color: 'white' }} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box className="grid grid-cols-2 mt-5 text-lg rounded-2xl shadow-md bg-neutral-50">
        {error && (
          <div className="col-span-2 text-center text-red-600 py-2">{error}</div>
        )}
        <NavLink
          to="/kokpit/dashboard"
          end
          className={({ isActive }) =>
            `cursor-pointer font-medium py-3 px-39 hover:text-[#dc143c] rounded-2xl ${
              isActive ? `bg-[rgb(220,20,60,0.2)] text-[#dc143c]` : ``
            }`
          }
        >
          Kullanıcılar
        </NavLink>
        <NavLink
          to="/kokpit/dashboard/marka"
          className={({ isActive }) =>
            `cursor-pointer font-medium py-3 px-39 hover:text-[#dc143c] rounded-2xl ${
              isActive ? `bg-[rgb(220,20,60,0.2)] text-[#dc143c]` : ``
            }`
          }
        >
          Markalar
        </NavLink>
      </Box>
      <Box className="mt-5">
        <Outlet />
      </Box>
    </>
  )
}
