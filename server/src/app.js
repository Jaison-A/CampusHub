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

app.use(cors());
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
