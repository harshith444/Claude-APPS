import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CourseDetail.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function CourseDetail({ user, token }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const fetchCourse = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/courses/${id}`);
      setCourse(response.data);
      setFormData(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load course');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'estimatedMonthlyIncome' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        resources: formData.resources || [],
        tags: formData.tags || []
      };

      const response = await axios.put(`${API_URL}/courses/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCourse(response.data);
      setIsEditing(false);
      alert('Course updated successfully!');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update course');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`${API_URL}/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        navigate('/');
      } catch (err) {
        alert(err.response?.data?.error || 'Failed to delete course');
      }
    }
  };

  if (loading) return <div className="loading">Loading course...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!course) return <div className="error">Course not found</div>;

  const isAuthor = user && course.author._id === user.id;

  return (
    <div className="course-detail-page">
      <div className="course-detail-container">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="edit-form">
            <h2>Edit Course</h2>

            <input
              type="text"
              name="title"
              placeholder="Course Title"
              value={formData.title}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              rows="6"
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
              placeholder="Estimated Monthly Income"
              value={formData.estimatedMonthlyIncome}
              onChange={handleChange}
              min="0"
            />

            <input
              type="text"
              name="timeToFirstIncome"
              placeholder="Time to first income"
              value={formData.timeToFirstIncome}
              onChange={handleChange}
            />

            <div className="form-buttons">
              <button type="submit" className="btn btn-primary">Save Changes</button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="course-header">
              <div className="course-title-section">
                <h1>{course.title}</h1>
                <span className="income-type-badge">{course.incomeType}</span>
              </div>

              {isAuthor && (
                <div className="course-actions">
                  <button onClick={() => setIsEditing(true)} className="btn btn-primary">
                    Edit
                  </button>
                  <button onClick={handleDelete} className="btn btn-danger">
                    Delete
                  </button>
                </div>
              )}
            </div>

            <div className="course-meta-info">
              <div className="meta-item">
                <strong>Difficulty:</strong>
                <span className="difficulty-badge">{course.difficulty}</span>
              </div>
              <div className="meta-item">
                <strong>Monthly Income:</strong>
                <span className="income-amount">${course.estimatedMonthlyIncome}</span>
              </div>
              <div className="meta-item">
                <strong>Time to Income:</strong>
                <span>{course.timeToFirstIncome}</span>
              </div>
              <div className="meta-item">
                <strong>Rating:</strong>
                <span className="rating">⭐ {course.rating} ({course.reviews} reviews)</span>
              </div>
            </div>

            <div className="course-content">
              <h2>Description</h2>
              <p>{course.description}</p>

              {course.resources && course.resources.length > 0 && (
                <div className="resources">
                  <h2>Resources</h2>
                  <ul>
                    {course.resources.map((resource, idx) => (
                      <li key={idx}>{resource}</li>
                    ))}
                  </ul>
                </div>
              )}

              {course.tags && course.tags.length > 0 && (
                <div className="tags">
                  <h2>Tags</h2>
                  <div className="tag-list">
                    {course.tags.map((tag, idx) => (
                      <span key={idx} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="course-footer">
              <div className="author-info">
                <h3>By {course.author.firstName || course.author.username}</h3>
                <p>{course.author.email}</p>
              </div>
              <small>Last updated: {new Date(course.updatedAt).toLocaleDateString()}</small>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CourseDetail;
