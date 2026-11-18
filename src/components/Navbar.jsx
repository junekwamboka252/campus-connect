
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <header className="navbar">
      <nav className="navbar-container">

        <div className="navbar-logo">
          <Link to="/">Campus Connect</Link>
        </div>

        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/events">Events</Link>
          </li>

          <li>
            <Link to="/clubs">Clubs</Link>
          </li>

          <li>
            <Link to="/create-event" className="navbar-button">
              Create Event
            </Link>
          </li>
        </ul>

      </nav>
    </header>
  )
}

export default Navbar
