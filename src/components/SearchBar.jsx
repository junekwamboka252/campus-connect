export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="search"
      className="search-bar"
      placeholder="Search events, venues or organizers..."
      aria-label="Search events"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
