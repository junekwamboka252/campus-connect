
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <main className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">YOUR CAMPUS, YOUR COMMUNITY</span>

          <h1>
            Welcome to <span>Campus Connect</span>
          </h1>

          <p>
            Discover exciting campus events, connect with
            fellow students, and find communities that match
            your interests.
          </p>

          <div className="hero-buttons">
            <Link to="/events" className="primary-button">
              Explore Events
            </Link>

            <Link to="/clubs" className="secondary-button">
              Discover Clubs
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="home-section">
        <div className="section-heading">
          <h2>Featured Events</h2>
          <p>Discover what's happening around your campus.</p>
        </div>

        <div className="events-placeholder">
          <p>Exciting campus events will appear here.</p>
          <Link to="/events">Explore all events →</Link>
        </div>
      </section>

      {/* Explore Clubs Section */}
      <section className="home-section clubs-section">
        <div className="section-heading">
          <h2>Explore Campus Clubs</h2>
          <p>Find communities that match your interests.</p>
        </div>

        <div className="clubs-placeholder">
          <p>Discover student clubs and communities here.</p>
          <Link to="/clubs">Explore all clubs →</Link>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="home-cta">
        <h2>Have an Event to Share?</h2>

        <p>
          Create an event and let other students know
          what's happening on campus.
        </p>

        <Link to="/create-event" className="cta-button">
          Create an Event
        </Link>
      </section>

    </main>
  )
}

export default Home
