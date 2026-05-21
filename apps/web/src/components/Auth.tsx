"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AnimateIn } from "./AnimateIn";
import styles from "./Auth.module.css";

type Mode = "login" | "register";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  server?: string;
}

export function Auth() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (mode === "register") {
      if (!form.name.trim()) {
        errs.name = "El nombre es obligatorio";
      }
    }

    if (!form.email.trim()) {
      errs.email = "El email es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Email no válido";
    }

    if (!form.password) {
      errs.password = "La contraseña es obligatoria";
    } else if (form.password.length < 6) {
      errs.password = "Mínimo 6 caracteres";
    }

    if (mode === "register") {
      if (!form.confirmPassword) {
        errs.confirmPassword = "Confirma tu contraseña";
      } else if (form.password !== form.confirmPassword) {
        errs.confirmPassword = "Las contraseñas no coinciden";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const body: Record<string, string> = {
        email: form.email,
        password: form.password,
      };
      if (mode === "register") {
        body.name = form.name;
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ server: data.error });
        return;
      }

      if (mode === "register") {
        setRegistered(true);
      } else {
        router.push("/community");
        router.refresh();
      }
    } catch {
      setErrors({ server: "Error de conexión. Inténtalo de nuevo." });
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (registered) {
    return (
      <section className={styles.section} id="auth">
        <div className={styles.container}>
          <AnimateIn>
            <div className={styles.card}>
              <div className={styles.success}>
                <div className={styles.successIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className={styles.successTitle}>¡Cuenta creada!</h3>
                <p className={styles.successText}>
                  Tu cuenta se ha creado correctamente.{" "}
                  <button
                    onClick={() => { setMode("login"); setRegistered(false); setErrors({}); }}
                    style={{ background: "none", border: "none", color: "var(--color-purple)", cursor: "pointer", fontWeight: 600, fontFamily: "inherit", fontSize: "inherit", textDecoration: "underline" }}
                  >
                    Inicia sesión
                  </button>{" "}
                  para continuar.
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section} id="auth">
      <div className={styles.container}>
        <AnimateIn>
          <div className={styles.card}>
            <div className={styles.toggle}>
              <button
                className={`${styles.toggleBtn} ${mode === "login" ? styles.toggleBtnActive : ""}`}
                onClick={() => { setMode("login"); setErrors({}); }}
              >
                Iniciar sesión
              </button>
              <button
                className={`${styles.toggleBtn} ${mode === "register" ? styles.toggleBtnActive : ""}`}
                onClick={() => { setMode("register"); setErrors({}); }}
              >
                Crear cuenta
              </button>
            </div>

            <h3 className={styles.title}>
              {mode === "login" ? "Bienvenido de nuevo" : "Únete a la comunidad"}
            </h3>
            <p className={styles.subtitle}>
              {mode === "login"
                ? "Accede a tu cuenta para continuar"
                : "Regístrate y conecta con la comunidad de voleibol"}
            </p>

            {errors.server && (
              <div className={styles.serverError}>
                {errors.server}
              </div>
            )}

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              {mode === "register" && (
                <div className={styles.field}>
                  <label htmlFor="name" className={styles.label}>Nombre completo</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Tu nombre"
                    className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                  />
                  {errors.name && <span className={styles.error}>{errors.name}</span>}
                </div>
              )}

              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="tu@email.com"
                  className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}
              </div>

              <div className={styles.field}>
                <label htmlFor="password" className={styles.label}>Contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder={mode === "register" ? "Mínimo 6 caracteres" : "Tu contraseña"}
                  className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                  value={form.password}
                  onChange={(e) => updateField("password", e.target.value)}
                />
                {errors.password && <span className={styles.error}>{errors.password}</span>}
              </div>

              {mode === "register" && (
                <div className={styles.field}>
                  <label htmlFor="confirmPassword" className={styles.label}>Confirmar contraseña</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Repite la contraseña"
                    className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ""}`}
                    value={form.confirmPassword}
                    onChange={(e) => updateField("confirmPassword", e.target.value)}
                  />
                  {errors.confirmPassword && (
                    <span className={styles.error}>{errors.confirmPassword}</span>
                  )}
                </div>
              )}

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading
                  ? "Procesando..."
                  : mode === "login"
                    ? "Iniciar sesión"
                    : "Crear cuenta"}
              </button>
            </form>

            {mode === "login" && (
              <div className={styles.forgot}>
                <a href="#" className={styles.forgotLink}>¿Olvidaste tu contraseña?</a>
              </div>
            )}

            <div className={styles.divider}>
              <span className={styles.dividerLine} />
              <span className={styles.dividerText}>o continúa con</span>
              <span className={styles.dividerLine} />
            </div>

            <div className={styles.social}>
              <button className={styles.socialBtn} type="button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Google
              </button>
              <button className={styles.socialBtn} type="button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </button>
            </div>

            {mode === "register" && (
              <p className={styles.terms}>
                Al registrarte, aceptas nuestros{" "}
                <a href="#" className={styles.termsLink}>Términos de uso</a>{" "}
                y{" "}
                <a href="#" className={styles.termsLink}>Política de privacidad</a>
              </p>
            )}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
