import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import Favorites from './pages/Favorites'
import About from './pages/About'
import Toast from './components/Toast'

function App() {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favoriteMovies')
    return stored ? JSON.parse(stored) : []
  })

  const [toasts, setToasts] = useState([])

  useEffect(() => {
    localStorage.setItem('favoriteMovies', JSON.stringify(favorites))
  }, [favorites])

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, type }])
  }

  const removeToast = (id) => {
    setToasts((prev) => prev.filter(t => t.id !== id))
  }

  const toggleFavorite = (movieId) => {
    setFavorites((prev) => {
      if (prev.includes(movieId)) {
        showToast('Removed from favorites', 'info')
        return prev.filter((id) => id !== movieId)
      }
      showToast('Added to favorites', 'success')
      return [...prev, movieId]
    })
  }

  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => {
      showToast('Removed from favorites', 'info')
      return prev.filter((id) => id !== movieId)
    })
  }

  const isFavorite = (movieId) => favorites.includes(movieId)

  return (
    <>
      <Navbar favCount={favorites.length} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          }
        />
        <Route
          path="/movie/:id"
          element={
            <MovieDetail
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              removeFromFavorites={removeFromFavorites}
            />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>

      <div className="toast-container">
        {toasts.map((t) => (
          <Toast
            key={t.id}
            message={t.message}
            type={t.type}
            onClose={() => removeToast(t.id)}
          />
        ))}
      </div>
    </>
  )
}

export default App
