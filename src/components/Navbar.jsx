
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header>
      <nav>
        
        <div>
          <Link to="/">Campus Connect</Link>
        </div>

        {/* Navigation Links */}
        <ul>
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
            <Link to="/create-event">Create Event</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
