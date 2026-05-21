import styles from "./Services.module.css";

const services = [
  {
    icon: "🎯",
    title: "Entrenamiento Personalizado",
    description:
      "Sesiones one-on-one diseñadas según tus objetivos, nivel y posición. Trabajamos técnica, táctica y preparación física específica.",
    features: ["Plan individualizado", "Corrección técnica", "Video análisis"],
  },
  {
    icon: "👥",
    title: "Clases Grupales",
    description:
      "Entrenamientos en grupos reducidos por nivel y categoría. Ideal para equipos que quieren mejorar su rendimiento colectivo.",
    features: [
      "Grupos reducidos",
      "Trabajo en equipo",
      "Simulación de partido",
    ],
  },
  {
    icon: "💻",
    title: "Programas Online",
    description:
      "Accede a mis programas de entrenamiento desde cualquier lugar. Rutinas, ejercicios y seguimiento remoto personalizado.",
    features: [
      "Rutinas guiadas",
      "Seguimiento remoto",
      "Material descargable",
    ],
  },
  {
    icon: "📋",
    title: "Scout & Análisis",
    description:
      "Análisis táctico de equipos rivales y scouting de jugadores para preparar estrategias de competición efectivas.",
    features: [
      "Video-scout",
      "Informes tácticos",
      "Estrategia competitiva",
    ],
  },
];

export function Services() {
  return (
    <section className={styles.section} id="services">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.tag}>Servicios</h2>
          <h3 className={styles.title}>
            Programas diseñados para cada nivel
          </h3>
          <p className={styles.description}>
            Desde iniciación hasta alto rendimiento, tengo el programa que se
            adapta a tus necesidades como voleibolista.
          </p>
        </div>
        <div className={styles.grid}>
          {services.map((service) => (
            <article key={service.title} className={styles.card}>
              <span className={styles.icon}>{service.icon}</span>
              <h4 className={styles.cardTitle}>{service.title}</h4>
              <p className={styles.cardText}>{service.description}</p>
              <ul className={styles.features}>
                {service.features.map((feature) => (
                  <li key={feature} className={styles.feature}>
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
