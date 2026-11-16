
import { useParams } from 'react-router-dom'

function EventDetails() {
  const { id } = useParams()

  return (
    <div>
      <h1>Event Details</h1>
      <p>Viewing details for event: {id}</p>
    </div>
  )
}

export default EventDetails
