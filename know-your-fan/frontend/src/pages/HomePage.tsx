import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>FURIA</div>
        <nav className={styles.nav}>
          <a href="#sobre">Sobre</a>
          <a href="#times">Times</a>
          <a href="#noticias">Notícias</a>
          <a href="#contato">Contato</a>
          <button onClick={() => navigate('/cadastro')} className={styles.navButton}>
            Cadastro de Fans
          </button>
          <button onClick={() => navigate('/dashboard')} className={styles.navButton}>
            Dashboard
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>A FURIA representa o futuro dos esports</h1>
          <p>Inspirando uma nova geração de campeões e fãs.</p>
        </div>
      </section>

      {/* Sobre a FURIA */}
      <section id="sobre" className={styles.section}>
        <h2>Sobre a FURIA</h2>
        <p>
          Fundada em 2017, a FURIA rapidamente se tornou uma das organizações
          mais influentes no cenário de esports, com atuações de destaque em
          diversas modalidades competitivas.
        </p>
      </section>

      {/* Times */}
      <section id="times" className={styles.section}>
        <h2>Times e Modalidades</h2>
        <div className={styles.cards}>
          <div className={styles.card}>
            <img src="/images/csgo.jpg" alt="CS:GO" />
            <h3>CS:GO</h3>
            <p>Equipe brasileira de elite no cenário internacional.</p>
          </div>
          <div className={styles.card}>
            <img src="/images/valorant.jpg" alt="Valorant" />
            <h3>Valorant</h3>
            <p>Explosão de estratégia e habilidade no FPS da Riot.</p>
          </div>
        </div>
      </section>

      {/* Notícias */}
      <section id="noticias" className={styles.section}>
        <h2>Notícias Recentes</h2>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>FURIA classificada para o Major!</h3>
            <p>Confira os destaques da última série de jogos.</p>
          </div>
          <div className={styles.card}>
            <h3>Novo uniforme revelado</h3>
            <p>Design arrojado e performance esportiva.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2025 FURIA Esports. Todos os direitos reservados.</p>
        <div className={styles.social}>
          <a href="https://twitter.com/furia">Twitter</a>
          <a href="https://instagram.com/furia">Instagram</a>
          <a href="https://youtube.com/furia">YouTube</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
