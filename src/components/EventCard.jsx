import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  const { id, title, date, venue, category, organizer, image } = event;
  return (
    <article className="event-card">
      {image && <img src={image} alt={title} />}
      <div className="event-card-body">
        <span className="badge">{category}</span>
        <h3>{title}</h3>
        <p>{new Date(date).toLocaleDateString()}</p>
        <p>{venue}</p>
        <p className="organizer">By {organizer}</p>
        <Link to={`/events/${id}`}>View details</Link>
      </div>
    </article>
  );
}
