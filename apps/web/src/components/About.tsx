import styles from "./About.module.css";

export function About() {
  return (
    <section className={styles.section} id="about">
      <div className={styles.container}>
        <div className={styles.imageCol}>
          <div className={styles.imagePlaceholder}>
            <span className={styles.imageIcon}>🏐</span>
          </div>
        </div>
        <div className={styles.textCol}>
          <h2 className={styles.tag}>Sobre Mí</h2>
          <h3 className={styles.title}>
            Pasión por el voleibol, dedicación al atleta
          </h3>
          <p className={styles.text}>
            Soy Manuel Pernia, entrenador profesional de voleibol con más de 10
            años de experiencia formando atletas en categorías base, equipos de
            competición y programas de alto rendimiento.
          </p>
          <p className={styles.text}>
            Mi metodología combina técnica avanzada, preparación física y
            desarrollo mental para crear voleibolistas completos. Creo que cada
            atleta tiene un potencial único y mi trabajo es ayudarlos a
            descubrirlo.
          </p>
          <div className={styles.credentials}>
            <div className={styles.credential}>
              <strong>Entrenador Nacional</strong>
              <span>RFEVB - Real Federación Española de Voleibol</span>
            </div>
            <div className={styles.credential}>
              <strong>Especialista en Formación</strong>
              <span>Metodología de entrenamiento para categorías base</span>
            </div>
            <div className={styles.credential}>
              <strong>Scout & Analista</strong>
              <span>Análisis táctico y video-scout de equipos rivales</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
