
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EventCard from '../components/EventCard'
import ClubCard from '../components/ClubCard'
import './Home.css'
import './Events.css'
import './Clubs.css'

function Home() {
  const [events, setEvents] = useState([])
  const [clubs, setClubs] = useState([])
  const [eventsLoading, setEventsLoading] = useState(true)
  const [clubsLoading, setClubsLoading] = useState(true)
  const [eventsError, setEventsError] = useState('')
  const [clubsError, setClubsError] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/events')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load events')
        }
        return response.json()
      })
      .then((data) => setEvents(data))
      .catch((error) => setEventsError(error.message))
      .finally(() => setEventsLoading(false))

    fetch('http://localhost:5000/clubs')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load clubs')
        }
        return response.json()
      })
      .then((data) => setClubs(data))
      .catch((error) => setClubsError(error.message))
      .finally(() => setClubsLoading(false))
  }, [])

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

        {eventsLoading ? (
          <p className="status">Loading events...</p>
        ) : eventsError ? (
          <p className="status error">{eventsError}</p>
        ) : events.length === 0 ? (
          <p className="status">No events available yet.</p>
        ) : (
          <div className="home-cards-grid">
            {events.slice(0, 3).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        <div className="home-explore-link">
          <Link to="/events">Explore all events →</Link>
        </div>
      </section>

      {/* Explore Clubs Section */}
      <section className="home-section clubs-section">
        <div className="section-heading">
          <h2>Explore Campus Clubs</h2>
          <p>Find communities that match your interests.</p>
        </div>

        {clubsLoading ? (
          <p className="status">Loading clubs...</p>
        ) : clubsError ? (
          <p className="status error">{clubsError}</p>
        ) : clubs.length === 0 ? (
          <p className="status">No clubs available yet.</p>
        ) : (
          <div className="home-cards-grid">
            {clubs.slice(0, 3).map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        )}

        <div className="home-explore-link">
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
