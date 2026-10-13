# Movie Discovery — Sprint 08

A responsive movie discovery web application built with React and Vite that allows users to explore movies, search for titles, view movie details, and manage their favorite movies. The project also integrates with **The Data Hub backend API** to support post-related functionality.

## Live Demo

- **Movie Discovery:** https://movie-hub-lemon-mu.vercel.app/
- **Backend API:** https://the-data-hub-u2u2.onrender.com/
- **Frontend Repository:** https://github.com/shahira-sohail/MovieHub
- **Backend Repository:** https://github.com/shahira-sohail/The-Data-Hub

## Features

### Movie Discovery
- Browse popular movies using the TMDB API.
- Search for movies with debounced search functionality.
- View movie details.
- Explore more movies through infinite scrolling.
- Add and manage favorite movies.
- Save favorites using browser local storage.
- Responsive interface for different screen sizes.

### Data Hub Backend Integration
- Retrieve posts from The Data Hub REST API.
- Create new posts through the connected backend.
- Delete posts using the backend API.
- Persist post data in MongoDB Atlas.
- Configure the backend URL using a Vite environment variable.

## Tech Stack

**Frontend**
- React
- Vite
- JavaScript
- HTML5
- CSS3
- TMDB API
- Browser local storage

**Backend Integration**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- REST API
- Render

**Deployment**
- Vercel — frontend
- Render — backend

## Project Architecture

The application combines two connected parts:

1. **Movie Discovery frontend:** React handles the user interface and communicates with TMDB for movie information.
2. **The Data Hub backend:** An Express.js API handles post-related operations and stores data in MongoDB Atlas.

The frontend communicates with The Data Hub through HTTP requests. The backend URL is configurable through an environment variable, allowing the deployed application to use the hosted API instead of a local server.

## Getting Started

### Prerequisites
- Node.js and npm
- Git

### Installation

Clone the frontend repository:

```bash
git clone https://github.com/shahira-sohail/MovieHub.git
cd MovieHub
npm install
```

Create a `.env` file in the frontend root directory and configure the required variables:

```env
VITE_API_URL=https://the-data-hub-u2u2.onrender.com
VITE_TMDB_API_KEY=your_tmdb_api_key
```

Use the TMDB environment variable name expected by your existing application. Do not commit API keys or other secrets to GitHub.

Start the development server:

```bash
npm run dev
```

Open the local URL shown in your terminal.

### Backend Setup

To run The Data Hub backend locally, clone its repository separately:

```bash
git clone https://github.com/shahira-sohail/The-Data-Hub.git
cd The-Data-Hub
npm install
```

Configure the required MongoDB connection string in the backend's `.env` file, following the variable name used by the server.

Start the backend:

```bash
npm start
```

The backend uses port `5000` locally by default, unless configured otherwise.

## API Integration

The frontend uses The Data Hub API for post-related functionality.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/posts` | Retrieve posts |
| POST | `/posts` | Create a post |
| DELETE | `/posts/:id` | Delete a post |

Base API URL: `https://the-data-hub-u2u2.onrender.com`

## Deployment

- The Movie Discovery frontend is deployed on Vercel.
- The Data Hub backend is deployed on Render.
- The frontend's `VITE_API_URL` environment variable points to the deployed backend.
- Frontend environment-variable changes require a new Vercel deployment to take effect.

## Learning Outcomes

- Building reusable React components.
- Working with external APIs.
- Implementing debounced search and infinite scrolling.
- Managing application state and browser local storage.
- Integrating a React frontend with a REST API.
- Connecting backend services to MongoDB.
- Configuring environment variables and deploying applications.

## Author

**Shahira Sohail**

- GitHub: https://github.com/shahira-sohail
- Movie Discovery Repository: https://github.com/shahira-sohail/MovieHub
- The Data Hub Repository: https://github.com/shahira-sohail/The-Data-Hub
