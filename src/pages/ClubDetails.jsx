import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Clubs.css'
function ClubDetails() {
  const { id } = useParams()

  const [club, setClub] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`http://localhost:5000/clubs/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Club not found')
        }
        return response.json()
      })
      .then((data) => {
        setClub(data)
        setLoading(false)
      })
      .catch((error) => {
        setError(error.message)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <p>Loading club details...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="club-details">
      <h1>{club.name}</h1>

      <p><strong>Category:</strong> {club.category}</p>

      <p><strong>Description:</strong> {club.description}</p>

      <p><strong>Meeting Day:</strong> {club.meetingDay}</p>

      <p><strong>Location:</strong> {club.location}</p>
    </div>
  )
}

export default ClubDetails
