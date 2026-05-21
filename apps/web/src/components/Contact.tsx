"use client";

import { FormEvent } from "react";
import { AnimateIn } from "./AnimateIn";
import { siteConfig } from "@coach/config";
import styles from "./Contact.module.css";

export function Contact() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name");
    const email = data.get("email");
    const message = data.get("message");
    const mailto = `mailto:${siteConfig.email}?subject=Contacto desde web - ${name}&body=De: ${name} (${email})%0D%0A%0D%0A${message}`;
    window.open(mailto);
  };

  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        <AnimateIn className={styles.info}>
          <h2 className={styles.tag}>Contacto</h2>
          <h3 className={styles.title}>Hablemos de tu próximo nivel</h3>
          <p className={styles.text}>
            ¿Listo para llevar tu juego al siguiente nivel? Contáctame y
            diseñemos juntos el plan de entrenamiento ideal para ti o tu equipo.
          </p>
          <div className={styles.details}>
            <div className={styles.detail}>
              <span className={styles.detailIcon}>✉</span>
              <span>{siteConfig.email}</span>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailIcon}>⌂</span>
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              Instagram
            </a>
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
              YouTube
            </a>
            <a
              href={siteConfig.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              TikTok
            </a>
          </div>
        </AnimateIn>
        <AnimateIn>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
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
                name="email"
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
                name="message"
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
        </AnimateIn>
      </div>
    </section>
  );
}
