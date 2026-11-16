
import { useParams } from 'react-router-dom'

function ClubDetails() {
  const { id } = useParams()

  return (
    <div>
      <h1>Club Details</h1>
      <p>Viewing details for club: {id}</p>
    </div>
  )
}

export default ClubDetails
