import { useEffect, useMemo, useState } from "react";
import EventCard from "../components/EventCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import "./Events.css";

const API_URL = "http://localhost:3000/events";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(API_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load events");
        return res.json();
      })
      .then((data) => setEvents(data))
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(events.map((e) => e.category))],
    [events]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return events.filter((e) => {
      const matchesCategory = category === "All" || e.category === category;
      const matchesSearch =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.organizer.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [events, search, category]);

  if (loading) return <p className="status">Loading events...</p>;
  if (error) return <p className="status error">{error}</p>;

  return (
    <section className="events-page">
      <h1>Campus Events</h1>
      <div className="filters">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter
          categories={categories}
          selected={category}
          onChange={setCategory}
        />
      </div>
      <p className="count">{filtered.length} event(s) found</p>
      {filtered.length === 0 ? (
        <p className="status">No events match your search.</p>
      ) : (
        <div className="events-grid">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
