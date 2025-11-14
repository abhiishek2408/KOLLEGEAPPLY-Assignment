import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression';
import connectDB from './db.js';
import leadsRouter from './routes/leads.js';
import universitiesRouter from './routes/universities.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(compression());

app.use('/api/leads', leadsRouter);
app.use('/api/universities', universitiesRouter);

app.get('/api/health', (req, res) => res.json({ status: 'ok', now: new Date() }));

app.use(express.static('public'));

const PORT = process.env.PORT || 4000;

async function start() {
  await connectDB();
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}

start();
