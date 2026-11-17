
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>Campus Connect</h2>
          <p>
            Connecting students with campus events,
            clubs, and communities.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/clubs">Clubs</Link></li>
            <li><Link to="/create-event">Create Event</Link></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Campus Connect.
          All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
