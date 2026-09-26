# Movie Discovery 🎬

A responsive movie discovery web application built with **React** and the **TMDB REST API**. The application allows users to explore popular movies, search for movies, browse results through infinite scrolling, and save their favorite movies locally.

## 🌐 Live URL

`https://movie-hub-lemon-mu.vercel.app/

## ✨ Features

* 🎬 Browse popular movies from TMDB
* 🔎 Search movies using the TMDB Search API
* ⏱️ Debounced search with a 500ms delay
* ♾️ Infinite scrolling using the native `IntersectionObserver` API
* ❤️ Add and remove movies from favorites
* 💾 Store favorite movies using browser `localStorage`
* 📄 Dedicated Favorites page
* ⭐ Display movie ratings
* 📅 Display movie release years
* 🖼️ TMDB movie posters with fallback handling
* 📱 Responsive design for desktop, tablet, and mobile
* ⏳ Loading indicators
* ⚠️ Basic API error handling
* 🌙 Dark movie-focused UI

---

## 🛠️ Technologies Used

### Frontend

* React
* JavaScript
* HTML5
* CSS3
* React Router

### API

* TMDB REST API

### Development Tools

* Vite
* Git
* GitHub
* Vercel

### Browser Storage

* LocalStorage

---

## 📁 Project Structure

```text
movie-discovery/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Hero.jsx
│   │   ├── Hero.css
│   │   ├── Loader.jsx
│   │   ├── Loader.css
│   │   ├── MovieCard.jsx
│   │   ├── MovieCard.css
│   │   ├── Navbar.jsx
│   │   └── Navbar.css
│   │
│   ├── hooks/
│   │   └── useDebounce.js
│   │
│   ├── pages/
│   │   ├── Favorites.jsx
│   │   └── Favorites.css
│   │
│   ├── services/
│   │   └── tmdb.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/your-username/movie-discovery.git
```

### 2. Navigate to the project

```bash
cd movie-discovery
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create environment variables

Create a `.env` file in the project root:

```env
VITE_TMDB_KEY=your_tmdb_api_key
```

Replace `your_tmdb_api_key` with your own TMDB API key.

> Never commit your `.env` file or expose your API key publicly.

### 5. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## 🔑 TMDB API

This project uses the **TMDB API** to retrieve movie information.

The application uses:

### Popular Movies

```text
GET /movie/popular
```

### Movie Search

```text
GET /search/movie
```

Movie poster images are constructed using TMDB's image base URL:

```text
https://image.tmdb.org/t/p/w500/
```

---

## 🔎 Search Functionality

The search feature allows users to search for movies by title.

To improve performance, the application uses a custom `useDebounce` hook.

Instead of sending an API request for every character typed, the application waits for **500 milliseconds** after the user stops typing before making the search request.

Flow:

```text
User types
    ↓
Search query changes
    ↓
500ms debounce
    ↓
TMDB Search API
    ↓
Search results displayed
```

---

## ♾️ Infinite Scroll

The application implements infinite scrolling using the browser's native `IntersectionObserver` API.

A small invisible element is placed below the movie grid.

When the element becomes visible:

```text
User scrolls
    ↓
Bottom trigger becomes visible
    ↓
IntersectionObserver detects it
    ↓
Next TMDB page is requested
    ↓
New movies are appended
```

The existing movies remain on the page while additional results are loaded.

---

## ❤️ Favorites

Users can save movies by clicking the heart button on a movie card.

Favorite movies are stored in the browser's `localStorage`.

Example storage structure:

```json
[
  {
    "id": 12345,
    "title": "Example Movie",
    "poster_path": "/example.jpg"
  }
]
```

The Favorites page retrieves the saved movies from `localStorage` and displays them using the same movie card component.

Users can also remove a movie from their favorites by clicking the heart button again.

---

## 📱 Responsive Design

The interface is designed to work across different screen sizes.

The movie grid adapts based on the available screen width:

* Desktop: multiple movie columns
* Tablet: reduced number of columns
* Mobile: two-column layout

The search interface and navigation are also adjusted for smaller screens.

---

## ⏳ Loading & Error Handling

The application provides a loading indicator while movie data is being fetched.

If an API request fails, an error message is displayed instead of leaving the interface blank.

---

## 🔐 Environment Variables

The TMDB API key is stored in an environment variable:

```env
VITE_TMDB_KEY=your_tmdb_api_key
```

The `.env` file is excluded from Git using `.gitignore`.

For Vercel deployment, the same variable must be added through the project's **Environment Variables** settings.

---

## 📦 Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## ☁️ Deployment

The project can be deployed using **Vercel**.

Basic deployment flow:

```text
GitHub Repository
        ↓
      Vercel
        ↓
   Build Project
        ↓
   Deploy Application
```

Make sure the following environment variable is configured in Vercel:

```text
VITE_TMDB_KEY
```

---

## 🎯 Project Goals

The main goals of this project are:

* Practice consuming REST APIs in React
* Understand asynchronous data fetching
* Implement search functionality
* Understand debouncing
* Implement infinite scrolling
* Practice React state management
* Work with browser `localStorage`
* Implement client-side routing
* Build a responsive frontend
* Deploy a React application

---

## 👩‍💻 Author

**Shahira Sohail**

BCA Student

GitHub:
`https://github.com/shahira-sohail`

LinkedIn:
`https://linkedin.com/in/shahira-sohail-a106b0310`

---

## 📄 License

This project was created for learning and development purposes.

Movie data and images are provided through the TMDB API.
