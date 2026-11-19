import API_BASE_URL from "../services/api";
import { useState } from "react";
import "./CreateEvent.css";

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    venue: "",
    organizer: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const cleanedData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category.trim(),
      date: formData.date,
      venue: formData.venue.trim(),
      organizer: formData.organizer.trim(),
    };

    // Check that all fields are filled
    if (Object.values(cleanedData).some((value) => !value)) {
      setError("Please fill in all fields.");
      return;
    }

    // Check that the event date is not in the past
    const now = new Date();

    const today = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join("-");

    if (cleanedData.date < today) {
      setError("Event date cannot be in the past.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedData),
      });

      if (!response.ok) {
        throw new Error("Failed to create event. Please try again.");
      }

      setSuccess("Your event has been created successfully!");

      setFormData({
        title: "",
        description: "",
        category: "",
        date: "",
        venue: "",
        organizer: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="create-event-page">
      <div className="create-event-container">
        <h1>Create a Campus Event</h1>
        <p>Fill in the details below to share your event with students.</p>

        <form onSubmit={handleSubmit} className="create-event-form">
          <label htmlFor="title">Event Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter event title"
            required
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your event"
            required
          />

          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            type="text"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g. Technology, Culture, Sports"
            required
          />

          <label htmlFor="date">Event Date</label>
          <input
           id="date"
           name="date"
           type="date"
           value={formData.date}
           onChange={handleChange}
           required
         />

          <label htmlFor="venue">Venue</label>
          <input
            id="venue"
            name="venue"
            type="text"
            value={formData.venue}
            onChange={handleChange}
            placeholder="Enter event venue"
            required
          />

          <label htmlFor="organizer">Organizer</label>
          <input
            id="organizer"
            name="organizer"
            type="text"
            value={formData.organizer}
            onChange={handleChange}
            placeholder="Enter organizer name"
            required
          />

          {error && <p className="form-error">{error}</p>}
          {success && <p className="form-success">{success}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Creating Event..." : "Create Event"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default CreateEvent;
