import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CourseCard from '../components/CourseCard';
import './Home.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ incomeType: '', difficulty: '' });

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.incomeType) params.append('incomeType', filters.incomeType);
      if (filters.difficulty) params.append('difficulty', filters.difficulty);
      params.append('sort', 'latest');

      const response = await axios.get(`${API_URL}/courses?${params}`);
      setCourses(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load courses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="home-page">
      <div className="hero">
        <h1>Discover Passive Income Opportunities</h1>
        <p>Learn proven strategies to earn money while you sleep</p>
      </div>

      <div className="filters">
        <select
          name="incomeType"
          value={filters.incomeType}
          onChange={handleFilterChange}
        >
          <option value="">All Types</option>
          <option value="freelance">Freelance</option>
          <option value="affiliate">Affiliate Marketing</option>
          <option value="digital-product">Digital Product</option>
          <option value="niche-site">Niche Site</option>
          <option value="youtube">YouTube</option>
          <option value="courses">Courses</option>
          <option value="stock-dividends">Stock Dividends</option>
          <option value="rental">Rental</option>
        </select>

        <select
          name="difficulty"
          value={filters.difficulty}
          onChange={handleFilterChange}
        >
          <option value="">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="courses-grid">
        {loading ? (
          <div className="loading">Loading courses...</div>
        ) : courses.length > 0 ? (
          courses.map(course => (
            <CourseCard key={course._id} course={course} />
          ))
        ) : (
          <div className="no-courses">No courses found. Start by creating one!</div>
        )}
      </div>
    </div>
  );
}

export default Home;
