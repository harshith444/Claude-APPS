import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  incomeType: {
    type: String,
    enum: ['freelance', 'affiliate', 'digital-product', 'niche-site', 'youtube', 'courses', 'stock-dividends', 'rental', 'other'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  estimatedMonthlyIncome: {
    type: Number,
    default: 0
  },
  timeToFirstIncome: {
    type: String,
    default: 'varies'
  },
  resources: [String],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [String],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Course', courseSchema);
