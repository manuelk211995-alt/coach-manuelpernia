# 🏐 Manuel Pernia — Coach de Voleibol

Plataforma oficial de **Manuel Pernia**, entrenador profesional de voleibol.

## Stack

- **Frontend:** Next.js 15 + React 19 + TypeScript
- **Monorepo:** Turborepo + npm workspaces
- **UI:** Componentes compartidos en `@coach/ui`
- **Tipos:** Tipos compartidos en `@coach/types`
- **Config:** Configuración centralizada en `@coach/config`

## Estructura

```
coach-manuelpernia/
├── apps/
│   └── web/              # Aplicación web (Next.js)
├── packages/
│   ├── ui/               # Componentes UI compartidos
│   ├── types/            # Tipos TypeScript compartidos
│   └── config/           # Configuración del sitio
├── turbo.json            # Pipeline de Turborepo
└── package.json          # Raíz del monorepo
```

## Desarrollo

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Licencia

MIT © 2026 Manuel Pernia
