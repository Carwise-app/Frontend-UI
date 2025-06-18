import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import CheckIcon from '@mui/icons-material/Check';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import CloseIcon from '@mui/icons-material/Close';
import { Pagination, IconButton, Tooltip, Box } from '@mui/material';
import ControlPanelHeader from './ControlPanelHeader';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'; 

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchNotifications = async () => {
    try {
      const res = await api.get(`/notification?page=${currentPage}&limit=${limit}`);
      setNotifications(res.data.notifications);
      if (res.data.total_pages) {
        setTotalPages(res.data.total_pages);
      } else if (res.data.total_count) {
        setTotalPages(Math.ceil(res.data.total_count / limit));
      }
    } catch (err) {
      console.error('Bildirimler alınamadı:', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [currentPage]);

  const markAsRead = async (id) => {
    try {
      await api.put(`/notification/${id}`);
      fetchNotifications();
    } catch (err) {
      console.error('Bildirim okunamadı:', err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await api.delete(`/notification/${id}`);
      fetchNotifications();
    } catch (err) {
      console.error('Bildirim silinemedi:', err);
    }
  };

  return (
    <Box className="flex flex-col gap-y-4">
      <Box>
        <ControlPanelHeader 
          icon={<NotificationsNoneIcon sx={{ fontSize: 115, color: 'black', opacity: 0.1, marginRight: 1 }} />} 
          title="Bildirimlerim" 
          description="Bu ekrandan bildirimlerinizi görüntüleyebilir ve okuyabilirsiniz."
        />
        <Box className="space-y-4">
          {notifications.length === 0 ? (
            <p className="text-gray-500">Henüz bir bildiriminiz yok.</p>
          ) : (
            notifications.map((notif, idx) => (
              <Box
                key={idx}
                onClick={() => !notif.read && markAsRead(notif.id)}
                className={`p-4 rounded shadow transition-all duration-300 cursor-pointer flex justify-between items-start ${
                  notif.read
                    ? "bg-white border border-gray-200"
                    : "bg-red-50 border-l-4 border-red-400"
                }`}
              >
                <Box>
                  <p className="font-semibold">{notif.title}</p>
                  <p className="text-sm text-gray-600">{notif.message}</p>
                  <p className="mt-1 text-xs text-gray-400">
                    {new Date(notif.created_at * 1000).toLocaleString()}
                  </p>
                </Box>

                <Box className="flex flex-col items-end mt-1 ml-4">
                  {notif.read ? (
                    <CheckIcon className="text-green-500" />
                  ) : (
                    <MarkEmailUnreadIcon className="text-red-500" />
                  )}
                  <Tooltip title="Sil">
                    <IconButton size="small" onClick={(e) => {
                      e.stopPropagation(); // tıklama bildirim okuma işlevini tetiklemesin
                      deleteNotification(notif.id);
                    }}>
                      <CloseIcon className="text-red-500" fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Box>
        {notifications > 0 ? (   
          <Box className="flex justify-center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(e, value) => setCurrentPage(value)}
              color="primary"
            />
          </Box>
        ):("")}
    </Box>
  );
}
