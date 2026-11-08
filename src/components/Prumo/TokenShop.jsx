const RECOMPENSAS = [
  { id: 'game', nome: '1h de videogame', custo: 30, icone: '🎮' },
  { id: 'refeicao', nome: 'Refeição livre', custo: 50, icone: '🍔' },
  { id: 'filme', nome: 'Sessão de cinema em casa', custo: 40, icone: '🍿' },
  { id: 'livro', nome: 'Comprar um livro', custo: 80, icone: '📚' },
]

export default function TokenShop({ tokens, onResgatar }) {
  return (
    <section className="token-shop">
      <div className="token-shop__header">
        <h2 className="token-shop__title">Loja de Tokens</h2>
        <div className="token-shop__balance">
          🪙 {tokens}
        </div>
      </div>
      <div className="token-shop__grid">
        {RECOMPENSAS.map((r) => {
          const podeResgatar = tokens >= r.custo
          return (
            <button
              key={r.id}
              className={`token-shop__item ${!podeResgatar ? 'token-shop__item--disabled' : ''}`}
              onClick={() => podeResgatar && onResgatar(r.custo, r.nome)}
              disabled={!podeResgatar}
            >
              <span className="token-shop__icon">{r.icone}</span>
              <span className="token-shop__name">{r.nome}</span>
              <span className="token-shop__cost">{r.custo} 🪙</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}