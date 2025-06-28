import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, IconButton, Snackbar, Alert } from '@mui/material';
import { ContentCopy as CopyIcon } from '@mui/icons-material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Message = ({ text, sender, isTyping = false }) => {
  const isBot = sender === 'bot';
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCopyAlert, setShowCopyAlert] = useState(false);

  // Typing animation for bot messages
  useEffect(() => {
    if (isBot && !isTyping && text) {
      setDisplayedText('');
      setCurrentIndex(0);
      
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex < text.length) {
            setDisplayedText(text.slice(0, prevIndex + 1));
            return prevIndex + 1;
          } else {
            clearInterval(timer);
            return prevIndex;
          }
        });
      }, 30); // Adjust speed here (lower = faster)

      return () => clearInterval(timer);
    } else {
      setDisplayedText(text);
    }
  }, [text, isBot, isTyping]);

  // Copy to clipboard function
  const copyToClipboard = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setShowCopyAlert(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Function to parse and format message content
  const formatMessage = (content) => {
    if (!content) return null;

    // Split by code blocks (triple backticks)
    const parts = content.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      // Check if it's a code block
      if (part.startsWith('```') && part.endsWith('```')) {
        const codeContent = part.slice(3, -3);
        const lines = codeContent.split('\n');
        const language = lines[0].trim();
        const code = lines.slice(1).join('\n');

        return (
          <Box key={index} sx={{ my: 2, position: 'relative' }}>
            {/* Code header with copy button */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                px: 2,
                py: 1,
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                fontSize: '0.85rem',
              }}
            >
              <Typography variant="body2" sx={{ color: '#61dafb', fontWeight: 500 }}>
                {language || 'code'}
              </Typography>
              <IconButton
                size="small"
                onClick={() => copyToClipboard(code)}
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&:hover': {
                    color: 'white',
                    background: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <CopyIcon fontSize="small" />
              </IconButton>
            </Box>
            <SyntaxHighlighter
              language={language || 'javascript'}
              style={tomorrow}
              customStyle={{
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: '8px',
                borderBottomRightRadius: '8px',
                fontSize: '14px',
                margin: 0,
              }}
            >
              {code}
            </SyntaxHighlighter>
          </Box>
        );
      } else {
        // Regular text with inline code formatting
        return (
          <Typography
            key={index}
            component="div"
            sx={{
              whiteSpace: 'pre-wrap',
              lineHeight: 1.6,
              '& code': {
                backgroundColor: 'rgba(0,0,0,0.15)',
                color: '#e91e63',
                padding: '2px 6px',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '0.9em',
                fontWeight: 500,
              }
            }}
          >
            {part.split(/(`[^`]+`)/).map((segment, i) => {
              if (segment.startsWith('`') && segment.endsWith('`')) {
                return (
                  <code key={i}>
                    {segment.slice(1, -1)}
                  </code>
                );
              }
              return segment;
            })}
          </Typography>
        );
      }
    });
  };

  // Typing indicator component
  const TypingIndicator = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Typography variant="body2" sx={{ fontStyle: 'italic', opacity: 0.7 }}>
        Miss Syntax is typing
      </Typography>
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        {[0, 1, 2].map((dot) => (
          <Box
            key={dot}
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: 'currentColor',
              opacity: 0.4,
              animation: `typing-dot 1.4s infinite ${dot * 0.2}s`,
              '@keyframes typing-dot': {
                '0%, 80%, 100%': { opacity: 0.4 },
                '40%': { opacity: 1 },
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: isBot ? 'flex-start' : 'flex-end',
          mb: 2
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 2.5,
            maxWidth: '85%',
            background: isBot 
              ? 'linear-gradient(135deg, rgba(232, 245, 232, 0.95) 0%, rgba(200, 230, 201, 0.95) 100%)'
              : 'linear-gradient(135deg, rgba(25, 118, 210, 0.95) 0%, rgba(21, 101, 192, 0.95) 100%)',
            color: isBot ? '#1b5e20' : '#ffffff',
            borderRadius: '20px',
            border: isBot ? '2px solid rgba(76, 175, 80, 0.3)' : '2px solid rgba(21, 101, 192, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            backdropFilter: 'blur(10px)',
            position: 'relative',
          }}
        >
          {isTyping ? <TypingIndicator /> : formatMessage(displayedText)}
        </Paper>
      </Box>

      {/* Copy success notification */}
      <Snackbar
        open={showCopyAlert}
        autoHideDuration={2000}
        onClose={() => setShowCopyAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowCopyAlert(false)} 
          severity="success" 
          sx={{ 
            background: 'rgba(76, 175, 80, 0.9)',
            backdropFilter: 'blur(10px)',
            color: 'white',
          }}
        >
          Code copied to clipboard! 📋
        </Alert>
      </Snackbar>
    </>
  );
};

export default Message;