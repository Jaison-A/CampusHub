# CampusHub - College Notes & Assignment Management System

## Overview

CampusHub is a full-stack MERN application designed to help students, teachers, class monitors, and administrators manage academic resources efficiently.

The platform allows authorized users to upload study materials, create assignments, track student progress, and manage academic activities in one centralized system.

---

## Features

### Authentication & Authorization

- User Registration
- User Login
- JWT Authentication
- Role-Based Access Control (RBAC)

### User Roles

#### Student

- View Notes
- View Assignments
- Track Assignment Progress
- Update Assignment Status
- View Profile

#### Teacher / Monitor / Admin

- Create Notes
- Edit Notes
- Delete Notes
- Create Assignments
- Edit Assignments
- Delete Assignments
- Manage Academic Resources

### Notes Management

- Upload Course Notes
- Department-wise Notes
- Semester-wise Notes
- PDF Viewing
- PDF Download

### Assignment Management

- Create Assignments
- Set Due Dates
- Track Completion Status
- Monitor Student Progress

### Dashboard

- Total Assignments
- Completed Assignments
- Pending Assignments
- Progress Statistics

### Profile Management

- User Information
- Department Details
- Semester Details
- Role Information

---

## Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- JWT Authentication
- Multer

### Database

- MongoDB Atlas
- Mongoose

### File Storage

- Cloudinary

### Deployment

- Frontend: Vercel
- Backend: Render

---

## Project Structure

CampusHub

├── client/

│ ├── src/

│ ├── public/

│ └── package.json

│

├── server/

│ ├── src/

│ ├── controllers/

│ ├── models/

│ ├── routes/

│ ├── middlewares/

│ └── package.json

│

└── README.md

---

## Screenshots

### Login Page

![login](<Screenshot 2026-06-24 193204.png>)

### Dashboard page

![dashboard](<Screenshot 2026-06-24 193348.png>)

### Notes Page

![notes page as Student](<../../../../OneDrive/Pictures/Screenshots/Screenshot 2026-06-24 193506.png>)

### Assignments Page

![assignment page as student](<Screenshot 2026-06-24 193458.png>)

### Profile Page

![profile as student](<Screenshot 2026-06-24 193445.png>)

---

## Installation

### Clone Repository

```bash
git clone
cd campushub
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Start Backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## Future Improvements

- Announcement Module
- Notification System
- Calendar View
- Assignment Submission Upload
- Email Notifications
- Mobile App Version

---

## Live Demo

Frontend: Soon
Backend: Soon

---

## Author

Jaison A
