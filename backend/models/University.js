import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: String,
  feeRange: String,
  duration: String,
  seats: Number
});

const universitySchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: String,
  universityType: String,
  universityBrochureLink: String,
  overview: String,
  courses: [courseSchema],
  placements: {
    highest: String,
    average: String,
    recruiters: [String]
  },
  facilities: [String],
  contact: {
    phone: String,
    email: String
  }
});

export default mongoose.model('University', universitySchema);
