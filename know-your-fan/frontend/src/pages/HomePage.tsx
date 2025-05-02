import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import ChatBotIA from './ChatBotIA';

import bannerImg from '../img/banner.jpg';
import valorantImg from '../img/valorant.jpg';
import csgoImg from '../img/csgo.jpg';
import furiaShirt from '../img/uniforme.png';
import rlImg from '../img/rocket.jpg';
import lolImg from '../img/lol.jpg';
import r6Img from '../img/r6.jpg';
import apexImg from '../img/apex.avif';
import futebolImg from '../img/f7.jpg';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);
  const teams = [
    { img: csgoImg, title: 'CS:GO', desc: 'Equipe brasileira de elite no cenário internacional.' },
    { img: valorantImg, title: 'Valorant', desc: 'Explosão de estratégia e habilidade no FPS da Riot.' },
    { img: rlImg, title: 'Rocket League', desc: 'Velocidade, acrobacias e gols incríveis nas arenas.' },
    { img: lolImg, title: 'League of Legends', desc: 'Domine as rotas e vença em Summoner’s Rift.' },
    { img: r6Img, title: 'Rainbow Six: Siege', desc: 'Táticas e ação intensa em combates 5v5.' },
    { img: apexImg, title: 'Apex Legends', desc: 'Battle royale frenético com heróis únicos.' },
    { img: futebolImg, title: 'Futebol de 7', desc: 'Competições de alto nível no gramado reduzido.' },
  ];
  const visibleTeams = teams.slice(startIndex, startIndex + 3);

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };
  const handleNext = () => {
    if (startIndex + 3 < teams.length) setStartIndex(startIndex + 1);
  };

  return (
    <div className={styles.container}>
      <ChatBotIA />

      <header className={styles.header}>
        <div className={styles.logo}>FURIA</div>
        <nav className={styles.nav}>
          <a href="#sobre">Sobre</a>
          <a href="#times">Times</a>
          <a href="#noticias">Notícias</a>
          <a href="#contato">Contato</a>
          <button onClick={() => navigate('/cadastro')} className={styles.navButton}>Cadastro de Fans</button>
          <button onClick={() => navigate('/dashboard')} className={styles.navButton}>Dashboard</button>
        </nav>
      </header>

      <section className={styles.hero} style={{ backgroundImage: `url(${bannerImg})` }}>
        <div className={styles.heroContent}>
          <h1>A FURIA representa o futuro dos esports</h1>
          <p>Inspirando uma nova geração de campeões e fãs.</p>
        </div>
      </section>

      <section id="sobre" className={styles.section}>
        <h2>Sobre a FURIA</h2>
        <p>
          Fundada em 2017, a FURIA rapidamente se tornou uma das organizações mais influentes no cenário de esports,
          com atuações de destaque em diversas modalidades competitivas.
        </p>
      </section>

      <section id="times" className={styles.section}>
        <h2>Times e Modalidades</h2>
        <div className={styles.carouselWrapper}>
          <button className={styles.arrowButton} onClick={handlePrev} disabled={startIndex === 0}>◀</button>
          <div className={styles.cardsCarousel}>
            {visibleTeams.map((team, index) => (
              <div className={styles.card} key={index}>
                <img src={team.img} alt={team.title} />
                <h3>{team.title}</h3>
                <p>{team.desc}</p>
              </div>
            ))}
          </div>
          <button className={styles.arrowButton} onClick={handleNext} disabled={startIndex + 3 >= teams.length}>▶</button>
        </div>
      </section>

      <section id="noticias" className={styles.section}>
        <h2>Notícias Recentes</h2>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h3><strong>FURIA classificada para o Major!</strong></h3>
            <p>A FURIA fez mudanças importantes para o Major! Confira e venha conhecer nossos novos jogadores.</p>
          </div>
          <div className={styles.card}>
            <a href="https://www.furia.gg/produto/camiseta-oficial-furia-adidas-preta-150265" target="_blank" rel="noreferrer">
              <img src={furiaShirt} alt="Uniforme FURIA" />
              <h3><strong>Novo uniforme revelado</strong></h3>
              <p>Design arrojado e performance esportiva.</p>
            </a>
          </div>
        </div>
      </section>

      <footer className={styles.footerSection}>
        <div className={styles.footerGrid}>
          <div>
            <h4>SEJA O PRIMEIRO A RECEBER NOSSAS NOVIDADES</h4>
            <div className={styles.newsletter}>
              <input type="email" placeholder="Seu e-mail" />
              <button>➜</button>
            </div>
          </div>

          <div>
            <h4>INFORMAÇÕES</h4>
            <ul>
              <li><a href="#">Quem somos</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4>POLÍTICAS</h4>
            <ul>
              <li><a href="#">Termos de Uso</a></li>
              <li><a href="#">Política de Privacidade</a></li>
              <li><a href="#">Cookies</a></li>
            </ul>
          </div>

          <div>
            <h4>SIGA FURIA</h4>
            <a href="https://www.instagram.com/furiagg/" target="_blank" rel="noreferrer">📸 Instagram</a>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; 2025 FURIA. Todos os direitos reservados.</p>
          <p>Criado por Minu</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
