# Passive Income Course App - Setup Guide

A full-stack application where users can post, update, and browse passive income opportunities and courses.

## Project Overview

### Tech Stack
- **Backend**: Node.js, Express.js, MongoDB, JWT Authentication
- **Frontend**: React 18, React Router, Axios
- **Database**: MongoDB (local or Atlas)

### Key Features
1. **User Authentication**: Register and login with secure JWT tokens
2. **Post Courses**: Share passive income ideas with detailed information
3. **Update Courses**: Edit course details anytime (only by author)
4. **View Courses**: Browse all courses with filtering and sorting
5. **Course Details**: Comprehensive view with resources and tags

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local instance or MongoDB Atlas connection string)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your settings:
```
MONGODB_URI=mongodb://localhost:27017/passive-income-app
PORT=5000
JWT_SECRET=your_secure_jwt_secret_key
NODE_ENV=development
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. In a new terminal, navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Start the React development server:
```bash
npm start
```

The frontend will open at `http://localhost:3000`

## Usage

### 1. Create an Account
- Click "Register" in the navbar
- Fill in username, email, password
- Submit to create account (auto-login)

### 2. Post a Course
- Click "Post Course" (only visible when logged in)
- Fill in course details:
  - Title
  - Description
  - Income type (freelance, affiliate, etc.)
  - Difficulty level
  - Estimated monthly income
  - Time to first income
  - Resources (URLs or descriptions)
  - Tags
- Submit to create course

### 3. View Courses
- Browse courses on the home page
- Filter by income type or difficulty level
- Click on any course card to view full details

### 4. Update Your Course
- Click on your course to view details
- Click "Edit" button (only shows for your courses)
- Update any field
- Click "Save Changes"

### 5. Delete Your Course
- View your course details
- Click "Delete" button
- Confirm deletion

## API Endpoints

### Courses
- `GET /api/courses` - Get all courses (with optional filters)
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course (requires auth)
- `PUT /api/courses/:id` - Update course (requires auth, author only)
- `DELETE /api/courses/:id` - Delete course (requires auth, author only)

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/me` - Get current user (requires auth)

## Database Models

### User
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  firstName: String,
  lastName: String,
  bio: String,
  expertise: [String],
  createdAt: Date
}
```

### Course
```javascript
{
  title: String (required),
  description: String (required),
  incomeType: String (enum: 'freelance', 'affiliate', 'digital-product', etc.),
  difficulty: String (enum: 'beginner', 'intermediate', 'advanced'),
  estimatedMonthlyIncome: Number,
  timeToFirstIncome: String,
  resources: [String],
  author: ObjectId (ref: User),
  tags: [String],
  rating: Number,
  reviews: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## Development Tips

### Running Both Servers Together
From the root directory:
```bash
npm run dev
```

This runs both backend and frontend in parallel.

### Build for Production
```bash
npm run build
```

### Testing
```bash
npm test
```

## Deployment

### Backend (Heroku, Railway, Render)
1. Set environment variables on hosting platform
2. Push to your hosting platform's git remote
3. Backend will start automatically

### Frontend (Vercel, Netlify, GitHub Pages)
1. Set `REACT_APP_API_URL` environment variable to your backend URL
2. Push to hosting platform
3. Frontend will build and deploy automatically

## Troubleshooting

### MongoDB Connection Error
- Check if MongoDB is running locally: `mongod`
- Or update `MONGODB_URI` in `.env` with your MongoDB Atlas connection string
- Ensure database name exists in MongoDB

### CORS Errors
- Backend must have CORS enabled (it does by default)
- Ensure `REACT_APP_API_URL` matches backend URL

### Authentication Issues
- Clear browser localStorage: `localStorage.clear()`
- Refresh page and log in again
- Check if JWT_SECRET is set in backend `.env`

### Port Already in Use
- Change PORT in backend `.env` file
- React will automatically find an available port

## File Structure

```
.
├── backend/
│   ├── models/
│   │   ├── Course.js
│   │   └── User.js
│   ├── routes/
│   │   ├── courseRoutes.js
│   │   └── userRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── CourseCard.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── CreateCourse.js
│   │   │   └── CourseDetail.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── README.md
└── package.json
```

## Future Enhancements

- User profiles and portfolios
- Course ratings and reviews
- Search functionality
- Image uploads for courses
- Email notifications
- Admin dashboard
- Course categories
- User followers/following
- Comments section
- Advanced filtering

## Support

For issues or questions, check:
1. Console logs in browser (F12)
2. Backend server logs
3. MongoDB connection string
4. Network tab in browser DevTools

Enjoy building and sharing passive income opportunities! 💰
