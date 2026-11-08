import { useState } from 'react'
import { RECOMPENSAS_LOJA } from '../../../lib/prumo/constants'

export default function ShopView({ estado, resgatar }) {
  const [aba, setAba] = useState('loja')

  return (
    <div className="view">
      <h1 className="view__title">Recompensas</h1>
      <p className="view__subtitle">Troque tokens por prazeres reais. Sem culpa.</p>

      <div className="shop-tabs">
        <button
          className={`shop-tab ${aba === 'loja' ? 'shop-tab--active' : ''}`}
          onClick={() => setAba('loja')}
        >
          🪙 Loja
        </button>
        <button
          className={`shop-tab ${aba === 'historico' ? 'shop-tab--active' : ''}`}
          onClick={() => setAba('historico')}
        >
          📜 Histórico
        </button>
      </div>

      {aba === 'loja' && (
        <>
          <div className="shop-balance">
            <span className="shop-balance__icon">🪙</span>
            <div>
              <p className="shop-balance__label">Saldo disponível</p>
              <p className="shop-balance__value">{estado.tokens}</p>
            </div>
          </div>

          <div className="shop-grid">
            {RECOMPENSAS_LOJA.map((r) => {
              const pode = estado.tokens >= r.custo
              return (
                <button
                  key={r.id}
                  className={`shop-card ${!pode ? 'shop-card--disabled' : ''}`}
                  disabled={!pode}
                  onClick={() => resgatar(r.custo, r.nome)}
                >
                  <span className="shop-card__icon">{r.icone}</span>
                  <span className="shop-card__name">{r.nome}</span>
                  <span className="shop-card__cost">{r.custo} 🪙</span>
                </button>
              )
            })}
          </div>
        </>
      )}

      {aba === 'historico' && (
        <>
          {estado.tokensGastos.length === 0 ? (
            <div className="empty-state">
              <p className="empty-state__emoji">📜</p>
              <p className="empty-state__title">Nenhum resgate ainda</p>
              <p className="empty-state__desc">Complete dailies para ganhar tokens.</p>
            </div>
          ) : (
            <div className="shop-historico">
              {[...estado.tokensGastos].reverse().map((g, i) => (
                <div key={i} className="shop-historico__item">
                  <div>
                    <p className="shop-historico__nome">{g.nome}</p>
                    <p className="shop-historico__data">
                      {new Date(g.data).toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <span className="shop-historico__custo">−{g.custo} 🪙</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}