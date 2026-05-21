import styles from "./Contact.module.css";
import { siteConfig } from "@coach/config";

export function Contact() {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        <div className={styles.info}>
          <h2 className={styles.tag}>Contacto</h2>
          <h3 className={styles.title}>Hablemos de tu próximo nivel</h3>
          <p className={styles.text}>
            ¿Listo para llevar tu juego al siguiente nivel? Contáctame y
            diseñemos juntos el plan de entrenamiento ideal para ti o tu
            equipo.
          </p>
          <div className={styles.details}>
            <div className={styles.detail}>
              <span className={styles.detailIcon}>📧</span>
              <span>{siteConfig.email}</span>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailIcon}>📍</span>
              <span>Andalucía, España</span>
            </div>
          </div>
          <div className={styles.social}>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              Instagram
            </a>
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              YouTube
            </a>
            <a
              href={siteConfig.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              TikTok
            </a>
          </div>
        </div>
        <form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              Nombre
            </label>
            <input
              type="text"
              id="name"
              placeholder="Tu nombre"
              className={styles.input}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="tu@email.com"
              className={styles.input}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="message" className={styles.label}>
              Mensaje
            </label>
            <textarea
              id="message"
              placeholder="Cuéntame sobre ti y tus objetivos..."
              className={styles.textarea}
              rows={5}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Enviar mensaje
          </button>
        </form>
      </div>
    </section>
  );
}
