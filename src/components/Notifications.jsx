import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import DraftsIcon from '@mui/icons-material/Drafts';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteIcon from '@mui/icons-material/Delete';
import { Pagination, IconButton, Tooltip, Box } from '@mui/material';
import ControlPanelHeader from './ControlPanelHeader';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchNotifications = async () => {
    try {
      const res = await api.get(`/notification?page=${currentPage}&limit=${limit}`);
      setNotifications(res.data.notifications);

      if (res.data.total) {
        setTotalPages(Math.ceil(res.data.total / limit));
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

  const markAllAsRead = async () => {
    try {
      await api.put('/notification/mark-all-read');
      fetchNotifications();
    } catch (err) {
      console.error('Tüm bildirimler okunamadı:', err);
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

  const deleteAllNotifications = async () => {
    try {
      await api.delete('/notification/delete-all');
      fetchNotifications();
    } catch (err) {
      console.error('Tüm bildirimler silinemedi:', err);
    }
  };

  return (
    <Box className="flex flex-col gap-y-4">
      <Box>
        <ControlPanelHeader 
          icon={<NotificationsNoneIcon sx={{ fontSize: 115, color: 'black', opacity: 0.1, marginRight: 1 }} />} 
          title="Bildirimlerim" 
          description="Bu ekrandan bildirimlerinizi görüntüleyebilir, okuyabilir ve silebilirsiniz."
        />

        {notifications.length > 0 && (
          <Box className="flex justify-end items-center gap-x-2 mb-4">
            <Tooltip title="Tümünü okundu yap">
              <IconButton onClick={markAllAsRead}>
                <DoneAllIcon className="text-red-500" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Tümünü sil">
              <IconButton onClick={deleteAllNotifications}>
                <DeleteIcon className="text-red-600" />
              </IconButton>
            </Tooltip>
          </Box>
        )}

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
                    <DraftsIcon className="text-red-500" />
                  ) : (
                    <MarkEmailUnreadIcon className="text-red-500" />
                  )}
                  <Tooltip title="Sil">
                    <IconButton size="small" onClick={(e) => {
                      e.stopPropagation();
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

      {notifications.length > 0 && (
        <Box className="flex justify-center mt-8">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, value) => setCurrentPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}
