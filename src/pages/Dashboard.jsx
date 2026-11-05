import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Dashboard({ user }) {
  const [activeTab, setActiveTab] = useState('inicio')

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  // Pega o primeiro nome do email para a saudação
  const nomeUsuario = user.email.split('@')[0]
  const hora = new Date().getHours()
  const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite'

  return (
    <div style={styles.appContainer}>
      {/* HEADER */}
      <header style={styles.header}>
        <div>
          <p style={styles.greeting}>{saudacao}, {nomeUsuario}</p>
          <h2 style={styles.title}>Minha Rotina</h2>
        </div>
        <div style={styles.headerIcons}>
          <button onClick={handleLogout} style={styles.iconButton} title="Sair">
            {/* Ícone de Sair (SVG Simples) */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
        </div>
      </header>

      <main style={styles.mainContent}>
        {/* BANNER DE FOCO DO DIA */}
        <div style={styles.banner}>
          <div>
            <h3 style={styles.bannerTitle}>Foco de Hoje</h3>
            <p style={styles.bannerSubtitle}>Você tem 3 tarefas pendentes.</p>
            <button style={styles.bannerButton}>Ver Tarefas</button>
          </div>
          <div style={styles.bannerIcon}>🎯</div>
        </div>

        {/* CATEGORIAS (Grade de Ícones) */}
        <h3 style={styles.sectionTitle}>Categorias</h3>
        <div style={styles.gridCategories}>
          {[
            { name: 'Trabalho', icon: '💼', color: '#e0e7ff' },
            { name: 'Estudos', icon: '📚', color: '#fef3c7' },
            { name: 'Saúde', icon: '❤️', color: '#fee2e2' },
            { name: 'Finanças', icon: '💰', color: '#dcfce7' },
            { name: 'Academia', icon: '🏋️', color: '#f3e8ff' }
          ].map((cat, index) => (
            <div key={index} style={styles.categoryItem}>
              <div style={{ ...styles.categoryIcon, backgroundColor: cat.color }}>
                {cat.icon}
              </div>
              <span style={styles.categoryName}>{cat.name}</span>
            </div>
          ))}
        </div>

        {/* HÁBITOS / TAREFAS (Cards Horizontais) */}
        <h3 style={styles.sectionTitle}>Hábitos Diários</h3>
        <div style={styles.scrollHorizontal}>
          {[
            { title: 'Beber Água', time: '2L', icon: '💧' },
            { title: 'Ler um livro', time: '20 min', icon: '📖' },
            { title: 'Meditar', time: '10 min', icon: '🧘' },
            { title: 'Exercício', time: '30 min', icon: '🏃' }
          ].map((habito, index) => (
            <div key={index} style={styles.habitCard}>
              <div style={styles.habitIcon}>{habito.icon}</div>
              <h4 style={styles.habitTitle}>{habito.title}</h4>
              <p style={styles.habitTime}>{habito.time}</p>
              <button style={styles.checkButton}>✓</button>
            </div>
          ))}
        </div>
      </main>

      {/* BOTTOM NAVIGATION BAR */}
      <nav style={styles.bottomNav}>
        {[
          { id: 'inicio', label: 'Início', icon: '🏠' },
          { id: 'agenda', label: 'Agenda', icon: '📅' },
          { id: 'metas', label: 'Metas', icon: '🎯' },
          { id: 'perfil', label: 'Perfil', icon: '👤' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              ...styles.navItem,
              color: activeTab === tab.id ? '#7c3aed' : '#9ca3af' // Roxo quando ativo
            }}
          >
            <span style={styles.navIcon}>{tab.icon}</span>
            <span style={styles.navLabel}>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

// ESTILOS (Parecidos com a imagem enviada)
const styles = {
  appContainer: { fontFamily: '"Inter", sans-serif', backgroundColor: '#ffffff', minHeight: '100vh', maxWidth: '480px', margin: '0 auto', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 0 20px rgba(0,0,0,0.05)' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 1.5rem 1rem 1.5rem' },
  greeting: { fontSize: '0.875rem', color: '#6b7280', margin: 0 },
  title: { fontSize: '1.5rem', fontWeight: '700', color: '#111827', margin: '0.2rem 0 0 0' },
  headerIcons: { display: 'flex', gap: '1rem' },
  iconButton: { background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' },
  
  mainContent: { padding: '0 1.5rem', paddingBottom: '6rem', flex: 1, overflowY: 'auto' },
  
  // Banner (Foco)
  banner: { backgroundColor: '#7c3aed', borderRadius: '1rem', padding: '1.5rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', boxShadow: '0 10px 15px -3px rgba(124, 58, 237, 0.3)' },
  bannerTitle: { margin: 0, fontSize: '1.25rem', fontWeight: 'bold' },
  bannerSubtitle: { fontSize: '0.875rem', opacity: 0.9, marginBottom: '1rem' },
  bannerButton: { backgroundColor: 'white', color: '#7c3aed', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.875rem' },
  bannerIcon: { fontSize: '3rem' },

  // Categorias
  sectionTitle: { fontSize: '1.125rem', fontWeight: '700', color: '#374151', marginBottom: '1rem' },
  gridCategories: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' },
  categoryItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' },
  categoryIcon: { width: '50px', height: '50px', borderRadius: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem', marginBottom: '0.5rem' },
  categoryName: { fontSize: '0.75rem', color: '#4b5563', textAlign: 'center', fontWeight: '500' },

  // Cards Horizontais (Hábitos)
  scrollHorizontal: { display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', scrollbarWidth: 'none' },
  habitCard: { minWidth: '140px', backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '1rem', border: '1px solid #e5e7eb', position: 'relative' },
  habitIcon: { fontSize: '1.5rem', marginBottom: '0.5rem' },
  habitTitle: { margin: 0, fontSize: '1rem', color: '#111827' },
  habitTime: { fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem', marginBottom: '1rem' },
  checkButton: { width: '100%', padding: '0.5rem', backgroundColor: '#ede9fe', color: '#7c3aed', border: 'none', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer' },

  // Barra de Navegação Inferior
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'white', display: 'flex', justifyContent: 'space-around', padding: '1rem 0', borderTop: '1px solid #e5e7eb', boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.05)' },
  navItem: { background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', transition: 'color 0.2s' },
  navIcon: { fontSize: '1.5rem', marginBottom: '0.25rem' },
  navLabel: { fontSize: '0.75rem', fontWeight: '600' }
}