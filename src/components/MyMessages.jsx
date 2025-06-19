import React, { useEffect, useState } from 'react';
import ControlPanelHeader from './ControlPanelHeader';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  CircularProgress,
  Button,
  Pagination
} from '@mui/material';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

function formatTime(timestamp) {
  const date = new Date(timestamp * 1000); // epoch -> ms
  const now = new Date();
  const diff = Math.floor((now - date) / 60000); // dakika cinsinden

  if (diff < 1) return 'az önce';
  if (diff < 60) return `${diff} dk önce`;
  if (diff < 1440) return `${Math.floor(diff / 60)} saat önce`;
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

export default function MyMessages() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const navigate = useNavigate();

  const fetchChats = (pageNum = 1, append = false) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    api.get('/chat/', { params: { limit: 20, page: pageNum } })
      .then(res => {
        const sorted = (res.data.chats || []).sort(
          (a, b) => b.last_message_time - a.last_message_time
        );
        setChats(prev => append ? [...prev, ...sorted] : sorted);
        setTotalPages(Math.ceil((res.data.total || 0) / 20));
        setHasMore(sorted.length > 0 && pageNum < Math.ceil((res.data.total || 0) / 20));
        if (append) {
          setLoadingMore(false);
        } else {
          setLoading(false);
        }
      })
      .catch(err => {
        console.error("Mesajlar alınamadı:", err);
        if (append) {
          setLoadingMore(false);
        } else {
          setLoading(false);
        }
      });
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchChats(nextPage, true);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    fetchChats(value, false);
  };

  useEffect(() => {
    fetchChats(1, false);
    const interval = setInterval(() => fetchChats(), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <ControlPanelHeader
        icon={<MailOutlineIcon sx={{ fontSize: 115, color: 'black', opacity: 0.1, marginRight: 1 }} />}
        title="Mesajlarım"
        description="Buradan kullancılarla olan sohbetlerinizi görebilirsiniz."
      />
      <Box className="px-4 mt-4 cursor-pointer">
        {loading ? (
          <Box display="flex" justifyContent="center"><CircularProgress /></Box>
        ) : chats.length === 0 ? (
          <Typography variant="body1" align="center" sx={{ mt: 5 }}>
            Henüz mesajlaşma geçmişiniz bulunmamaktadır.
          </Typography>
        ) : (
          <>
            <List>
              {chats.map((chat, index) => (
                <React.Fragment key={`${chat.user.id}-${chat.listing.id}`}>
                  <ListItem
                    button
                    alignItems="flex-start"
                    onClick={() => navigate(`/sohbet/${chat.user.id}?listing_id=${chat.listing.id}`)}
                  >
                    <ListItemAvatar>
                      <Avatar>{chat.user.first_name[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${chat.user.first_name} ${chat.user.last_name}`}
                      secondary={
                        <>
                          <Typography variant="body2" color="text.secondary">
                            {chat.listing.title}
                          </Typography>
                          <Typography variant="caption" color="gray">
                            {formatTime(chat.last_message_time)}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  {index < chats.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
            {loadingMore && (
              <Box display="flex" justifyContent="center" py={2}>
                <CircularProgress size={24} />
              </Box>
            )}
            {hasMore && !loadingMore && (
              <Box display="flex" justifyContent="center" py={2}>
                <Button 
                  variant="outlined" 
                  onClick={loadMore}
                  sx={{ color: '#dc2626', borderColor: '#dc2626', '&:hover': { borderColor: '#b91c1c', backgroundColor: 'rgba(220, 38, 38, 0.04)' } }}
                >
                  Daha Fazla Yükle
                </Button>
              </Box>
            )}
            {totalPages > 1 && (
              <Box display="flex" justifyContent="center" py={2}>
                <Pagination 
                  count={totalPages} 
                  page={page} 
                  onChange={handlePageChange}
                  color="primary"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      color: '#dc2626',
                      '&.Mui-selected': {
                        backgroundColor: '#dc2626',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#b91c1c',
                        }
                      }
                    }
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  );
}
