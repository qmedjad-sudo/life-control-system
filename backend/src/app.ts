import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.API_PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// API Routes
app.use('/api/subjects', (req: Request, res: Response) => {
  res.json({ message: 'Subjects endpoint' });
});

app.use('/api/habits', (req: Request, res: Response) => {
  res.json({ message: 'Habits endpoint' });
});

app.use('/api/goals', (req: Request, res: Response) => {
  res.json({ message: 'Goals endpoint' });
});

app.use('/api/tasks', (req: Request, res: Response) => {
  res.json({ message: 'Tasks endpoint' });
});

// Error handling
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;