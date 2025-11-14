import mongoose from 'mongoose';
import dotenv from 'dotenv';
import University from './models/University.js';

dotenv.config();

const data = [
  {
    slug: 'sunrise-private-univ',
    name: 'Sunrise Private University',
    universityType: 'Private University',
    universityBrochureLink: 'https://example.com/brochures/sunrise-university.pdf',
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
    universityType: 'Institute of Technology',
    universityBrochureLink: 'https://example.com/brochures/crescent-institute.pdf',
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

async function seed(){
  await mongoose.connect(process.env.MONGO_URI);
  await University.deleteMany({});
  await University.insertMany(data);
  console.log('Seeded');
  process.exit(0);
}

seed();
