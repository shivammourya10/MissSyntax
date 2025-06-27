import React, { useState } from 'react';
import { Box, Paper } from '@mui/material';
import Message from './Message';
import InputBox from './InputBox';

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Miss Syntax, your coding assistant. How can I help you today?", sender: 'bot' },
    { text: "Hi there! Can you help me with JavaScript?", sender: 'user' }
  ]);

  const handleSendMessage = async (message) => {
    try {
      const response = await fetch('http://localhost:3000/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: message }),
      });
      
      const data = await response.json();
      
      setMessages(prevMessages => [
        ...prevMessages,
        { text: message, sender: 'user' },
        { text: data.reply, sender: 'bot' }
      ]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} />
        ))}
      </Box>
      <InputBox onSendMessage={handleSendMessage} />
    </Paper>
  );
};

export default Chat;