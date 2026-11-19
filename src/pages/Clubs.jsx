import API_BASE_URL from "../services/api";
import { useEffect, useState } from 'react'
import ClubCard from '../components/ClubCard'
import './Clubs.css'
function Clubs() {
  const [clubs, setClubs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
 fetch(`${API_BASE_URL}/clubs`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch clubs')
        }
        return response.json()
      })
      .then((data) => {
        setClubs(data)
        setLoading(false)
      })
      .catch((error) => {
        setError(error.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p>Loading clubs...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="clubs-page">
      <h1>Campus Clubs</h1>
      <p>Discover student clubs and communities on campus.</p>

      <div className="clubs-container">
        {clubs.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>
    </div>
  )
}

export default Clubs
