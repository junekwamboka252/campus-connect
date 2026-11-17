
import { Link } from 'react-router-dom'

function ClubCard({ club }) {
  return (
    <div className="club-card">
      <div className="club-card-content">
        <span className="club-category">
          {club.category}
        </span>

        <h2>{club.name}</h2>

        <p>{club.description}</p>

        <div className="club-info">
          <p>
            <strong>Meeting Day:</strong> {club.meetingDay}
          </p>

          <p>
            <strong>Location:</strong> {club.location}
          </p>
        </div>

        <Link to={`/clubs/${club.id}`} className="club-details-link">
          View Details →
        </Link>
      </div>
    </div>
  )
}

export default ClubCard
