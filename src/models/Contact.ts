import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
    seen: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['new', 'contacted', 'quoted', 'won', 'lost'],
      default: 'new',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    notes: { type: String, default: '' },
    followUpAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
