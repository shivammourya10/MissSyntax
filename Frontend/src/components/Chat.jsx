import React, { useState, useRef, useEffect } from 'react';
import { Box, Paper, Typography, Avatar, IconButton } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import Message from './Message';
import InputBox from './InputBox';
import girl_dp from '../assets/girl_dp.png'; // Import your avatar image

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: "ugh finally, you’re here 😩 I missed you, booba 💻🫶 now tell me — code crisis or heartache first?", sender: 'bot' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message) => {
    // Add user message immediately
    setMessages(prevMessages => [
      ...prevMessages,
      { text: message, sender: 'user' }
    ]);

    // Show typing indicator
    setIsLoading(true);
    setMessages(prevMessages => [
      ...prevMessages,
      { text: '', sender: 'bot', isTyping: true }
    ]);

    try {
      const response = await fetch(process.env.API_ASK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: message }),
      });
      
      const data = await response.json();
      
      // Remove typing indicator and add actual response
      setMessages(prevMessages => {
        const messagesWithoutTyping = prevMessages.filter(msg => !msg.isTyping);
        return [
          ...messagesWithoutTyping,
          { text: data.reply, sender: 'bot' }
        ];
      });
    } catch (error) {
      console.error('Error:', error);
      setMessages(prevMessages => {
        const messagesWithoutTyping = prevMessages.filter(msg => !msg.isTyping);
        return [
          ...messagesWithoutTyping,
          { text: 'Sorry, I encountered an error. Please try again! 😅', sender: 'bot' }
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
        position: 'fixed',
        top: 0,
        left: 0,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          zIndex: 1,
        }
      }}
    >
      <Paper 
        elevation={0} 
        sx={{ 
          height: '100vh',
          width: '100%',
          display: 'flex', 
          flexDirection: 'column',
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(20px)',
          border: 'none',
          borderRadius: 0,
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Avatar
            sx={{
              bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              width: 45,
              height: 45,
              fontSize: '1.2rem',
            }}
          >
           <img src={girl_dp} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 600,
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              Miss Syntax
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.85rem',
              }}
            >
             Your Dev Bae in the Cloud ☁️💘
            </Typography>
          </Box>
          <IconButton
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>

        {/* Messages Area */}
        <Box 
          sx={{ 
            flex: 1, 
            overflow: 'auto', 
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(255, 255, 255, 0.1)',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '3px',
            },
          }}
        >
          {messages.map((msg, index) => (
            <Message 
              key={index} 
              text={msg.text} 
              sender={msg.sender}
              isTyping={msg.isTyping}
            />
          ))}
          <div ref={messagesEndRef} />
        </Box>

        {/* Input Area */}
        <InputBox onSendMessage={handleSendMessage} disabled={isLoading} />
      </Paper>
    </Box>
  );
};

export default Chat;