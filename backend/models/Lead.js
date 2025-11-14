import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  state: { type: String },
  courseInterested: { type: String },
  intakeYear: { type: String },
  universityName: { type: String },
  consent: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Lead', leadSchema);
