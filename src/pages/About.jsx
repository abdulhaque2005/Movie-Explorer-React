import { IoInformationCircleOutline, IoSearchOutline, IoFunnelOutline, IoStarOutline, IoCloudOutline } from 'react-icons/io5'
import { MdLocalMovies, MdRoute } from 'react-icons/md'
import { FaReact } from 'react-icons/fa'
import { SiVite } from 'react-icons/si'

function About() {
    return (
        <div className="page">
            <div className="page-header">
                <h1>
                    <IoInformationCircleOutline className="h-icon" />
                    <span className="grad-text">About MovieXplorer</span>
                </h1>
                <p>Your personal movie discovery companion</p>
            </div>

            <div className="about-bento">
                <div className="bento-card col-span-2">
                    <h2><IoInformationCircleOutline className="b-icon" /> What is MovieXplorer?</h2>
                    <p>
                        MovieXplorer is a modern React application that lets you search,
                        discover, and save your favourite movies. Built elegantly to demonstrate
                        real-world React patterns including seamless routing, custom hooks,
                        dynamic API integration, and persistent localStorage state management.
                    </p>
                </div>

                <div className="bento-card col-span-1">
                    <h2><IoCloudOutline className="b-icon" /> The API</h2>
                    <p>
                        Powered by the <strong>OMDb API</strong> (Open Movie Database) —
                        a lightning-fast RESTful service providing comprehensive movie data, posters, and ratings.
                    </p>
                    <code className="api-endpoint">https://www.omdbapi.com/</code>
                </div>

                <div className="bento-card col-span-1">
                    <h2><IoStarOutline className="b-icon" /> Core Features</h2>
                    <ul className="bento-list">
                        <li><IoSearchOutline /> Real-time instant search</li>
                        <li><IoFunnelOutline /> Smart year & type filtering</li>
                        <li><MdLocalMovies /> Comprehensive detail views</li>
                        <li><IoStarOutline /> Persistent favorites saving</li>
                    </ul>
                </div>

                <div className="bento-card col-span-2 tech-stack-card">
                    <h2><MdRoute className="b-icon" /> Technology Stack</h2>
                    <div className="tech-flex">
                        <span className="tech-pill"><FaReact /> React 19</span>
                        <span className="tech-pill"><MdRoute /> React Router v7</span>
                        <span className="tech-pill"><SiVite /> Vite Build Tool</span>
                        <span className="tech-pill">Hooks (useState, useEffect)</span>
                        <span className="tech-pill">localStorage API</span>
                        <span className="tech-pill">CSS Modules / Variables</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
