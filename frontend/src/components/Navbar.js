import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          💰 Passive Income Courses
        </Link>
        <ul className="nav-menu">
          <li><Link to="/" className="nav-link">Home</Link></li>
          {user ? (
            <>
              <li><Link to="/create" className="nav-link">Post Course</Link></li>
              <li className="nav-greeting">Hello, {user.username}!</li>
              <li><button onClick={handleLogout} className="btn btn-logout">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="nav-link">Login</Link></li>
              <li><Link to="/register" className="nav-link">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
