import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import CheckIcon from '@mui/icons-material/Check';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import { Pagination } from '@mui/material';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchNotifications = async () => {
    try {
      const res = await api.get(`/notification?page=${currentPage}&limit=${limit}`);
      setNotifications(res.data.notifications);

      // total_pages backend'den geliyorsa doğrudan al
      if (res.data.total_pages) {
        setTotalPages(res.data.total_pages);
      } 
      // Eğer total_count varsa onunla hesapla
      else if (res.data.total_count) {
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

  return (
    <div className="p-6 min-h-[calc(100vh-100px)] flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-4">Bildirimlerim</h2>
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <p className="text-gray-500">Henüz bir bildiriminiz yok.</p>
          ) : (
            notifications.map((notif, idx) => (
              <div
                key={idx}
                onClick={() => !notif.read && markAsRead(notif.id)}
                className={`p-4 rounded shadow transition-all duration-300 cursor-pointer flex justify-between items-start ${
                  notif.read
                    ? "bg-white border border-gray-200"
                    : "bg-red-50 border-l-4 border-red-400"
                }`}
              >
                <div>
                  <p className="font-semibold">{notif.title}</p>
                  <p className="text-sm text-gray-600">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(notif.created_at * 1000).toLocaleString()}
                  </p>
                </div>
                <div className="ml-4 mt-1">
                  {notif.read ? (
                    <CheckIcon className="text-green-500" />
                  ) : (
                    <MarkEmailUnreadIcon className="text-red-500" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Sayfa numarası en altta ve ortalanmış şekilde */}
      <div className="flex justify-center mt-8">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(e, value) => setCurrentPage(value)}
          color="primary"
        />
      </div>
    </div>
  );
}
