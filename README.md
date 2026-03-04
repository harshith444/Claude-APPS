# Passive Income Course App

A platform where users can post different types of passive income opportunities and update their courses.

## Features

- **Post Courses**: Share passive income ideas and courses
- **Update Courses**: Modify course details anytime
- **View Courses**: Browse all available courses
- **User Authentication**: Secure user accounts
- **Course Management**: Create, read, update, delete courses

## Project Structure

```
.
├── backend/          # Express.js API
├── frontend/         # React UI
└── README.md
```

## Getting Started

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## API Endpoints

- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create a new course
- `GET /api/courses/:id` - Get course details
- `PUT /api/courses/:id` - Update a course
- `DELETE /api/courses/:id` - Delete a course
