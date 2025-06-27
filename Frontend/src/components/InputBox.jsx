import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const InputBox = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 2,
        display: 'flex',
        gap: 1,
        borderTop: '1px solid #e0e0e0'
      }}
    >
      <TextField
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask me anything about coding or life..."
        variant="outlined"
        size="small"
      />
      <IconButton type="submit" color="primary">
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default InputBox;