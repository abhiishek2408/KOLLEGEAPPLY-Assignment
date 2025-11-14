import express from 'express';
import Lead from '../models/Lead.js';
import fetch from 'node-fetch';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { fullName, email, phone, state, courseInterested, intakeYear, universityName, consent } = req.body;

    if (!fullName || !email || !phone) return res.status(400).json({ error: 'Missing required fields' });
    if (!/^\d{10}$/.test(phone)) return res.status(400).json({ error: 'Phone must be 10 digits (India)' });
    if (!consent) return res.status(400).json({ error: 'Consent required' });

    const lead = new Lead({ fullName, email, phone, state, courseInterested, intakeYear, universityName, consent });
    await lead.save();

    const pdUrl = process.env.PIPEDREAM_ENDPOINT;
    if (pdUrl) {
      await fetch(pdUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, phone, state, courseInterested, intakeYear, universityName, consent, receivedAt: new Date() })
      });
    }

    return res.json({ message: 'Lead saved' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;
