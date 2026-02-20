import { Link } from 'react-router-dom'
import { IoEye, IoStar, IoStarOutline, IoCalendarOutline, IoFilmOutline } from 'react-icons/io5'

const FALLBACK = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop'

function MovieCard({ movie, toggleFavorite, isFavorite }) {
    const poster = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : FALLBACK

    return (
        <div className="movie-card">
            
            <div className="poster-wrap">
                <img
                    className="poster-img"
                    src={poster}
                    alt={movie.Title}
                    loading="lazy"
                    onError={(e) => { e.target.onError = null; e.target.src = FALLBACK }}
                />

                <span className="poster-type-pill">
                    <IoFilmOutline size={11} /> {movie.Type}
                </span>

                <button
                    className={`poster-fav-btn${isFavorite ? ' starred' : ''}`}
                    onClick={(e) => { e.preventDefault(); toggleFavorite(movie.imdbID); }}
                    title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                >
                    {isFavorite ? <IoStar size={15} /> : <IoStarOutline size={15} />}
                </button>

                <div className="poster-overlay">
                    <Link to={`/movie/${movie.imdbID}`} className="overlay-view-btn">
                        <IoEye size={15} /> View Details
                    </Link>
                </div>
            </div>

            <div className="card-info">
                <h3 className="card-title">{movie.Title}</h3>

                <div className="card-meta">
                    <span className="card-meta-item">
                        <IoCalendarOutline size={13} /> {movie.Year}
                    </span>
                    <span className="card-meta-item" style={{ marginLeft: 'auto', color: 'var(--ind)' }}>
                        {movie.Type.toUpperCase()}
                    </span>
                </div>

                <div className="card-cta">
                    <Link to={`/movie/${movie.imdbID}`} className="btn btn-primary btn-sm">
                        <IoEye size={14} /> Details
                    </Link>
                    <button
                        className={`btn btn-star btn-sm${isFavorite ? ' starred' : ''}`}
                        onClick={(e) => { e.preventDefault(); toggleFavorite(movie.imdbID); }}
                    >
                        {isFavorite ? <IoStar size={15} /> : <IoStarOutline size={15} />}
                        {isFavorite ? 'Saved' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MovieCard
