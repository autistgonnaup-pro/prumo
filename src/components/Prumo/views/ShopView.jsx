// src/components/Prumo/views/ShopView.jsx
import { useState } from 'react'
import { RECOMPENSAS_LOJA } from '../../../lib/prumo/constants'

export default function ShopView({ estado, resgatar }) {
  const [aba, setAba] = useState('loja')

  // ✅ Fallbacks defensivos para evitar crash de desestruturação
  const tokensDisponiveis = estado?.tokens || 0
  const historicoGastos = estado?.tokensGastos || []
  const catalogoItens = RECOMPENSAS_LOJA || []

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
              <p className="shop-balance__value">{tokensDisponiveis}</p>
            </div>
          </div>

          <div className="shop-grid">
            {catalogoItens.map((r) => {
              // ✅ Validação de compra protegida por variável local
              const pode = tokensDisponiveis >= (r?.custo || 0)
              return (
                <button
                  key={r?.id || r?.nome}
                  className={`shop-card ${!pode ? 'shop-card--disabled' : ''}`}
                  disabled={!pode}
                  onClick={() => resgatar(r?.custo || 0, r?.nome || 'Item Desconhecido')}
                >
                  <span className="shop-card__icon">{r?.icone || '🎁'}</span>
                  <span className="shop-card__name">{r?.nome || 'Recompensa'}</span>
                  <span className="shop-card__cost">{r?.custo || 0} 🪙</span>
                </button>
              )
            })}
          </div>
        </>
      )}

      {aba === 'historico' && (
        <>
          {historicoGastos.length === 0 ? (
            <div className="empty-state">
              <p className="empty-state__emoji">📜</p>
              <p className="empty-state__title">Nenhum resgate ainda</p>
              <p className="empty-state__desc">Complete dailies para ganhar tokens.</p>
            </div>
          ) : (
            <div className="shop-historico">
              {/* ✅ Clone do array protegido por fallback imutável */}
              {[...historicoGastos].reverse().map((g, i) => (
                <div key={g?.id || i} className="shop-historico__item">
                  <div>
                    <p className="shop-historico__nome">{g?.nome || 'Item Resgatado'}</p>
                    <p className="shop-historico__data">
                      {g?.data ? new Date(g.data).toLocaleString('pt-BR') : 'Data Indisponível'}
                    </p>
                  </div>
                  <span className="shop-historico__custo">−{g?.custo || 0} 🪙</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
