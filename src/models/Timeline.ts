import mongoose from 'mongoose';

const TimelineSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  year: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Timeline = mongoose.models.Timeline || mongoose.model('Timeline', TimelineSchema);
