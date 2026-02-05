# Společně v Jehnicích

Webové stránky politické skupiny Společně v Jehnicích.

## Technologie

- **React 18** + TypeScript
- **Vite** - build tool
- **Tailwind CSS** - styling
- **shadcn/ui** - UI komponenty
- **Supabase** - backend (databáze + edge functions)
- **React Query** - data fetching

## Struktura projektu

```
src/
├── pages/          # Stránky aplikace
├── components/     # React komponenty
│   ├── layout/     # Layout (Header, Footer)
│   ├── home/       # Komponenty domovské stránky
│   └── ui/         # shadcn/ui komponenty
├── data/           # Statická data (úspěchy, novinky)
├── hooks/          # Custom React hooks
├── lib/            # Utility funkce
├── assets/         # Obrázky a média
└── integrations/   # Integrace (Supabase)
```

## Instalace

```bash
# Instalace závislostí
npm install

# Vytvoření .env souboru
cp .env.example .env
# Vyplňte Supabase credentials
```

## Vývoj

```bash
# Spuštění dev serveru
npm run dev

# Build pro produkci
npm run build

# Linting
npm run lint
```

## Stránky

- `/` - Domovská stránka
- `/tym` - Tým skupiny
- `/program` - Program
- `/uspechy` - Galérie úspěchů
- `/zpravodaj` - Zpravodaj/noviny
- `/admin` - Administrace článků

## Supabase

Projekt využívá Supabase pro:
- Databázi článků (PostgreSQL)
- Edge Functions pro admin API
- Row Level Security

### Databázové tabulky

- `articles` - Články zpravodaje
- `article_documents` - Přílohy k článkům
- `admin_users` - Admin uživatelé

## Deployment

Projekt je připraven pro deployment na platformy jako:
- Vercel
- Netlify
- Cloudflare Pages

```bash
npm run build
# Výstup v dist/ složce
```

## Licence

MIT
