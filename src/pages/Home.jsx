import { useState, useEffect } from 'react'
import { IoSearchOutline, IoFunnelOutline } from 'react-icons/io5'
import { MdLocalMovies } from 'react-icons/md'
import MovieCard from '../components/MovieCard'

const API_KEY = 'b9bd48a6'

function Home({ toggleFavorite, isFavorite }) {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterYear, setFilterYear] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [sortOrder, setSortOrder] = useState('relevant')
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [currentTerm, setCurrentTerm] = useState('')

  const fetchMovies = async (term, pageNum = 1) => {
    if (!term) return
    if (pageNum === 1) {
      setLoading(true); setError(null); setMovies([])
    }
    setCurrentTerm(term)

    let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(term)}&page=${pageNum}`

    try {
      const res = await fetch(url)
      const data = await res.json()

      if (data.Response === 'True') {
        setMovies(prev => pageNum === 1 ? data.Search : [...prev, ...data.Search])
        setTotalResults(parseInt(data.totalResults) || 0)
        setPage(pageNum)
      } else if (pageNum === 1) {
        setMovies([]); setError(data.Error || 'No movies found.')
        setTotalResults(0)
      }
    } catch {
      if (pageNum === 1) { setMovies([]); setError('Failed to fetch. Check your connection.') }
    } finally {
      if (pageNum === 1) setLoading(false)
    }
  }

  const loadMore = () => {
    if (movies.length < totalResults) {
      fetchMovies(currentTerm, page + 1)
    }
  }

  useEffect(() => {
    const defaults = ['avengers', 'avatar', 'alien', 'american', 'assassin', 'ant-man', 'aquaman']
    const randomDefault = defaults[Math.floor(Math.random() * defaults.length)]
    fetchMovies(randomDefault)
  }, [])

  useEffect(() => {
    if (currentTerm) {

    }
  }, [filterYear, filterType])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim() && query.trim() !== currentTerm) {
      fetchMovies(query.trim(), 1)
    }
  }

  const displayMovies = movies.filter(m => {
    if (filterYear && !m.Year.includes(filterYear)) return false
    if (filterType !== 'all' && m.Type !== filterType) return false
    return true
  }).sort((a, b) => {
    if (sortOrder === 'relevant') return 0
    const ya = parseInt(a.Year.substring(0, 4)) || 0
    const yb = parseInt(b.Year.substring(0, 4)) || 0
    return sortOrder === 'newest' ? yb - ya : ya - yb
  })

  return (
    <div className="page">
      <div className="page-header">
        <h1>
          <MdLocalMovies className="h-icon" />
          <span className="grad-text">Discover Movies</span>
        </h1>
        <p>Search for your favourite movies, series, and more</p>
      </div>

      <div className="search-bar">
        <input
          id="search-input"
          type="text"
          placeholder="Search for a movie or series…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch(e)}
        />
        <button id="search-btn" onClick={handleSearch}>
          <IoSearchOutline size={17} /> Search
        </button>
      </div>

      <div className="filter-bar">
        <IoFunnelOutline className="fi" />
        <label htmlFor="yr">Year</label>
        <input
          id="yr"
          type="number"
          placeholder="e.g. 2023"
          value={filterYear}
          onChange={e => setFilterYear(e.target.value)}
          min="1900"
          max="2030"
        />
        <label htmlFor="tp">Type</label>
        <select id="tp" value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="all">All</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>

        <label htmlFor="srt">Version</label>
        <select id="srt" value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
          <option value="relevant">Relevant</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {loading && (
        <div className="movie-grid">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="movie-card skeleton-card">
              <div className="skeleton-poster"></div>
              <div className="card-info" style={{ gap: '10px' }}>
                <div className="skeleton-line title"></div>
                <div className="skeleton-line title" style={{ width: '60%' }}></div>
                <div className="skeleton-line meta" style={{ marginTop: 'auto' }}></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="state-box">
          <MdLocalMovies className="state-icon err" />
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && displayMovies.length === 0 && (
        <div className="state-box">
          <MdLocalMovies className="state-icon" />
          <p>No movies match your filters.</p>
        </div>
      )}

      {!loading && !error && displayMovies.length > 0 && (
        <>
          <div className="movie-grid">
            {displayMovies.map((movie, idx) => (
              <MovieCard
                key={`${movie.imdbID}-${idx}`}
                movie={movie}
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite(movie.imdbID)}
              />
            ))}
          </div>

          {movies.length < totalResults && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3.5rem', marginBottom: '2rem' }}>
              <button className="load-more-btn" onClick={loadMore}>
                Load More Results
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Home