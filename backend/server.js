import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import leadsRouter from './routes/leads.js';
import universitiesRouter from './routes/universities.js';
import University from './models/University.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/leads', leadsRouter);
app.use('/api/universities', universitiesRouter);

app.get('/api/health', (req, res) => res.json({ status: 'ok', now: new Date() }));

app.post('/api/seed', async (req, res) => {
  try {
    const data = [
      {
        slug: 'sunrise-private-univ',
        name: 'Sunrise Private University',
        overview: 'Sunrise Private University is focused on engineering and management with industry-aligned curriculum.',
        courses: [
          { name: 'B.Tech Computer Science', feeRange: '₹1,50,000 - ₹2,50,000 / year', duration: '4 years', seats: 120 },
          { name: 'MBA', feeRange: '₹1,00,000 - ₹2,00,000 / year', duration: '2 years', seats: 60 }
        ],
        placements: { highest: '₹18 LPA', average: '₹4.5 LPA', recruiters: ['TCS','Infosys','Capgemini'] },
        facilities: ['Hostel','Labs','Library','Sports complex'],
        contact: { phone: '0123456789', email: 'admissions@sunrise.edu' }
      },
      {
        slug: 'crescent-institute',
        name: 'Crescent Institute of Technology',
        overview: 'Crescent Institute emphasizes research, internships and strong placement support.',
        courses: [
          { name: 'B.Tech Electronics', feeRange: '₹1,20,000 - ₹2,00,000 / year', duration: '4 years', seats: 90 },
          { name: 'BBA', feeRange: '₹60,000 - ₹1,20,000 / year', duration: '3 years', seats: 60 }
        ],
        placements: { highest: '₹16 LPA', average: '₹3.8 LPA', recruiters: ['Wipro','HCL','L&T'] },
        facilities: ['Cafeteria','Innovation Lab','Medical'],
        contact: { phone: '0987654321', email: 'hello@crescent.edu' }
      }
    ];
    
    await University.deleteMany({});
    await University.insertMany(data);
    res.json({ message: 'Database seeded successfully', count: data.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Seed failed' });
  }
});

app.use(express.static('public'));

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Mongo connected');
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (err) {
    console.error('Failed to start', err);
    process.exit(1);
  }
}

start();
