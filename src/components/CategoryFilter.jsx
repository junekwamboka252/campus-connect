export default function CategoryFilter({ categories, selected, onChange }) {
  return (
    <div className="category-filter" role="group" aria-label="Filter by category">
      {categories.map((cat) => (
        <button
          key={cat}
          className={cat === selected ? "active" : ""}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}