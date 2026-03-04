import express from 'express';
import Course from '../models/Course.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const { incomeType, difficulty, sort } = req.query;
    let query = {};

    if (incomeType) query.incomeType = incomeType;
    if (difficulty) query.difficulty = difficulty;

    let courses = Course.find(query).populate('author', 'username email firstName lastName');

    if (sort === 'latest') {
      courses = courses.sort({ createdAt: -1 });
    } else if (sort === 'rating') {
      courses = courses.sort({ rating: -1 });
    }

    const result = await courses.exec();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('author');
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create course (protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, incomeType, difficulty, estimatedMonthlyIncome, timeToFirstIncome, resources, tags } = req.body;

    if (!title || !description || !incomeType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const course = new Course({
      title,
      description,
      incomeType,
      difficulty,
      estimatedMonthlyIncome,
      timeToFirstIncome,
      resources: resources || [],
      tags: tags || [],
      author: req.userId
    });

    await course.save();
    await course.populate('author');
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update course (protected)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Check if user is course author
    if (course.author.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized to update this course' });
    }

    const { title, description, incomeType, difficulty, estimatedMonthlyIncome, timeToFirstIncome, resources, tags } = req.body;

    if (title) course.title = title;
    if (description) course.description = description;
    if (incomeType) course.incomeType = incomeType;
    if (difficulty) course.difficulty = difficulty;
    if (estimatedMonthlyIncome !== undefined) course.estimatedMonthlyIncome = estimatedMonthlyIncome;
    if (timeToFirstIncome) course.timeToFirstIncome = timeToFirstIncome;
    if (resources) course.resources = resources;
    if (tags) course.tags = tags;

    course.updatedAt = Date.now();
    await course.save();
    await course.populate('author');

    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete course (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    if (course.author.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized to delete this course' });
    }

    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
