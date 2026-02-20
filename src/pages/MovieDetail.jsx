import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    IoArrowBackOutline,
    IoStarOutline, IoStar,
    IoCalendarOutline, IoTimeOutline,
} from 'react-icons/io5'
import { MdLocalMovies, MdPeopleOutline, MdOutlineVideoLibrary } from 'react-icons/md'

const API_KEY = 'b9bd48a6'
const FALLBACK = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop'

function MovieDetail({ toggleFavorite, isFavorite }) {
    const { id } = useParams()
    const navigate = useNavigate()

    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const load = async () => {
            setLoading(true); setError(null)
            try {
                const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`)
                const data = await res.json()
                data.Response === 'True' ? setMovie(data) : setError(data.Error || 'Movie not found.')
            } catch {
                setError('Failed to fetch movie details.')
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [id])

    if (loading) return (
        <div className="page">
            <div className="state-box"><div className="spinner" /><p>Loading…</p></div>
        </div>
    )

    if (error) return (
        <div className="page">
            <button className="btn-back" onClick={() => navigate(-1)}>
                <IoArrowBackOutline /> Back
            </button>
            <div className="state-box">
                <MdLocalMovies className="state-icon err" />
                <p>{error}</p>
            </div>
        </div>
    )

    if (!movie) return null

    const poster = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : FALLBACK
    const fav = isFavorite(movie.imdbID)

    return (
        <div className="page">
            <button className="btn-back" onClick={() => navigate(-1)}>
                <IoArrowBackOutline /> Back to Movies
            </button>

            <div className="detail-grid">
                
                <div className="detail-poster-wrap">
                    <img
                        className="detail-poster-img"
                        src={poster}
                        alt={movie.Title}
                        onError={(e) => { e.target.onError = null; e.target.src = FALLBACK }}
                    />
                </div>

                <div className="detail-info">
                    <h1 className="detail-title">{movie.Title}</h1>

                    <div className="detail-tags">
                        <span className="tag"><IoCalendarOutline />{movie.Year}</span>
                        {movie.Rated && movie.Rated !== 'N/A' && <span className="tag">{movie.Rated}</span>}
                        {movie.Runtime && movie.Runtime !== 'N/A' && <span className="tag"><IoTimeOutline />{movie.Runtime}</span>}
                        {movie.Genre && movie.Genre.split(', ').map(g => (
                            <span key={g} className="tag genre"><MdOutlineVideoLibrary />{g}</span>
                        ))}
                    </div>

                    {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                        <div className="rating-pill">
                            <IoStar className="r-star" />
                            <span className="r-val">{movie.imdbRating}</span>
                            <span className="r-label">/ 10 &nbsp;IMDb</span>
                        </div>
                    )}

                    <div className="detail-section">
                        <h3><MdLocalMovies /> Plot</h3>
                        <p>{movie.Plot}</p>
                    </div>

                    {movie.Director && movie.Director !== 'N/A' && (
                        <div className="detail-section">
                            <h3><MdOutlineVideoLibrary /> Director</h3>
                            <p>{movie.Director}</p>
                        </div>
                    )}

                    {movie.Actors && movie.Actors !== 'N/A' && (
                        <div className="detail-section">
                            <h3><MdPeopleOutline /> Cast</h3>
                            <p>{movie.Actors}</p>
                        </div>
                    )}

                    <div style={{ paddingTop: '.5rem' }}>
                        <button
                            className={`btn btn-lg ${fav ? 'btn-star starred' : 'btn-primary'}`}
                            onClick={() => toggleFavorite(movie.imdbID)}
                        >
                            {fav
                                ? <><IoStar size={17} /> Remove from Favorites</>
                                : <><IoStarOutline size={17} /> Add to Favorites</>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail
