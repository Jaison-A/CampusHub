import express from 'express';
import cors from 'cors';
import authRoutes from '../src/routes/authRoutes.js';
import userRoutes from '../src/routes/userRoutes.js';
import noteRoutes from '../src/routes/noteRoutes.js';
import assignmentRoutes from '../src/routes/assignmentRoutes.js';
import submissionRoutes from '../src/routes/submissionRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import announcementRoutes from './routes/announcementRoutes.js';

const app = express();

import cors from 'cors';

const allowedOrigins = [
  'https://campus-ajlp8g15i-shadowxvera.vercel.app',
  'https://campus-hub-xi-eight.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  }),
);
app.use(express.json());
app.get('/', (req, res) => {
  res.send('server runing');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/announcements', announcementRoutes);

export default app;
