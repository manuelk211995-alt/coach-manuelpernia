import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={styles.badge}>Entrenador Profesional de Voleibol</p>
        <h1 className={styles.title}>
          Manuel <span className={styles.accent}>Pernia</span>
        </h1>
        <p className={styles.subtitle}>
          Transforma tu juego con entrenamiento profesional. Técnica,
          estrategia y mentalidad ganadora para voleibolistas de todos los
          niveles.
        </p>
        <div className={styles.ctas}>
          <a href="#services" className={styles.ctaPrimary}>
            Ver Programas
          </a>
          <a href="#contact" className={styles.ctaSecondary}>
            Contáctame
          </a>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>10+</span>
            <span className={styles.statLabel}>Años de experiencia</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>500+</span>
            <span className={styles.statLabel}>Atletas entrenados</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>50+</span>
            <span className={styles.statLabel}>Equipos asesorados</span>
          </div>
        </div>
      </div>
    </section>
  );
}
