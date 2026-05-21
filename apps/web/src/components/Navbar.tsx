"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Navbar.module.css";

const links = [
  { href: "/community", label: "Inicio" },
  { href: "/marketplace", label: "Buscar talento", purple: true },
  { href: "/community", label: "Comunidad" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) setUser(data.user);
      })
      .catch(() => {});
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/auth");
    router.refresh();
  };

  const closeNav = () => setOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          <span className={styles.logoIcon}>VS</span>
          <span className={styles.logoText}>
            Volley<span className={styles.logoAccent}>Social</span>
          </span>
        </a>
        <nav className={`${styles.nav} ${open ? styles.navOpen : ""}`}>
          {links.map((link) => {
            const isActive = pathname === link.href;
            const cls = [
              styles.link,
              isActive ? styles.linkActive : "",
              link.purple && !isActive ? styles.linkPurple : "",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <a
                key={link.href}
                href={link.href}
                className={cls}
                onClick={closeNav}
              >
                {link.label}
              </a>
            );
          })}
          {user ? (
            <button
              className={styles.userBtn}
              onClick={() => { closeNav(); handleLogout(); }}
            >
              <span className={styles.userAvatar}>
                {user.name.charAt(0).toUpperCase()}
              </span>
              Salir
            </button>
          ) : (
            <a
              href="/auth"
              className={`${styles.link} ${pathname === "/auth" ? styles.linkActive : ""}`}
              onClick={closeNav}
            >
              Acceder
            </a>
          )}
        </nav>
        <button
          className={`${styles.hamburger} ${open ? styles.hamburgerOpen : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
