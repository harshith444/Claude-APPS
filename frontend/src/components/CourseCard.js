import React from 'react';
import { Link } from 'react-router-dom';
import './CourseCard.css';

function CourseCard({ course }) {
  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'beginner': return '#27ae60';
      case 'intermediate': return '#f39c12';
      case 'advanced': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  return (
    <Link to={`/course/${course._id}`} className="course-card-link">
      <div className="course-card">
        <div className="course-header">
          <h3>{course.title}</h3>
          <span className="income-badge">{course.incomeType}</span>
        </div>

        <p className="course-description">{course.description.substring(0, 100)}...</p>

        <div className="course-meta">
          <span className="difficulty" style={{ background: getDifficultyColor(course.difficulty) }}>
            {course.difficulty}
          </span>
          <span className="income">${course.estimatedMonthlyIncome}/mo</span>
        </div>

        <div className="course-footer">
          <div className="rating">
            ⭐ {course.rating || 'N/A'} ({course.reviews || 0})
          </div>
          <small>By {course.author?.username || 'Anonymous'}</small>
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;
