require('dotenv').config();
const express = require('express');
const cors = require('cors');
const aiService = require('./services/aiService');

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    // or requests from the configured CLIENT_URL or localhost ports
    if (!origin || origin === CLIENT_URL || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json({ limit: '10kb' }));

// Health Check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'FRIDAY — Vaibhav\'s Personal AI Assistant'
  });
});

// Chat API endpoint
app.post('/api/chat', async (req, res, next) => {
  try {
    const { message, messages } = req.body;

    // Validate message
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'A non-empty "message" string is required.'
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Message exceeds the maximum allowed length of 2000 characters.'
      });
    }

    const conversationHistory = Array.isArray(messages) ? messages : [];
    const result = await aiService.generateReply(message, conversationHistory);

    if (result.status && result.status !== 200) {
      return res.status(result.status).json({
        error: result.errorType || 'AI Service Error',
        status: result.status,
        message: result.reply,
        reply: result.reply
      });
    }

    return res.status(200).json({ reply: result.reply });
  } catch (error) {
    next(error);
  }
});

// Centralized error handling middleware (never leak stack traces)
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.message);

  const status = err.status || 500;
  const clientMessage = status === 500
    ? "Sorry, I'm having trouble processing your request right now."
    : err.message;

  res.status(status).json({
    error: status === 500 ? 'Internal Server Error' : 'Request Error',
    message: clientMessage
  });
});

// Start server
if (process.env.NODE_ENV !== 'test') {
  const isKeyConfigured = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0);
  const geminiModel = process.env.GEMINI_MODEL || 'gemini-3.5-flash';
  
  const server = app.listen(PORT, () => {
    console.log(`[FRIDAY Backend] Server is running on port ${PORT}`);
    console.log(`[FRIDAY Backend] Health check: http://localhost:${PORT}/api/health`);
    console.log(`[FRIDAY Backend] Environment configuration:`);
    console.log(`  - PORT: ${PORT}`);
    console.log(`  - CLIENT_URL: ${CLIENT_URL}`);
    console.log(`  - GEMINI_MODEL: ${geminiModel}`);
    console.log(`  - GEMINI_API_KEY configured: ${isKeyConfigured}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`[FRIDAY Backend] ERROR: Port ${PORT} is already in use by another process.`);
      console.error(`[FRIDAY Backend] Please terminate any lingering server instance on port ${PORT}.`);
    } else {
      console.error('[FRIDAY Backend] Server startup error:', err.message);
    }
  });
}

module.exports = app;
