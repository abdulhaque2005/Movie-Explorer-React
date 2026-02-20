import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { MdLocalMovies } from 'react-icons/md'
import {
    IoHomeOutline, IoHome,
    IoStarOutline, IoStar,
    IoInformationCircleOutline, IoInformationCircle,
} from 'react-icons/io5'

function Navbar({ favCount }) {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', fn, { passive: true })
        return () => window.removeEventListener('scroll', fn)
    }, [])

    return (
        <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
            <div className="navbar-inner">

                <NavLink to="/" className="navbar-logo">
                    <span className="logo-icon-wrap">
                        <MdLocalMovies />
                    </span>
                    <span className="logo-text">
                        Movie<span>Xplorer</span>
                    </span>
                </NavLink>

                <ul className="navbar-links">

                    <li>
                        <NavLink to="/" end>
                            {({ isActive }) => (
                                <>
                                    {isActive
                                        ? <IoHome className="nav-icon" />
                                        : <IoHomeOutline className="nav-icon" />}
                                    Home
                                </>
                            )}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/favorites">
                            {({ isActive }) => (
                                <>
                                    {isActive
                                        ? <IoStar className="nav-icon" />
                                        : <IoStarOutline className="nav-icon" />}
                                    Favorites
                                    {favCount > 0 && (
                                        <span className="fav-badge">{favCount}</span>
                                    )}
                                </>
                            )}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/about">
                            {({ isActive }) => (
                                <>
                                    {isActive
                                        ? <IoInformationCircle className="nav-icon" />
                                        : <IoInformationCircleOutline className="nav-icon" />}
                                    About
                                </>
                            )}
                        </NavLink>
                    </li>

                </ul>
            </div>
        </nav>
    )
}

export default Navbar
