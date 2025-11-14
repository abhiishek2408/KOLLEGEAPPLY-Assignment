import express from 'express';
import University from '../models/University.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const list = await University.find({}, { __v: 0 }).lean();
  res.json(list);
});

router.get('/:slug', async (req, res) => {
  const u = await University.findOne({ slug: req.params.slug }, { __v: 0 }).lean();
  if (!u) return res.status(404).json({ error: 'Not found' });
  res.json(u);
});

router.get('/:slug/course-fees', async (req, res) => {
  const u = await University.findOne({ slug: req.params.slug }).lean();
  if (!u) return res.status(404).json({ error: 'Not found' });

  const feeJson = u.courses.map(c => ({ name: c.name, feeRange: c.feeRange, duration: c.duration }));
  res.json({ university: u.name, fees: feeJson });
});

export default router;
