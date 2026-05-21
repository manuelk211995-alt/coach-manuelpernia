import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h3 className={styles.name}>Manuel Pernia</h3>
          <p className={styles.tagline}>
            Coach de Voleibol Profesional
          </p>
        </div>
        <nav className={styles.nav}>
          <a href="#about" className={styles.link}>
            Sobre mí
          </a>
          <a href="#services" className={styles.link}>
            Servicios
          </a>
          <a href="#testimonials" className={styles.link}>
            Testimonios
          </a>
          <a href="#contact" className={styles.link}>
            Contacto
          </a>
        </nav>
        <p className={styles.copy}>
          &copy; {new Date().getFullYear()} Manuel Pernia. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
