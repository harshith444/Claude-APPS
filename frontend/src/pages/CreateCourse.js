import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CourseForm.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function CreateCourse() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    incomeType: 'affiliate',
    difficulty: 'beginner',
    estimatedMonthlyIncome: 0,
    timeToFirstIncome: 'varies',
    resources: '',
    tags: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'estimatedMonthlyIncome' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const payload = {
        ...formData,
        resources: formData.resources.split(',').map(r => r.trim()).filter(Boolean),
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      };

      const response = await axios.post(`${API_URL}/courses`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      navigate(`/course/${response.data._id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <form onSubmit={handleSubmit} className="course-form">
        <h2>Post a Passive Income Course</h2>
        {error && <div className="error">{error}</div>}

        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Detailed description of the passive income opportunity"
          value={formData.description}
          onChange={handleChange}
          rows="6"
          required
        />

        <select name="incomeType" value={formData.incomeType} onChange={handleChange}>
          <option value="freelance">Freelance</option>
          <option value="affiliate">Affiliate Marketing</option>
          <option value="digital-product">Digital Product</option>
          <option value="niche-site">Niche Site</option>
          <option value="youtube">YouTube</option>
          <option value="courses">Courses</option>
          <option value="stock-dividends">Stock Dividends</option>
          <option value="rental">Rental</option>
          <option value="other">Other</option>
        </select>

        <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <input
          type="number"
          name="estimatedMonthlyIncome"
          placeholder="Estimated Monthly Income ($)"
          value={formData.estimatedMonthlyIncome}
          onChange={handleChange}
          min="0"
        />

        <input
          type="text"
          name="timeToFirstIncome"
          placeholder="Time to first income (e.g., '1-3 months', '6-12 months')"
          value={formData.timeToFirstIncome}
          onChange={handleChange}
        />

        <textarea
          name="resources"
          placeholder="Resources (comma-separated URLs or descriptions)"
          value={formData.resources}
          onChange={handleChange}
          rows="3"
        />

        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={formData.tags}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? 'Creating...' : 'Create Course'}
        </button>
      </form>
    </div>
  );
}

export default CreateCourse;
