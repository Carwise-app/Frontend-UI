import React, { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  Stack,
  Avatar,
  CircularProgress,
  Button
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import InfoIcon from '@mui/icons-material/Info';

function formatTime(timestamp) {
  const date = new Date(timestamp > 1e12 ? timestamp : timestamp * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ChatDetail() {
  const { receiver_id } = useParams();
  const [searchParams] = useSearchParams();
  const listing_id = searchParams.get('listing_id');
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ws, setWs] = useState(null);
  const [myId, setMyId] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [listingInfo, setListingInfo] = useState(null);
  const messagesEndRef = useRef(null);
  const messagesBoxRef = useRef(null);
  const accessToken = localStorage.getItem('access_token');

  // Ses efekti için AudioContext
  const audioContextRef = useRef(null);

  // Hafif beep sesi oluştur
  const playNotificationSound = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      // Ses ayarları - hafif ve kısa
      oscillator.frequency.setValueAtTime(800, audioContextRef.current.currentTime); // 800Hz
      oscillator.type = 'sine';
      
      // Ses seviyesi - çok düşük
      gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.1);
      
      oscillator.start(audioContextRef.current.currentTime);
      oscillator.stop(audioContextRef.current.currentTime + 0.1); // 100ms
    } catch (e) {
      console.log('Ses çalınamadı:', e);
    }
  };

  useEffect(() => {
    if (!receiver_id) return;
    api.get(`/user/${receiver_id}`)
      .then(res => {
        setUserInfo(res.data);
      })
      .catch(err => {
        console.error("Kullanıcı bilgileri alınamadı:", err);
      });
  }, [receiver_id]);

  useEffect(() => {
    if (!accessToken) return;
    try {
      const base64Url = accessToken.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const payload = JSON.parse(jsonPayload);
      setMyId(payload.user_id || payload.sub || payload.id);
    } catch (e) {
      setMyId(null);
    }
  }, [accessToken]);

  const fetchMessages = async (pageToLoad = 1, append = false) => {
    if (append) {
      setIsLoadingMore(true);
    } else {
      setLoading(true);
    }
    try {
      let prevScrollHeight = null;
      let prevScrollTop = null;
      if (append && messagesBoxRef.current) {
        prevScrollHeight = messagesBoxRef.current.scrollHeight;
        prevScrollTop = messagesBoxRef.current.scrollTop;
      }
      const res = await api.get(`/chat/${listing_id}/${receiver_id}`, {
        params: { limit: 20, page: pageToLoad },
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const msgs = res.data.messages || [];
      setHasMore(msgs.length > 0);
      setMessages(prev => {
        const newMsgs = append ? [...msgs.reverse(), ...prev] : msgs.reverse();
        return newMsgs;
      });
      setTimeout(() => {
        if (append && messagesBoxRef.current && prevScrollHeight !== null && prevScrollTop !== null) {
          const newScrollHeight = messagesBoxRef.current.scrollHeight;
          const heightDifference = newScrollHeight - prevScrollHeight;
          messagesBoxRef.current.scrollTop = prevScrollTop + heightDifference;
        } else if (!append) {
          scrollToBottom();
        }
      }, 50);
    } catch (err) {
      setHasMore(false);
      console.error("Mesajlar alınamadı:", err);
    } finally {
      if (append) {
        setIsLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!accessToken || !listing_id || !receiver_id) return;
    const wsUrl = `wss://carwisegw.yusuftalhaklc.com/chat/ws/${listing_id}/${receiver_id}?token=${accessToken}`;
    const socket = new window.WebSocket(wsUrl);
    setWs(socket);

    socket.onopen = () => {
      //console.log('WebSocket connected');
    };
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.message) {
          // Karşı kullanıcıdan gelen mesajsa ses çal
          if (data.sender?.id !== myId) {
            playNotificationSound();
          }
          setMessages(prev => [...prev, data]);
          scrollToBottom();
        }
      } catch (e) {}
    };
    socket.onclose = () => {
      //console.log('WebSocket closed');
    };
    socket.onerror = (e) => {
      //console.error('WebSocket error', e);
    };
    return () => socket.close();
    // eslint-disable-next-line
  }, [listing_id, receiver_id, accessToken]);

  useEffect(() => {
    setPage(1);
    fetchMessages(1);
    // eslint-disable-next-line
  }, [listing_id, receiver_id]);

  const scrollToBottom = () => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  };

  const prevMessagesLength = useRef(0);
  useEffect(() => {
    if (messages.length > 0 && messages.length > prevMessagesLength.current && !isLoadingMore && !loading) {
      scrollToBottom();
    }
    prevMessagesLength.current = messages.length;
  }, [messages, isLoadingMore, loading]);

  const sendMessage = () => {
    if (!newMessage.trim() || !ws || ws.readyState !== 1 || !myId) return;
    const msgObj = {
      message: newMessage.trim(),
      sender_id: myId,
      receiver_id,
      listing_id,
      timestamp: Date.now()
    };
    ws.send(JSON.stringify(msgObj));
    setMessages(prev => [...prev, { ...msgObj, id: Math.random().toString(36), sender: { id: myId }, receiver: { id: receiver_id }, created_at: Date.now() }]);
    setNewMessage('');
    setTimeout(() => {
      scrollToBottom();
    }, 50);
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleScroll = (e) => {
    if (e.target.scrollTop < 50 && hasMore && !isLoadingMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMessages(nextPage, true);
    }
  };

  useEffect(() => {
    if (!listing_id) return;
    api.get(`/listing/${listing_id}`)
      .then(res => {
        setListingInfo(res.data);
      })
      .catch(err => {
        console.error("Listing bilgileri alınamadı:", err);
      });
  }, [listing_id]);

  // Component unmount olduğunda AudioContext'i temizle
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <Box className="p-2 sm:p-4 max-w-2xl mx-auto flex flex-col h-[90vh]">
      <Paper elevation={2} sx={{ p: 2, mb: 2, borderRadius: 3, background: 'linear-gradient(90deg, #f8fafc 0%, #e0e7ef 100%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h6" fontWeight={600} mb={0.5}>
            {userInfo ? `${userInfo.first_name} ${userInfo.last_name}` : 'Sohbet'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {listingInfo?.title || 'Araç hakkında mesajlaşma'}
          </Typography>
        </Box>
        <IconButton 
          color="primary" 
          onClick={() => listingInfo?.slug && navigate(`/arac-detay/${listingInfo.slug}`)}
          sx={{ color: '#dc2626' }}
        >
          <InfoIcon />
        </IconButton>
      </Paper>
      <Paper
        elevation={1}
        sx={{ flex: 1, overflowY: 'auto', p: { xs: 1, sm: 2 }, mb: 2, background: '#f4f6fb', borderRadius: 3, position: 'relative' }}
        ref={messagesBoxRef}
        onScroll={handleScroll}
      >
        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%"><CircularProgress size={28} /></Box>
        )}
        {isLoadingMore && (
          <Box display="flex" justifyContent="center" alignItems="center" py={1}>
            <CircularProgress size={20} />
          </Box>
        )}
        {!loading && messages.length === 0 && (
          <Typography variant="body2" align="center" color="text.secondary" mt={4}>
            Henüz mesaj yok. İlk mesajı yazabilirsiniz.
          </Typography>
        )}
        {!loading && messages.map((msg, idx) => {
          const isMine = msg.sender?.id === myId;
          return (
            <Box
              key={msg.id || idx}
              display="flex"
              justifyContent={isMine ? 'flex-end' : 'flex-start'}
              mb={1.5}
            >
              <Paper
                sx={{
                  p: 1.2,
                  px: 2,
                  maxWidth: '70%',
                  background: isMine ? 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)' : '#fff',
                  color: isMine ? 'white' : 'black',
                  borderRadius: isMine ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                  boxShadow: isMine ? '0 4px 12px rgba(220, 38, 38, 0.3)' : '0 2px 8px rgba(0,0,0,0.08)',
                  border: isMine ? 'none' : '1px solid #e0e0e0'
                }}
              >
                <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>{msg.message}</Typography>
                <Typography variant="caption" sx={{ display: 'block', textAlign: isMine ? 'left' : 'right', mt: 0.5, opacity: 0.7 }}>
                  {formatTime(msg.created_at || msg.timestamp)}
                </Typography>
              </Paper>
            </Box>
          );
        })}
        <div ref={messagesEndRef}></div>
      </Paper>
      <Stack direction="row" spacing={1} alignItems="center">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Mesaj yaz..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleEnter}
          multiline
          minRows={1}
          maxRows={4}
          sx={{ background: 'white', borderRadius: 2 }}
        />
        <IconButton color="primary" onClick={sendMessage} sx={{ height: 48, width: 48 }}>
          <SendIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}
