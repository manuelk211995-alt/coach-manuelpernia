"use client";

import { AnimateIn } from "./AnimateIn";
import styles from "./Store.module.css";

const products = [
  {
    id: 1,
    name: "Plan de Entrenamiento Completo",
    desc: "Programa de 12 semanas con ejercicios, rutinas y seguimiento personalizado para llevar tu juego al máximo nivel.",
    price: "39,99 €",
    badge: "Digital",
    image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "E-book: Táctica y Estrategia",
    desc: "Guía completa con más de 50 sistemas tácticos, formaciones y estrategias para competición.",
    price: "19,99 €",
    badge: "Digital",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Sesión de Video-Análisis",
    desc: "Analizo tu juego o el de tu equipo mediante video-scout profesional con informe detallado.",
    price: "59,99 €",
    badge: "Servicio",
    image: "https://images.unsplash.com/photo-1592656094267-764a45160876?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Camiseta Oficial MP",
    desc: "Camiseta deportiva transpirable con el logo oficial de Manuel Pernia. Ideal para entrenamientos.",
    price: "24,99 €",
    badge: "Físico",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Pack Mensual de Entrenamiento",
    desc: "Acceso a 4 sesiones grupales online + plan de entrenamiento semanal personalizado.",
    price: "49,99 €",
    badge: "Suscripción",
    image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Balón de Voleibol Pro",
    desc: "Balón oficial de competición con certificación FIVB. Cuero sintético de alta durabilidad.",
    price: "44,99 €",
    badge: "Físico",
    image: "https://images.unsplash.com/photo-1613843873231-1444f9b2b6e5?w=400&h=300&fit=crop",
  },
];

export function Store() {
  return (
    <section className={styles.section} id="store">
      <div className={styles.container}>
        <AnimateIn>
          <div className={styles.header}>
            <h2 className={styles.tag}>Tienda</h2>
            <h3 className={styles.title}>Productos y servicios</h3>
            <p className={styles.description}>
              Todo lo que necesitas para tu desarrollo como voleibolista:
              programas, material, análisis y más.
            </p>
          </div>
        </AnimateIn>
        <div className={styles.grid}>
          {products.map((product) => (
            <AnimateIn key={product.id}>
              <article className={styles.card}>
                <div className={styles.imageWrap}>
                  <img src={product.image} alt={product.name} className={styles.image} />
                  <span className={styles.badge}>{product.badge}</span>
                </div>
                <div className={styles.body}>
                  <h4 className={styles.cardTitle}>{product.name}</h4>
                  <p className={styles.cardText}>{product.desc}</p>
                  <div className={styles.footer}>
                    <span className={styles.price}>{product.price}</span>
                    <button className={styles.buyBtn}>Añadir</button>
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
