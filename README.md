# QuickHire — Job Board Application

A full-stack job board application built with the MERN stack. Users can browse and search job listings, view job details, and submit applications. Admins can post and delete jobs through a built-in admin panel.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js + Vite |
| Styling | Tailwind CSS |
| Routing | React Router v7 |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| Auth | Firebase Authentication |
| HTTP Client | Axios |

---

## Features

- **Job Listings Page** — Browse all jobs with search by keyword/location and filter by category
- **Job Detail Page** — Full job info with an Apply Now form (name, email, resume URL, cover note)
- **Admin Panel** — Post new jobs and delete existing listings
- **Responsive UI** — Fully responsive across mobile, tablet, and desktop
- **Form Validation** — All forms validate required fields, email format, and URL format

---

## Project Structure

```
quickhire/
├── client/                     # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/             # Images, logos, icons
│   │   │   ├── Pic.png
│   │   │   ├── dashboard.png
│   │   │   └── logos/
│   │   │       ├── vodafone.png
│   │   │       ├── intel.png
│   │   │       ├── tesla.png
│   │   │       ├── amd.png
│   │   │       └── talkit.png
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Companies.jsx
│   │   │   ├── Category.jsx
│   │   │   ├── PostJobBanner.jsx
│   │   │   ├── FeaturedJobs.jsx
│   │   │   ├── LatestJobs.jsx
│   │   │   ├── JobCard.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/              # Page-level components
│   │   │   ├── Home.jsx
│   │   │   ├── AllJobs.jsx
│   │   │   ├── JobDetail.jsx
│   │   │   └── Admin.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.local
│   └── package.json
│
└── server/                     # Express backend
    ├── server.js
    ├── .env
    └── package.json
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- A [Firebase](https://firebase.google.com/) project (for authentication)

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/quickhire.git
cd quickhire
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server/` folder:

```env
PORT=5000
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
```

Start the server:

```bash
node server.js
```

The server will run at `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd client
npm install
```

Create a `.env.local` file in the `client/` folder:

```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Start the frontend:

```bash
npm run dev
```

The app will run at `http://localhost:5173`

---

### 4. Seed the Database

Once your server is running, populate it with sample job data by making a single POST request:

```bash
# Using curl
curl -X POST http://localhost:5000/api/seed

# Or open this URL in Postman / Insomnia as a POST request
```

This will insert 16 sample jobs (8 featured + 8 latest) matching the design.

---

## API Reference

### Jobs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/jobs` | Get all jobs (supports query filters) |
| `GET` | `/api/jobs/:id` | Get a single job by ID |
| `POST` | `/api/jobs` | Create a new job (Admin) |
| `DELETE` | `/api/jobs/:id` | Delete a job (Admin) |
| `POST` | `/api/seed` | Seed sample data (dev only) |

#### Query Parameters for `GET /api/jobs`

| Param | Type | Example | Description |
|-------|------|---------|-------------|
| `keyword` | string | `?keyword=designer` | Search title, company, description |
| `location` | string | `?location=Berlin` | Filter by location |
| `category` | string | `?category=Marketing` | Filter by category |
| `featured` | boolean | `?featured=true` | Only featured jobs |
| `limit` | number | `?limit=8` | Limit number of results |
| `sort` | string | `?sort=newest` | Sort by newest first |

### Applications

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/applications` | Submit a job application |
| `GET` | `/api/applications` | Get all applications (Admin) |
| `GET` | `/api/applications/:jobId` | Get applications for a specific job |

#### POST `/api/applications` — Request Body

```json
{
  "job_id": "64abc123...",
  "name": "John Doe",
  "email": "john@example.com",
  "resume_link": "https://linkedin.com/in/johndoe",
  "cover_note": "I am excited to apply for this position..."
}
```

---

## Database Models

### Job

```json
{
  "_id": "ObjectId",
  "title": "Brand Designer",
  "company": "Dropbox",
  "location": "San Francisco, USA",
  "category": "Design",
  "type": "Full Time",
  "description": "Job description here...",
  "featured": true,
  "logo": null,
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

### Application

```json
{
  "_id": "ObjectId",
  "job_id": "ObjectId (ref: jobs)",
  "name": "John Doe",
  "email": "john@example.com",
  "resume_link": "https://example.com/resume.pdf",
  "cover_note": "Cover note text here...",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

---

## Available Categories

`Design` · `Sales` · `Marketing` · `Finance` · `Technology` · `Engineering` · `Business` · `Human Resource`

---

## Environment Variables Summary

### Server — `.env`

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `DB_USER` | MongoDB Atlas username |
| `DB_PASS` | MongoDB Atlas password |

### Client — `.env.local`

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend base URL (e.g. `http://localhost:5000`) |
| `VITE_FIREBASE_API_KEY` | Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |

---

## Deployment

### Frontend — Vercel

1. Push your `client/` folder to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Set the root directory to `client`
4. Add all `VITE_*` environment variables in the Vercel dashboard
5. Deploy

### Backend — Render

1. Push your `server/` folder to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Set the root directory to `server`
4. Set the start command to `node server.js`
5. Add `DB_USER` and `DB_PASS` as environment variables
6. After deploying, update `VITE_API_URL` in Vercel to your Render URL

---

## Demo Walkthrough (for submission)

A screen recording should cover:

1. Home page — hero section, categories, featured jobs, latest jobs
2. Searching and filtering jobs on the `/jobs` page
3. Clicking a job to view full details
4. Filling out and submitting the Apply Now form
5. Visiting `/admin` to post a new job and delete an existing one

---

## License

This project was built as part of a technical assessment task. All rights reserved.
