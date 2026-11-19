import { useState, useEffect } from "react";
import API_BASE_URL from "../services/api";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./EventDetails.css";

const API = `${API_BASE_URL}/events`;

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [form, setForm] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API}/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => setEvent(data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  function startEditing() {
    setForm({ ...event });
    setError("");
    setIsEditing(true);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSave(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      setError("Title and description are required.");
      return;
    }
    fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((updated) => {
        setEvent(updated);
        setIsEditing(false);
      })
      .catch(() => setError("Could not save changes. Is the server running?"));
  }

  function handleDelete() {
    if (!window.confirm("Delete this event?")) return;
    fetch(`${API}/${id}`, { method: "DELETE" })
      .then(() => navigate("/events"))
      .catch(() => setError("Could not delete the event."));
  }

  if (loading) return <p className="ed-message">Loading...</p>;

  if (notFound) {
    return (
      <div className="ed-message">
        <p>Event not found.</p>
        <Link to="/events">Back to events</Link>
      </div>
    );
  }

  if (isEditing) {
    return (
      <form className="ed-card" onSubmit={handleSave}>
        <h1 className="ed-title">Edit Event</h1>
        {error && <p className="ed-error">{error}</p>}
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" />
        <input name="date" type="date" value={form.date} onChange={handleChange} />
        <input name="venue" value={form.venue} onChange={handleChange} placeholder="Venue" />
        <input name="organizer" value={form.organizer} onChange={handleChange} placeholder="Organizer" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows="4" />
        <div className="ed-actions">
          <button type="submit" className="ed-btn ed-btn-primary">Save Changes</button>
          <button type="button" className="ed-btn ed-btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </form>
    );
  }

  return (
    <div className="ed-card">
      <Link to="/events" className="ed-back">← Back to events</Link>
      <span className="ed-badge">{event.category}</span>
      <h1 className="ed-title">{event.title}</h1>
      <p className="ed-meta">{event.date} · {event.venue}</p>
      <p className="ed-meta">Organizer: {event.organizer}</p>
      <p className="ed-description">{event.description}</p>
      {error && <p className="ed-error">{error}</p>}
      <div className="ed-actions">
        <button className="ed-btn ed-btn-primary" onClick={startEditing}>Edit</button>
        <button className="ed-btn ed-btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default EventDetails;
