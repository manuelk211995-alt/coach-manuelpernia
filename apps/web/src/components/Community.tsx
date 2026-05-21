"use client";

import { useEffect, useState } from "react";
import styles from "./Community.module.css";

interface Article {
  title: string;
  description: string;
  url: string;
  image: string;
  source: string;
  publishedAt: string;
  lang: string;
  country?: string;
}

interface PostComment {
  id: number;
  name: string;
  text: string;
  date: string;
}

interface Post {
  id: number;
  name: string;
  role: string;
  userType: "entrenador" | "jugador" | "otro";
  type: "logro" | "trabajo" | "comentario" | "noticia";
  text: string;
  date: string;
  likes: number;
  likedBy: string[];
  comments: PostComment[];
  articleTitle?: string;
  articleUrl?: string;
  articleImage?: string;
  articleLang?: string;
  articleTranslated?: boolean;
  articleCountry?: string;
}

const spainNews: Article[] = [
  {
    title: "CV Almería refuerza su plantilla para la próxima temporada",
    description: "El club almeriense ha anunciado varios fichajes de cara a la temporada 2026-2027 en la Superliga Masculina.",
    url: "https://www.rfevb.com", image: "", source: "RFEVB", publishedAt: "2026-05-20", lang: "es", country: "España",
  },
  {
    title: "España Sub-19 se prepara para el Europeo",
    description: "La selección española juvenil continúa su preparación para el Campeonato de Europa Sub-19.",
    url: "https://www.rfevb.com", image: "", source: "RFEVB", publishedAt: "2026-05-18", lang: "es", country: "España",
  },
  {
    title: "La Superliga Femenina define sus semifinales",
    description: "Los cuatro mejores equipos de la Superliga Femenina española se enfrentan en las semifinales.",
    url: "https://www.rfevb.com", image: "", source: "RFEVB", publishedAt: "2026-05-15", lang: "es", country: "España",
  },
  {
    title: "Tenerife Libby's La Laguna, campeón de la Superliga",
    description: "El Tenerife Libby's La Laguna se proclamó campeón de la Superliga Masculina tras una temporada excepcional.",
    url: "https://www.rfevb.com", image: "", source: "RFEVB", publishedAt: "2026-05-12", lang: "es", country: "España",
  },
  {
    title: "CV Alcobendas apuesta por la cantera",
    description: "El club madrileño presenta su proyecto de cantera para las próximas temporadas.",
    url: "https://www.rfevb.com", image: "", source: "RFEVB", publishedAt: "2026-05-10", lang: "es", country: "España",
  },
];

const fallbackNews: Article[] = [
  {
    title: "Italia vs Polonia · Final Nations League 2025",
    description: "La selección italiana se enfrenta a Polonia en la gran final de la Nations League.",
    url: "https://www.fivb.com", image: "", source: "FIVB", publishedAt: "2025-05-18", lang: "es", country: "Italia",
  },
  {
    title: "Brasil vence a Argentina en el Sudamericano",
    description: "La selección brasileña derrotó a Argentina por 3-1 en el campeonato sudamericano de voleibol.",
    url: "https://www.fivb.com", image: "", source: "Volleyball World", publishedAt: "2025-05-15", lang: "es", country: "Brasil",
  },
  {
    title: "Japan Women's Team Prepares for Olympic Qualifiers",
    description: "The Japanese women's volleyball team has begun intensive training ahead of the Olympic qualification tournament.",
    url: "https://www.fivb.com", image: "", source: "Volleyball World", publishedAt: "2025-05-12", lang: "en", country: "Japón",
  },
  {
    title: "USA vs Cuba: NORCECA Championship Highlights",
    description: "Team USA dominates Cuba in straight sets to advance to the NORCECA Championship semifinals.",
    url: "https://www.fivb.com", image: "", source: "NORCECA", publishedAt: "2025-05-10", lang: "en", country: "USA",
  },
];

const initialPosts: Post[] = [
  {
    id: 1,
    name: "Carlos Ruiz",
    role: "Entrenador juvenil",
    userType: "entrenador",
    type: "comentario",
    text: "Excelente plataforma. Me encanta poder compartir mis experiencias con otros entrenadores. El voleibol base necesita más espacios como este.",
    date: "2025-05-19",
    likes: 4,
    likedBy: [],
    comments: [
      { id: 101, name: "Lucía Méndez", text: "Totalmente de acuerdo, Carlos. Hace falta más comunidad.", date: "2025-05-20" },
      { id: 102, name: "Pedro Sánchez", text: "¡Comparto esa visión! Un abrazo.", date: "2025-05-21" },
    ],
  },
  {
    id: 2,
    name: "María Torres",
    role: "Preparadora física",
    userType: "entrenador",
    type: "trabajo",
    text: "Comparto aquí mis rutinas de preparación física para voleibolistas. Espero que sean de utilidad para la comunidad. ¡Vamos a crecer juntos!",
    date: "2025-05-17",
    likes: 7,
    likedBy: [],
    comments: [
      { id: 103, name: "Ana Beltrán", text: "María, tus rutinas son espectaculares. Las estoy aplicando con mis jugadoras.", date: "2025-05-18" },
    ],
  },
  {
    id: 3,
    name: "Javier López",
    role: "Jugador Sub-21",
    userType: "jugador",
    type: "logro",
    text: "¡Clasificados para la final nacional! Después de meses de entrenamiento intenso, mi equipo logró el pase al campeonato nacional. Orgulloso de este grupo.",
    date: "2025-05-14",
    likes: 12,
    likedBy: [],
    comments: [
      { id: 104, name: "VolleySocial", text: "¡Enhorabuena, equipo! El trabajo duro da sus frutos.", date: "2025-05-15" },
      { id: 105, name: "Sofía Ruiz", text: "¡Qué emoción! Mucha suerte en la final.", date: "2025-05-15" },
      { id: 106, name: "Diego Martín", text: "Vamos Javier, a darlo todo en la final!", date: "2025-05-16" },
    ],
  },
];

const coaches = [
  { name: "Carlos Ruiz", role: "Entrenador Nacional", specialty: "Técnica y táctica" },
  { name: "Ana Beltrán", role: "Preparadora Física", specialty: "Condición y prevención" },
  { name: "David Luque", role: "Scout Profesional", specialty: "Análisis de video" },
];

const typeLabels: Record<string, string> = {
  logro: "Logro",
  trabajo: "Trabajo",
  comentario: "Comentario",
  noticia: "Noticia",
};

const userTypeLabels: Record<string, string> = {
  entrenador: "Entrenador",
  jugador: "Jugador",
  otro: "Miembro",
};

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("vs_session_id");
  if (!id) { id = crypto.randomUUID(); localStorage.setItem("vs_session_id", id); }
  return id;
}

function loadPosts(): Post[] {
  if (typeof window === "undefined") return initialPosts;
  try { const s = localStorage.getItem("vs_posts"); if (s) return JSON.parse(s); } catch { /* */ }
  return initialPosts;
}

function savePosts(posts: Post[]) { localStorage.setItem("vs_posts", JSON.stringify(posts)); }

function loadProfile() {
  if (typeof window === "undefined") return null;
  try { const s = localStorage.getItem("vs_profile"); if (s) return JSON.parse(s); } catch { /* */ }
  return null;
}

function saveProfile(profile: { name: string; role: string; userType: string }) {
  localStorage.setItem("vs_profile", JSON.stringify(profile));
}

function LikeIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

export function Community() {
  const [articles, setArticles] = useState<Article[]>([...spainNews, ...fallbackNews]);
  const [newsLoading, setNewsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [sessionId, setSessionId] = useState("");
  const [postsLoaded, setPostsLoaded] = useState(false);
  const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());
  const [commentForms, setCommentForms] = useState<Record<number, { name: string; text: string }>>({});
  const [showForm, setShowForm] = useState(false);
  const [translating, setTranslating] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState("todas");
  const [user, setUser] = useState<{ id: number; name: string; email: string } | null>(null);

  const [form, setForm] = useState({
    name: "",
    role: "",
    userType: "jugador" as "entrenador" | "jugador" | "otro",
    type: "comentario" as Post["type"],
    text: "",
  });

  useEffect(() => {
    setPosts(loadPosts());
    setSessionId(getSessionId());
    setPostsLoaded(true);
    const p = loadProfile();
    if (p) setForm(f => ({ ...f, name: p.name, role: p.role, userType: p.userType }));

    fetch("/api/auth/me")
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.user) {
          setUser(data.user);
          setForm(f => ({ ...f, name: data.user.name }));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => { if (postsLoaded) savePosts(posts); }, [posts, postsLoaded]);

  const fetchNews = async () => {
    const apiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
    setNewsLoading(true);
    try {
      const headers = {
        "x-rapidapi-key": apiKey || "",
        "x-rapidapi-host": "volleyball-highlights-api.p.rapidapi.com",
      };
      const today = new Date().toISOString().slice(0, 10);
      const [matchesRes, highlightsRes] = await Promise.all([
        fetch(`https://volleyball.highlightly.net/matches?date=${today}&limit=10`, { headers }),
        fetch(`https://volleyball.highlightly.net/highlights?date=${today}&limit=5`, { headers }),
      ]);
      const matchesData = matchesRes.ok ? await matchesRes.json() : { data: [] };
      const highlightsData = highlightsRes.ok ? await highlightsRes.json() : { data: [] };
      const apiArticles: Article[] = [];
      for (const m of (matchesData.data || [])) {
        const home = m.homeTeam?.name || "Equipo local";
        const away = m.awayTeam?.name || "Equipo visitante";
        const score = m.state?.score?.current || "";
        const stateDesc = m.state?.description || "Programado";
        const leagueName = m.league?.name || "";
        const country = m.country?.name || m.league?.country || "";
        apiArticles.push({
          title: `${home} vs ${away}${score ? ` (${score})` : ""}`,
          description: `${leagueName} · ${stateDesc}${score ? ` · Marcador: ${score}` : ""}`,
          url: `https://volleyball.highlightly.net/matches/${m.id}`,
          image: "", source: leagueName || "Volleyball",
          publishedAt: m.date?.slice(0, 10) || today,
          lang: "es", country,
        });
      }
      for (const h of (highlightsData.data || [])) {
        const ctry = h.match?.country?.name || "";
        apiArticles.push({
          title: h.title || "Highlight",
          description: h.description || "",
          url: h.url || "", image: "",
          source: h.channel || h.source || "Highlights",
          publishedAt: h.match?.date?.slice(0, 10) || today,
          lang: "en", country: ctry,
        });
      }
      setArticles([...spainNews, ...apiArticles]);
    } catch { /* fallback mantiene spainNews */ }
    finally { setNewsLoading(false); }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;
    const newPost: Post = {
      id: Date.now(),
      name: form.name.trim(),
      role: form.role.trim() || userTypeLabels[form.userType],
      userType: form.userType,
      type: form.type,
      text: form.text.trim(),
      date: new Date().toISOString().slice(0, 10),
      likes: 0, likedBy: [], comments: [],
    };
    setPosts(prev => [newPost, ...prev]);
    saveProfile({ name: form.name.trim(), role: form.role.trim(), userType: form.userType });
    setForm(f => ({ ...f, type: "comentario", text: "" }));
    setShowForm(false);
  };

  const handleLike = (postId: number) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const already = p.likedBy.includes(sessionId);
      return { ...p, likes: already ? p.likes - 1 : p.likes + 1, likedBy: already ? p.likedBy.filter(id => id !== sessionId) : [...p.likedBy, sessionId] };
    }));
  };

  const toggleComments = (postId: number) => {
    setExpandedComments(prev => { const next = new Set(prev); if (next.has(postId)) next.delete(postId); else next.add(postId); return next; });
    if (!commentForms[postId]) setCommentForms(prev => ({ ...prev, [postId]: { name: "", text: "" } }));
  };

  const handleCommentSubmit = (postId: number) => {
    const cf = commentForms[postId];
    if (!cf || !cf.name.trim() || !cf.text.trim()) return;
    const nc: PostComment = { id: Date.now(), name: cf.name.trim(), text: cf.text.trim(), date: new Date().toISOString().slice(0, 10) };
    setPosts(prev => prev.map(p => p.id !== postId ? p : { ...p, comments: [...p.comments, nc] }));
    setCommentForms(prev => ({ ...prev, [postId]: { name: "", text: "" } }));
  };

  const handleShare = async (post: Post) => {
    const t = `📢 ${post.name} (${post.role}) compartió en VolleySocial:\n\n"${post.text}"`;
    if (navigator.share) { try { await navigator.share({ title: `VolleySocial - ${post.name}`, text: t, url: window.location.href }); return; } catch { /* */ } }
    try { await navigator.clipboard.writeText(`${t}\n\n${window.location.href}`); alert("📋 Copiado al portapapeles."); } catch { prompt("Copia este enlace:", window.location.href); }
  };

  const handleTranslate = async (postId: number, text: string, title?: string) => {
    setTranslating(prev => { const n = new Set(prev); n.add(postId); return n; });
    try {
      const toTranslate = title ? `${title}. ${text}` : text;
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(toTranslate)}&langpair=en|es`);
      const data = await res.json();
      if (data.responseData?.translatedText) {
        const full = data.responseData.translatedText;
        let newTitle = title;
        let newText = full;
        if (title && full.includes(". ")) {
          const dot = full.indexOf(". ");
          newTitle = full.slice(0, dot).replace(/\.$/, "");
          newText = full.slice(dot + 2);
        }
        setArticles(prev => prev.map((a, i) => -(i + 1) === postId ? { ...a, title: newTitle || a.title, description: newText, lang: "es" } : a));
      }
    } catch { /* */ } finally {
      setTranslating(prev => { const n = new Set(prev); n.delete(postId); return n; });
    }
  };

  const newsPosts: Post[] = articles.map((a, i) => ({
    id: -(i + 1), name: "Noticias Voleibol", role: a.source, userType: "otro", type: "noticia", text: a.description,
    date: a.publishedAt, likes: 0, likedBy: [], comments: [], articleTitle: a.title, articleUrl: a.url, articleImage: a.image,
    articleLang: a.lang, articleCountry: a.country,
  }));

  const countries = [...new Set(newsPosts.map(p => p.articleCountry).filter(Boolean))].sort() as string[];
  const filteredNews = filter === "todas" ? newsPosts : newsPosts.filter(p => p.articleCountry === filter);
  const filteredNewsSorted = [...filteredNews].sort((a, b) => a.articleCountry === "España" ? -1 : b.articleCountry === "España" ? 1 : 0);
  const combinedPosts = [...filteredNewsSorted, ...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <div className={styles.profileCard}>
              <div className={styles.profileAvatar}>{user ? user.name.charAt(0).toUpperCase() : form.name ? form.name.charAt(0).toUpperCase() : "?"}</div>
              <div className={styles.profileInfo}>
                <p className={styles.profileName}>{user ? user.name : (form.name || "Invitado")}</p>
                {user ? <p className={styles.profileEmail}>{user.email}</p> : <p className={styles.profileRole}>{form.role || userTypeLabels[form.userType]}</p>}
                <span className={`${styles.profileBadge} ${styles[`pro${form.userType}`]}`}>
                  {userTypeLabels[form.userType]}
                </span>
              </div>
            </div>
          </div>

          <nav className={styles.sidebarNav}>
            <a href="#" className={styles.navItemActive}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              Feed
            </a>
            <a href="#" className={styles.navItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
              Noticias
            </a>
            <a href="#" className={styles.navItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Entrenadores
            </a>
            <a href="#" className={styles.navItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              Jugadores
            </a>
          </nav>

          {countries.length > 0 && (
            <div className={styles.sidebarCard}>
              <h4 className={styles.sidebarCardTitle}>Filtrar por país</h4>
              <div className={styles.filterList}>
                <button className={`${styles.filterBtn} ${filter === "todas" ? styles.filterActive : ""}`} onClick={() => setFilter("todas")}>🌍 Todas</button>
                {countries.filter(c => c === "España").map(c => (
                  <button key={c} className={`${styles.filterBtn} ${styles.filterSpain} ${filter === c ? styles.filterActive : ""}`} onClick={() => setFilter(c)}>{c} 🇪🇸</button>
                ))}
                {countries.filter(c => c !== "España").map(c => (
                  <button key={c} className={`${styles.filterBtn} ${filter === c ? styles.filterActive : ""}`} onClick={() => setFilter(c)}>{c}</button>
                ))}
              </div>
            </div>
          )}

          <div className={styles.sidebarCard}>
            <h4 className={styles.sidebarCardTitle}>Entrenadores destacados</h4>
            <div className={styles.sidebarCoaches}>
              {coaches.map(c => (
                <div key={c.name} className={styles.sidebarCoach}>
                  <div className={styles.sidebarCoachAvatar}>{c.name.charAt(0)}</div>
                  <div>
                    <p className={styles.sidebarCoachName}>{c.name}</p>
                    <p className={styles.sidebarCoachRole}>{c.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.sidebarCard}>
            <h4 className={styles.sidebarCardTitle}>Noticias en vivo</h4>
            <p className={styles.apiNote}>
              {newsLoading ? "Cargando..." : "✓ Noticias actualizadas"}
            </p>
            <button className={styles.refreshBtn} onClick={fetchNews} disabled={newsLoading}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
              Refrescar noticias
            </button>
          </div>
        </aside>

        <main className={styles.main}>
          <div className={styles.createPost}>
            <div className={styles.createPostHeader}>
              <div className={styles.createPostAvatar}>{form.name ? form.name.charAt(0).toUpperCase() : "?"}</div>
              <input
                className={styles.createPostInput}
                placeholder="¿Qué quieres compartir?"
                onFocus={() => setShowForm(true)}
                readOnly
              />
            </div>

            {showForm && (
              <form className={styles.createPostForm} onSubmit={handleSubmit}>
                <div className={styles.cpRow}>
                  <div className={styles.cpField}>
                    <label className={styles.cpLabel}>Nombre</label>
                    <input type="text" placeholder="Tu nombre" className={styles.cpInput} value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div className={styles.cpField}>
                    <label className={styles.cpLabel}>Tipo</label>
                    <select className={styles.cpInput} value={form.userType}
                      onChange={e => setForm({ ...form, userType: e.target.value as "entrenador" | "jugador" | "otro" })}>
                      <option value="jugador">Jugador</option><option value="entrenador">Entrenador</option><option value="otro">Otro</option>
                    </select>
                  </div>
                </div>
                <div className={styles.cpRow}>
                  <div className={styles.cpField}>
                    <label className={styles.cpLabel}>Rol</label>
                    <input type="text" placeholder={form.userType === "entrenador" ? "Ej: Entrenador juvenil" : form.userType === "jugador" ? "Ej: Líbero" : "Ej: Scout"} className={styles.cpInput} value={form.role}
                      onChange={e => setForm({ ...form, role: e.target.value })} />
                  </div>
                  <div className={styles.cpField}>
                    <label className={styles.cpLabel}>Tipo</label>
                    <select className={styles.cpInput} value={form.type}
                      onChange={e => setForm({ ...form, type: e.target.value as Post["type"] })}>
                      <option value="comentario">💬 Comentario</option><option value="logro">🏆 Logro</option><option value="trabajo">📋 Trabajo</option>
                    </select>
                  </div>
                </div>
                <textarea className={styles.cpTextarea} placeholder={
                  form.type === "logro" ? "Cuéntanos tu logro..." : form.type === "trabajo" ? "Comparte tu trabajo..." : "Comparte tu experiencia..."
                } rows={3} value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} required />
                <div className={styles.cpActions}>
                  <button type="button" className={styles.cpCancel} onClick={() => setShowForm(false)}>Cancelar</button>
                  <button type="submit" className={styles.cpSubmit}>Publicar</button>
                </div>
              </form>
            )}
          </div>

          {newsLoading && <p className={styles.loading}>Actualizando noticias...</p>}

          <div className={styles.feed}>
            {combinedPosts.map(post => (
              <article key={post.id} className={`${styles.post} ${post.type === "noticia" ? styles.postNews : ""}`}>
                <div className={styles.postHead}>
                  <div className={styles.postAvatar}>{post.type === "noticia" ? "📰" : post.name.charAt(0)}</div>
                  <div className={styles.postMeta}>
                    <div className={styles.postNameRow}>
                      <span className={styles.postName}>{post.name}</span>
                      <span className={`${styles.badge} ${styles[`b${post.userType}`]}`}>{userTypeLabels[post.userType]}</span>
                      <span className={`${styles.badge} ${styles[`t${post.type}`]}`}>{typeLabels[post.type]}</span>
                    </div>
                      <span className={styles.postRole}>{post.role} · {post.date}{post.articleLang === "en" ? <span className={styles.langBadge}>EN</span> : post.articleLang === "es" ? <span className={`${styles.langBadge} ${styles.langEs}`}>ES</span> : null}</span>
                  </div>
                </div>

                {post.type === "noticia" ? (
                  <div className={styles.postBody}>
                    <a href={post.articleUrl} target="_blank" rel="noopener noreferrer" className={styles.newsTitleLink}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      {post.articleTitle}
                    </a>
                    <p className={styles.postText}>{post.text}</p>
                  </div>
                ) : (
                  <p className={styles.postText}>{post.text}</p>
                )}

                <div className={styles.postActions}>
                  <button className={`${styles.action} ${post.likedBy.includes(sessionId) ? styles.actionLiked : ""}`} onClick={() => handleLike(post.id)}>
                    <LikeIcon filled={post.likedBy.includes(sessionId)} /><span>{post.likes > 0 ? post.likes : "Me gusta"}</span>
                  </button>
                  <button className={styles.action} onClick={() => toggleComments(post.id)}>
                    <CommentIcon /><span>{post.comments.length > 0 ? post.comments.length : "Comentar"}</span>
                  </button>
                  <button className={styles.action} onClick={() => handleShare(post)}>
                    <ShareIcon /><span>Compartir</span>
                  </button>
                </div>

                {expandedComments.has(post.id) && (
                  <div className={styles.comments}>
                    {post.comments.map(cm => (
                      <div key={cm.id} className={styles.comment}>
                        <div className={styles.commentAvatar}>{cm.name.charAt(0)}</div>
                        <div className={styles.commentBody}>
                          <div className={styles.commentHead}>
                            <span className={styles.commentName}>{cm.name}</span>
                            <span className={styles.commentDate}>{cm.date}</span>
                          </div>
                          <p className={styles.commentText}>{cm.text}</p>
                        </div>
                      </div>
                    ))}
                    <form className={styles.commentForm} onSubmit={e => { e.preventDefault(); handleCommentSubmit(post.id); }}>
                      <input type="text" placeholder="Tu nombre" className={styles.cmInput} value={commentForms[post.id]?.name || ""}
                        onChange={e => setCommentForms(prev => ({ ...prev, [post.id]: { ...prev[post.id], name: e.target.value } }))} required />
                      <div className={styles.cmRow}>
                        <input type="text" placeholder="Escribe un comentario..." className={styles.cmInput} value={commentForms[post.id]?.text || ""}
                          onChange={e => setCommentForms(prev => ({ ...prev, [post.id]: { ...prev[post.id], text: e.target.value } }))} required />
                        <button type="submit" className={styles.cmBtn}>Enviar</button>
                      </div>
                    </form>
                  </div>
                )}
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
