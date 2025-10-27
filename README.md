# Contact Management Application

This is a full-stack web application with a React frontend and Node.js/Express backend that allows users to submit contact information through a form and provides an admin console to manage these submissions.

## Project Overview

The application consists of:
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express.js + PostgreSQL
- Authentication: JWT tokens stored in httpOnly cookies

## Features

### Client Application

1. **Contact Us Page**
   - Displays company contact information
   - Form with validation for:
     - First name (min 2 characters)
     - Last name (min 2 characters)
     - Email (valid email format)
     - Phone (optional)
     - Message (min 10 characters)
   - On successful submission, redirects to a "Thank You" page

2. **Admin Console**
   - Authentication required (login with admin credentials)
   - Lists all contact submissions
   - Options to:
     - Mark contacts as verified (status update)
     - Delete contacts
   - Real-time updates after actions

## Prerequisites

- Docker and Docker Compose installed on your machine
- Git (to clone the repository)

## Deployment with Docker

This application is fully containerized. DB tables and a default admin are created automatically on first run.

### Quick Start (git clone and run)

1) Clone the repository
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2) Create environment file
   - Backend `backend/.env` (copy and edit as needed):
     ```env
     PORT=5000
     CLIENT_URL=http://localhost:5173
     DB_HOST=db
     DB_PORT=5432
     DB_USER=postgres
     DB_PASSWORD=postgres
     DB_NAME=user_db
     JWT_SECRET=123456
     NODE_ENV=development
     ```
   - Frontend: no .env is required. The app currently calls the backend at `http://localhost:5000` directly.

3) Start all services
   ```bash
   docker-compose up -d --build
   ```

4) Access the application
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - Database: localhost:5432 (PostgreSQL)

### Default Credentials

- Admin Login (auto-seeded on first run):
  - Username: `admin`
  - Password: `admin`

### Services Overview

The `docker-compose.yml` file defines three services:

1. **db** (PostgreSQL)
   - Database for storing admin users and contact submissions
   - Data persisted in a Docker volume
   - Initializes with required tables and a default admin user

2. **backend** (Node.js/Express)
   - REST API for contact management
   - Connects to the PostgreSQL database
   - Exposes API on port 5000
    - CORS origin is driven by `CLIENT_URL`

3. **frontend** (React/Vite)
   - Vite dev server
   - Accessible on port 5173
   - Uses `VITE_BACKEND_URL` to call the API

### Environment Variables

Create `backend/.env` and `frontend/.env` as shown in Quick Start.

### Data Persistence

- PostgreSQL data is stored in a Docker volume named `postgres_data`
- Data persists across container restarts

### Development vs Production

This setup is for development. For production, consider:

1. Using a reverse proxy (like Nginx or Traefik) for SSL termination
2. Setting stronger passwords and secrets
3. Using named volumes for better data management
4. Configuring proper backup strategies for the database

## Automatic Database Initialization

On first run, the database container executes `init-scripts/init-db.sh` to:
- Create tables `admins` and `contacts`
- Create helpful indexes
- Upsert a default admin user (name `admin` / password `admin`)

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with admin credentials
- `POST /api/auth/logout` - Logout and clear session

### Contact Management
- `POST /api/contact` - Submit contact information (public)
- `GET /api/contact` - Get all contacts (admin only)
- `PATCH /api/contact/:id` - Update contact status (admin only)
- `DELETE /api/contact/:id` - Delete a contact (admin only)

## Project Structure

```
├── backend/
│   ├── config/
│   │   └── db.js          # PostgreSQL database configuration
│   ├── routes/
│   │   ├── auth.js        # Authentication routes
│   │   └── contact.js     # Contact management routes
│   ├── middleware/
│   │   └── auth.js        # Authentication middleware
│   ├── server.js          # Main Express server entry point
│   ├── package.json       # Backend dependencies and scripts
│   └── Dockerfile         # Backend Docker configuration
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component with routing
│   │   └── main.jsx       # Application entry point
│   ├── package.json       # Frontend dependencies and scripts
│   ├── Dockerfile         # Frontend Docker configuration
│   └── nginx.conf         # Nginx configuration for frontend
├── init-scripts/
│   └── init-db.sh         # Database initialization script
├── docker-compose.yml     # Multi-container orchestration
└── README.md             # This file
```

## Useful Docker Commands

- Start all services: `docker-compose up -d`
- Stop all services: `docker-compose down`
- View logs: `docker-compose logs -f <service-name>`
- Access database shell: `docker-compose exec db psql -U postgres user_db`
- Access backend shell: `docker-compose exec backend sh`
- Rebuild containers: `docker-compose up -d --build`

## Troubleshooting

1. **Port already in use**: Make sure no other services are running on ports 5173, 5000, and 5432
2. **Database connection issues**: Check that the db service is running and healthy
3. **Frontend not loading**: Ensure the backend service is running and accessible
