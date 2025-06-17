import React, { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  Stack
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function formatTime(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ChatDetail() {
  const { receiver_id } = useParams();
  const [searchParams] = useSearchParams();
  const listing_id = searchParams.get('listing_id');

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const messagesEndRef = useRef(null);

  const fetchMessages = () => {
    api.get(`/chat/${receiver_id}`, {
      params: { listing_id, limit: 100, page: 1 }
    })
      .then(res => {
        setMessages(res.data.messages || []);
        if (res.data.messages.length > 0) {
          setUserInfo(res.data.messages[0].receiver);
        }
      })
      .catch(err => console.error("Mesajlar alınamadı:", err));
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    api.post(`/chat/${receiver_id}`, {
      listing_id,
      message: newMessage.trim()
    })
      .then(() => {
        setNewMessage('');
        fetchMessages();
        scrollToBottom();
      })
      .catch(err => console.error("Mesaj gönderilemedi:", err));
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchMessages();
    scrollToBottom();
    const interval = setInterval(() => fetchMessages(), 5000);
    return () => clearInterval(interval);
  }, [receiver_id, listing_id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box className="p-4 max-w-3xl mx-auto">
      <Typography variant="h5" mb={2}>
        {userInfo ? `${userInfo.first_name} ${userInfo.last_name} ile sohbet` : 'Sohbet'}
      </Typography>

      <Paper elevation={3} sx={{ height: '60vh', overflowY: 'auto', p: 2, mb: 2 }}>
        {messages.map((msg) => (
          <Box
            key={msg.id}
            display="flex"
            justifyContent={msg.sender.id === receiver_id ? 'flex-start' : 'flex-end'}
            mb={1}
          >
            <Paper
              sx={{
                p: 1.5,
                maxWidth: '70%',
                backgroundColor: msg.sender.id === receiver_id ? '#eee' : '#1976d2',
                color: msg.sender.id === receiver_id ? 'black' : 'white'
              }}
            >
              <Typography variant="body2">{msg.message}</Typography>
              <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 0.5 }}>
                {formatTime(msg.created_at)}
              </Typography>
            </Paper>
          </Box>
        ))}
        <div ref={messagesEndRef}></div>
      </Paper>

      <Stack direction="row" spacing={1}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Mesaj yaz..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleEnter}
        />
        <IconButton color="primary" onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}
