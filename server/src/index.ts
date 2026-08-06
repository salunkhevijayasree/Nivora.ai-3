import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

app.use(cors());
app.use(express.json());

// Basic health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Socket.io for Live Queue, Telemedicine, SOS
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('join_queue', (department) => {
    socket.join(`queue_${department}`);
    console.log(`Socket ${socket.id} joined queue_${department}`);
  });

  socket.on('sos_alert', (data) => {
    io.emit('emergency_broadcast', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Nivora AI Server running on port ${PORT}`);
});
