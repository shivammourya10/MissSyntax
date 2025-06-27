import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const Message = ({ text, sender }) => {
  const isBot = sender === 'bot';
  
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isBot ? 'flex-start' : 'flex-end',
        mb: 2
      }}
    >
      <Paper
        elevation={1}
        sx={{
          p: 2,
          maxWidth: '70%',
          backgroundColor: isBot ? '#e8f5e8' : '#1976d2',
          color: isBot ? '#1b5e20' : '#ffffff',
          borderRadius: '20px',
          border: isBot ? '2px solid #4caf50' : '2px solid #1565c0',
          boxShadow: 2
        }}
      >
        <Typography>{text}</Typography>
      </Paper>
    </Box>
  );
};

export default Message;