import { AnimateIn } from "./AnimateIn";
import styles from "./Testimonials.module.css";

const testimonials = [
  {
    name: "Ana García",
    role: "Jugadora de División de Honor",
    text: "Entrenar con Manuel ha sido un antes y un después en mi carrera. Su enfoque técnico y su capacidad para identificar áreas de mejora son excepcionales. He mejorado mi recepción y mi lectura de juego enormemente.",
  },
  {
    name: "Carlos Martínez",
    role: "Entrenador de categorías base",
    text: "Manuel tiene una visión única del juego. Sus sesiones de scouting y análisis táctico me han ayudado a preparar mis equipos de una forma mucho más profesional. Un referente en la formación.",
  },
  {
    name: "Laura Sánchez",
    role: "Jugadora Sub-19",
    text: "Gracias a los programas online de Manuel pude seguir entrenando y mejorando incluso cuando no podía asistir presencialmente. Su metodología es clara, exigente y muy motivadora.",
  },
];

export function Testimonials() {
  return (
    <section className={styles.section} id="testimonials">
      <div className={styles.container}>
        <AnimateIn>
          <div className={styles.header}>
            <h2 className={styles.tag}>Testimonios</h2>
            <h3 className={styles.title}>Lo que dicen los atletas</h3>
          </div>
        </AnimateIn>
        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <AnimateIn key={t.name}>
              <article className={styles.card}>
                <div className={styles.quote}>&ldquo;</div>
                <p className={styles.text}>{t.text}</p>
                <div className={styles.author}>
                  <div className={styles.avatar}>{t.name.charAt(0)}</div>
                  <div>
                    <p className={styles.name}>{t.name}</p>
                    <p className={styles.role}>{t.role}</p>
                  </div>
                </div>
              </article>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
