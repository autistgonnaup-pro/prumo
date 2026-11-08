export default function CategoryGrid({ categories, onSelect }) {
  return (
    <div className="category-grid">
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          className="category-item"
          onClick={() => onSelect?.(cat.id)}
        >
          <div
            className="category-item__icon"
            style={{ backgroundColor: cat.color }}
            aria-hidden="true"
          >
            {cat.icon}
          </div>
          <span className="category-item__name">{cat.name}</span>
        </button>
      ))}
    </div>
  )
}