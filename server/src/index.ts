import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Route Imports
import authRoutes from './routes/auth';
import patientRoutes from './routes/patients';
import triageRoutes from './routes/triage';
import appointmentRoutes from './routes/appointments';
import insuranceRoutes from './routes/insurance';
import billingRoutes from './routes/billing';
import pharmacyRoutes from './routes/pharmacy';
import dischargeRoutes from './routes/discharge';
import sosRoutes from './routes/sos';
import adminRoutes from './routes/admin';
import recordRoutes from './routes/records';

dotenv.config();

const app = express();
const httpServer = createServer(app);

// CORS configuration for Render & Local environments
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : '*';

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
  }
});

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

// Basic health check for Render health monitoring
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'NIVORA AI Smart Hospital Backend',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root API welcome endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'NIVORA AI Smart Hospital Backend API',
    status: 'running',
    health: '/health',
    docs: 'https://github.com/salunkhevijayasree/Nivora.ai'
  });
});

// ==========================================
// REST API ROUTES
// ==========================================
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/triage', triageRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/insurance', insuranceRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/pharmacy', pharmacyRoutes);
app.use('/api/discharge', dischargeRoutes);
app.use('/api/sos', sosRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/records', recordRoutes);

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
