import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer>
      <div>
        <h2>Campus Connect</h2>
        <p>
          Connecting students with campus events, clubs,
          and communities.
        </p>
      </div>

      <div>
        <h3>Quick Links</h3>
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
      </div>

      <p>
        © {new Date().getFullYear()} Campus Connect. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer