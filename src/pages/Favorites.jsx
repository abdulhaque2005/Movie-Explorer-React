import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoStar, IoEye, IoTrashOutline, IoHeartDislikeOutline, IoFilmOutline, IoCalendarOutline } from 'react-icons/io5'
import { MdLocalMovies } from 'react-icons/md'
import MovieCard from '../components/MovieCard'

const API_KEY = 'b9bd48a6'
const FALLBACK = 'https://placehold.co/300x450/0f1729/818cf8.png?text=No+Poster'

function Favorites({ favorites, removeFromFavorites }) {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!favorites.length) { setMovies([]); return }
        const load = async () => {
            setLoading(true)
            try {
                const results = await Promise.all(
                    favorites.map(id =>
                        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`).then(r => r.json())
                    )
                )
                setMovies(results.filter(m => m.Response === 'True'))
            } catch { setMovies([]) }
            finally { setLoading(false) }
        }
        load()
    }, [favorites])

    const Header = () => (
        <div className="page-header">
            <h1>
                <IoStar className="h-icon" style={{ color: '#f59e0b' }} />
                <span className="grad-text">Your Favorites</span>
            </h1>
            <p>Movies you love, all in one place</p>
        </div>
    )

    if (loading) return (
        <div className="page">
            <Header />
            <div className="state-box"><div className="spinner" /><p>Loading your favorites…</p></div>
        </div>
    )

    if (!favorites.length) return (
        <div className="page">
            <Header />
            <div className="state-box">
                <IoHeartDislikeOutline className="state-icon" />
                <p>No favorite movies added.</p>
                <Link to="/" className="btn btn-primary btn-lg" style={{ marginTop: '1rem' }}>
                    <MdLocalMovies size={18} /> Browse Movies
                </Link>
            </div>
        </div>
    )

    return (
        <div className="page">
            <Header />

            <div className="fav-stats">
                <div className="stat-card">
                    <span className="s-label">Total Saved</span>
                    <span className="s-val">{movies.length}</span>
                </div>
            </div>

            <div className="movie-grid">
                {movies.map(movie => (
                    <MovieCard
                        key={movie.imdbID}
                        movie={movie}
                        toggleFavorite={removeFromFavorites}
                        isFavorite={true}
                    />
                ))}
            </div>
        </div>
    )
}

export default Favorites
