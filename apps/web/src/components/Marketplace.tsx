"use client";

import { useState, useEffect, useMemo, type FormEvent } from "react";
import { AnimateIn } from "./AnimateIn";
import styles from "./Marketplace.module.css";

type Tab = "player" | "team" | "coach";
type SubTab = "explore" | "mine";

interface Listing {
  id: number;
  userId: number;
  type: "player" | "team" | "coach";
  name: string;
  role: string;
  category: string;
  qualification: string;
  location: string;
  description: string;
  tags: string;
  active: number;
  createdAt: string;
  userName: string;
  userEmail: string;
}

interface FormData {
  type: "player" | "team" | "coach";
  name: string;
  role: string;
  category: string;
  qualification: string;
  location: string;
  description: string;
  tags: string[];
}

const emptyForm: FormData = {
  type: "player",
  name: "",
  role: "",
  category: "",
  qualification: "",
  location: "",
  description: "",
  tags: [],
};

const positions = [
  { value: "", label: "Cualquier posicion" },
  { value: "Colocador", label: "Colocador" },
  { value: "Receptor", label: "Receptor" },
  { value: "Central", label: "Central" },
  { value: "Opuesto", label: "Opuesto" },
  { value: "Libero", label: "Libero" },
];

const formPositions = positions.slice(1);

const categories = [
  { value: "", label: "Cualquier categoria" },
  { value: "Senior", label: "Senior" },
  { value: "Junior", label: "Junior" },
  { value: "Juvenil", label: "Juvenil" },
  { value: "Cadete", label: "Cadete" },
  { value: "Infantil", label: "Infantil" },
  { value: "Alevin", label: "Alevin" },
  { value: "Benjamin", label: "Benjamin" },
];

const formCategories = categories.slice(1);

const qualifications = [
  { value: "", label: "Nivel 1" },
  { value: "Nivel 1", label: "Nivel 1" },
  { value: "Nivel 2", label: "Nivel 2" },
  { value: "Nivel 3", label: "Nivel 3" },
];

const locations = [
  "Madrid", "Barcelona", "Valencia", "Sevilla", "Malaga",
  "Almeria", "Bilbao", "Zaragoza", "Murcia", "Palma",
  "Las Palmas", "Alicante", "Cordoba", "Valladolid", "Granada",
];

export function Marketplace() {
  const [tab, setTab] = useState<Tab>("player");
  const [subTab, setSubTab] = useState<SubTab>("explore");
  const [listings, setListings] = useState<Listing[]>([]);
  const [myListings, setMyListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [tagInput, setTagInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const [position, setPosition] = useState("");
  const [category, setCategory] = useState("");
  const [qualification, setQualification] = useState("");

  const [detailItem, setDetailItem] = useState<Listing | null>(null);
  const [contactItem, setContactItem] = useState<Listing | null>(null);

  const fetchListings = async (overrideTab?: Tab) => {
    const activeTab = overrideTab ?? tab;
    const params = new URLSearchParams();
    params.set("type", activeTab);
    if (position && activeTab !== "coach") params.set("role", position);
    if (category) params.set("category", category);
    if (qualification && activeTab === "coach") params.set("qualification", qualification);
    const res = await fetch(`/api/listings?${params}`);
    const data = await res.json();
    setListings(data.listings ?? []);
  };

  const fetchMyListings = async () => {
    const res = await fetch("/api/listings/mine");
    if (!res.ok) { setMyListings([]); return; }
    const data = await res.json();
    setMyListings(data.listings ?? []);
  };

  useEffect(() => {
    setLoading(true);
    setPosition("");
    setCategory("");
    setQualification("");
    fetchListings().finally(() => setLoading(false));
  }, [tab]);

  useEffect(() => {
    if (subTab === "explore") fetchListings();
  }, [position, category, qualification]);

  useEffect(() => {
    if (subTab === "mine") fetchMyListings();
  }, [subTab]);

  const filtered = useMemo(() => {
    if (subTab === "mine") return myListings;
    return listings;
  }, [subTab, listings, myListings]);

  const openForm = (listing?: Listing) => {
    if (listing) {
      let tags: string[] = [];
      try { tags = JSON.parse(listing.tags); } catch {}
      setForm({
        type: listing.type,
        name: listing.name,
        role: listing.role,
        category: listing.category,
        qualification: listing.qualification,
        location: listing.location,
        description: listing.description,
        tags,
      });
      setEditingId(listing.id);
    } else {
      setForm({ ...emptyForm, type: tab });
      setEditingId(null);
    }
    setTagInput("");
    setFormError("");
    setShowForm(true);
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, t] }));
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");

    if (!form.name || !form.category || !form.description) {
      setFormError("Completa todos los campos obligatorios");
      return;
    }
    if (form.type !== "coach" && !form.role) {
      setFormError("Selecciona una posicion");
      return;
    }
    if (form.type !== "coach" && !form.location) {
      setFormError("Selecciona una ubicacion");
      return;
    }
    if (form.type === "coach" && !form.qualification) {
      setFormError("Selecciona una titulacion");
      return;
    }

    setSubmitting(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/listings/${editingId}` : "/api/listings";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "Error al guardar anuncio");
        return;
      }

      setShowForm(false);
      setEditingId(null);
      fetchListings();
      fetchMyListings();
    } catch {
      setFormError("Error de conexion");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/listings/${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchMyListings();
      fetchListings();
    }
  };

  const handleToggleActive = async (id: number, active: boolean) => {
    const res = await fetch(`/api/listings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !active }),
    });
    if (res.ok) {
      fetchMyListings();
      fetchListings();
    }
  };

  const tabLabel = tab === "player" ? "Busco equipo" : tab === "team" ? "Buscar jugador" : "Buscar entrenador";
  const createLabel = tab === "player" ? "Ofrecerme" : tab === "team" ? "Buscar jugador" : "Buscar entrenador";

  return (
    <section className={styles.section} id="marketplace">
      <div className={styles.container}>
        <AnimateIn>
          <div className={styles.header}>
            <p className={styles.tag}>Mercado de Voleibol</p>
            <h2 className={styles.title}>
              Conectamos jugadores, entrenadores y clubes
            </h2>
            <p className={styles.subtitle}>
              Encuentra el equipo ideal o el talento que necesitas para tu club.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn>
          <div className={styles.tabs}>
            {(["player", "team", "coach"] as const).map((t) => (
              <button
                key={t}
                className={`${styles.tab} ${tab === t ? styles.tabActive : ""}`}
                onClick={() => setTab(t)}
              >
                {t === "player" ? "Busco equipo" : t === "team" ? "Buscar jugador" : "Buscar entrenador"}
              </button>
            ))}
          </div>
        </AnimateIn>

        <AnimateIn>
          <div className={styles.topBar}>
            <div className={styles.subTabBar}>
              <button
                className={`${styles.subTab} ${subTab === "explore" ? styles.subTabActive : ""}`}
                onClick={() => setSubTab("explore")}
              >
                Explorar
              </button>
              <button
                className={`${styles.subTab} ${subTab === "mine" ? styles.subTabActive : ""}`}
                onClick={() => setSubTab("mine")}
              >
                Mis anuncios
              </button>
            </div>
            <button className={styles.createBtn} onClick={() => openForm()}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              {createLabel}
            </button>
          </div>
        </AnimateIn>

        {subTab === "explore" && (
          <AnimateIn>
            <div className={styles.filters}>
              {tab !== "coach" && (
                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Posicion</label>
                  <select className={styles.select} value={position} onChange={(e) => setPosition(e.target.value)}>
                    {positions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Categoria</label>
                <select className={styles.select} value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              {tab === "coach" && (
                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Titulacion</label>
                  <select className={styles.select} value={qualification} onChange={(e) => setQualification(e.target.value)}>
                    <option value="">Cualquier nivel</option>
                    {qualifications.slice(1).map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              )}
              <button className={styles.searchBtn} onClick={() => fetchListings()}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                Buscar
              </button>
            </div>
          </AnimateIn>
        )}

        <div className={styles.results}>
          {loading ? (
            <div className={styles.empty}><p className={styles.emptyText}>Cargando...</p></div>
          ) : filtered.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
              <p className={styles.emptyText}>No se encontraron resultados</p>
              <p className={styles.emptySubtext}>
                {subTab === "mine" ? "Crea tu primer anuncio para aparecer aqui" : "Prueba con otros filtros"}
              </p>
            </div>
          ) : (
            filtered.map((item) => (
              <MarketplaceCard
                key={item.id}
                item={item}
                isMine={subTab === "mine"}
                onEdit={subTab === "mine" ? () => openForm(item) : undefined}
                onDelete={subTab === "mine" ? handleDelete : undefined}
                onToggleActive={subTab === "mine" ? handleToggleActive : undefined}
                onViewDetail={() => setDetailItem(item)}
                onContact={subTab !== "mine" ? () => setContactItem(item) : undefined}
              />
            ))
          )}
        </div>
      </div>

      {/* Modal formulario crear/editar */}
      {showForm && (
        <div className={styles.overlay} onClick={() => setShowForm(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>{editingId ? "Editar anuncio" : createLabel}</h3>
              <button className={styles.modalClose} onClick={() => setShowForm(false)}>x</button>
            </div>
            {formError && <div className={styles.serverError} style={{ marginBottom: "1rem" }}>{formError}</div>}
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label className={styles.label}>Tipo</label>
                  <select className={styles.selectForm} value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value as Tab }))}>
                    <option value="player">Busco equipo</option>
                    <option value="team">Buscar jugador</option>
                    <option value="coach">Buscar entrenador</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>{form.type === "player" ? "Nombre" : "Club / Entidad"}</label>
                  <input className={styles.input} placeholder={form.type === "player" ? "Tu nombre" : "Nombre del club"} value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
                </div>
              </div>

              {form.type !== "coach" && (
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>Posicion / Rol</label>
                    <select className={styles.selectForm} value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}>
                      <option value="">Selecciona...</option>
                      {formPositions.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Categoria</label>
                    <select className={styles.selectForm} value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}>
                      <option value="">Selecciona...</option>
                      {formCategories.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
                    </select>
                  </div>
                </div>
              )}

              {form.type === "coach" && (
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>Titulacion</label>
                    <select className={styles.selectForm} value={form.qualification} onChange={(e) => setForm((p) => ({ ...p, qualification: e.target.value }))}>
                      <option value="">Selecciona...</option>
                      {qualifications.slice(1).map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Categoria</label>
                    <select className={styles.selectForm} value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}>
                      <option value="">Selecciona...</option>
                      {formCategories.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
                    </select>
                  </div>
                </div>
              )}

              {form.type !== "coach" && (
                <div className={styles.field}>
                  <label className={styles.label}>Ubicacion</label>
                  <select className={styles.selectForm} value={form.location} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}>
                    <option value="">Selecciona...</option>
                    {locations.map((l) => (<option key={l} value={l}>{l}</option>))}
                  </select>
                </div>
              )}

              <div className={styles.field}>
                <label className={styles.label}>Descripcion</label>
                <textarea className={styles.textarea} rows={3} placeholder={
                  form.type === "player" ? "Describe tu perfil como jugador..." :
                  form.type === "team" ? "Describe que tipo de jugador buscas..." :
                  "Describe que tipo de entrenador buscas..."
                } value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Etiquetas</label>
                <div className={styles.tagInputRow}>
                  <input className={`${styles.input} ${styles.tagInput}`} placeholder="Ej: Experiencia, Liderazgo" value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }} />
                  <button type="button" className={styles.tagAddBtn} onClick={addTag}>Anadir</button>
                </div>
                {form.tags.length > 0 && (
                  <div className={styles.tagList}>
                    {form.tags.map((t) => (
                      <span key={t} className={styles.tagChip}>{t}<button type="button" className={styles.tagRemove} onClick={() => removeTag(t)}>x</button></span>
                    ))}
                  </div>
                )}
              </div>

              <button type="submit" className={styles.submitBtn} disabled={submitting}>
                {submitting ? "Publicando..." : editingId ? "Guardar cambios" : "Publicar anuncio"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal detalle */}
      {detailItem && (
        <div className={styles.overlay} onClick={() => setDetailItem(null)}>
          <div className={styles.detailModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>{detailItem.name}</h3>
              <button className={styles.modalClose} onClick={() => setDetailItem(null)}>x</button>
            </div>
            <DetailContent item={detailItem} />
          </div>
        </div>
      )}

      {/* Modal contacto */}
      {contactItem && (
        <div className={styles.overlay} onClick={() => setContactItem(null)}>
          <div className={styles.contactModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Contactar</h3>
              <button className={styles.modalClose} onClick={() => setContactItem(null)}>x</button>
            </div>
            <div className={styles.contactBody}>
              <div className={styles.contactAvatar}>
                {contactItem.userName.charAt(0).toUpperCase()}
              </div>
              <p className={styles.contactName}>{contactItem.userName}</p>
              <p className={styles.contactEmail}>{contactItem.userEmail}</p>
              <p className={styles.contactLabel}>Anuncio: {contactItem.name}</p>
              <a href={`mailto:${contactItem.userEmail}?subject=Contacto desde VolleySocial - ${contactItem.name}`} className={styles.contactBtn}>
                Enviar correo
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function DetailContent({ item }: { item: Listing }) {
  const tags: string[] = (() => { try { return JSON.parse(item.tags); } catch { return []; } })();
  const typeLabel = item.type === "player" ? "Jugador" : item.type === "coach" ? "Entrenador" : "Club";
  const roleOrQual = item.type === "coach" ? item.qualification : item.role;

  return (
    <div className={styles.detailBody}>
      <div className={styles.detailGrid}>
        <div className={styles.detailField}>
          <span className={styles.detailLabel}>Tipo</span>
          <span className={styles.detailValue}>{typeLabel}</span>
        </div>
        <div className={styles.detailField}>
          <span className={styles.detailLabel}>{item.type === "coach" ? "Titulacion" : "Posicion"}</span>
          <span className={styles.detailValue}>{roleOrQual || "-"}</span>
        </div>
        <div className={styles.detailField}>
          <span className={styles.detailLabel}>Categoria</span>
          <span className={styles.detailValue}>{item.category}</span>
        </div>
        {item.location && (
          <div className={styles.detailField}>
            <span className={styles.detailLabel}>Ubicacion</span>
            <span className={styles.detailValue}>{item.location}</span>
          </div>
        )}
        <div className={styles.detailField}>
          <span className={styles.detailLabel}>Publicado por</span>
          <span className={styles.detailValue}>{item.userName}</span>
        </div>
        <div className={styles.detailField}>
          <span className={styles.detailLabel}>Fecha</span>
          <span className={styles.detailValue}>{new Date(item.createdAt).toLocaleDateString("es-ES")}</span>
        </div>
      </div>
      <div className={styles.detailSection}>
        <span className={styles.detailLabel}>Descripcion</span>
        <p className={styles.detailDescription}>{item.description}</p>
      </div>
      {tags.length > 0 && (
        <div className={styles.detailTags}>
          {tags.map((t) => (<span key={t} className={`${styles.tagPill} ${styles.tagPillPurple}`}>{t}</span>))}
        </div>
      )}
    </div>
  );
}

function MarketplaceCard({
  item, isMine, onEdit, onDelete, onToggleActive, onViewDetail, onContact,
}: {
  item: Listing;
  isMine: boolean;
  onEdit?: () => void;
  onDelete?: (id: number) => void;
  onToggleActive?: (id: number, active: boolean) => void;
  onViewDetail: () => void;
  onContact?: () => void;
}) {
  const tags: string[] = (() => { try { return JSON.parse(item.tags); } catch { return []; } })();
  const typeLabel = item.type === "player" ? "Jugador" : item.type === "coach" ? "Entrenador" : "Club";
  const roleOrQual = item.type === "coach" ? item.qualification : item.role;
  const isInactive = !item.active;

  return (
    <AnimateIn>
      <div className={`${styles.card} ${isInactive ? styles.cardInactive : ""}`} onClick={onViewDetail} style={{ cursor: "pointer" }}>
        {isInactive && <div className={styles.inactiveBadge}>Cerrado</div>}
        <div className={styles.cardHeader}>
          <div className={styles.cardAvatar}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <div className={styles.cardInfo}>
            <div className={styles.cardName}>{item.name}</div>
            <div className={styles.cardMeta}>{typeLabel} &middot; {roleOrQual} &middot; {item.userName}</div>
          </div>
        </div>
        <div className={styles.tags}>
          <span className={`${styles.tagPill} ${styles.tagPillPurple}`}>{item.category}</span>
          {item.type === "coach" && <span className={styles.tagPill}>{item.qualification}</span>}
          {item.type !== "coach" && item.location && <span className={styles.tagPill}>{item.location}</span>}
          {tags.slice(0, 2).map((t) => (<span key={t} className={styles.tagPill}>{t}</span>))}
          {tags.length > 2 && <span className={styles.tagPill}>+{tags.length - 2}</span>}
        </div>
        <p className={styles.cardDescription}>{item.description}</p>
        <div className={styles.cardFooter} onClick={(e) => e.stopPropagation()}>
          <span className={styles.cardLocation}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {item.location || "Sin ubicacion"}
          </span>
          <div className={styles.cardActions}>
            {isMine ? (
              <>
                {onToggleActive && (
                  <button className={styles.cardActionSmall} onClick={() => onToggleActive(item.id, !!item.active)}>
                    {item.active ? "Cerrar" : "Reabrir"}
                  </button>
                )}
                {onEdit && <button className={styles.cardActionSmall} onClick={onEdit}>Editar</button>}
                {onDelete && <button className={styles.deleteBtn} onClick={() => onDelete(item.id)}>Eliminar</button>}
              </>
            ) : (
              !isInactive && onContact && <button className={styles.cardAction} onClick={onContact}>Contactar</button>
            )}
          </div>
        </div>
      </div>
    </AnimateIn>
  );
}
