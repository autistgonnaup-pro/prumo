export default function BottomNav({ tabs, activeTab, onChange }) {
  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      {tabs.map((tab) => {
        const active = activeTab === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`nav-item ${active ? 'nav-item--active' : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            <span className="nav-item__icon" aria-hidden="true">{tab.icon}</span>
            <span className="nav-item__label">{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}