# VTU Question Bank 📚

> **One Place for Every VTU Question Paper**

A modern, production-ready VTU Question Paper Repository where students can upload, browse, search, preview, and download previous-year VTU question papers.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwindcss)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma)

## ✨ Features

- 📤 **Upload Papers** — Drag & drop PDF upload with validation and progress tracking
- 🔍 **Smart Search** — AI-powered natural language search ("4th sem ADA paper")
- 🎛️ **Advanced Filters** — Filter by branch, semester, year, month, exam type
- 👁️ **PDF Preview** — In-browser preview with zoom, fullscreen, and download
- 📊 **Analytics Dashboard** — Track uploads, downloads, views with branch/semester stats
- 🛡️ **Admin Panel** — Approve/reject papers, manage reports, view analytics
- 🤖 **AI Categorization** — Auto-detect subject, branch, semester from PDF text
- 🌙 **Dark/Light Mode** — Beautiful theme with glassmorphism design
- 📱 **Fully Responsive** — Mobile-first design that works on all devices
- 🔒 **Security** — Rate limiting, input validation, PDF validation, XSS protection

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React 19, TypeScript |
| Styling | Tailwind CSS v4, ShadCN UI, Framer Motion |
| Backend | Next.js API Routes |
| Database | PostgreSQL + Prisma ORM |
| Storage | Cloudinary |
| Deployment | Vercel |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Cloudinary account

### 1. Clone & Install

```bash
cd vtu-question-bank
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/vtu_question_bank"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Admin (change this!)
ADMIN_SECRET="your-super-secret-admin-key"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Seed with sample data
npx prisma db seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── papers/               # Browse & detail pages
│   ├── upload/               # Upload page
│   ├── dashboard/            # User dashboard
│   ├── admin/[secret]/       # Admin panel
│   └── api/                  # API routes
├── components/
│   ├── ui/                   # ShadCN components
│   ├── landing/              # Landing page sections
│   ├── papers/               # Paper components
│   └── shared/               # Shared components
├── lib/                      # Utilities & config
├── hooks/                    # Custom React hooks
└── types/                    # TypeScript types
```

## 🔐 Admin Access

Admin panel is accessible at:
```
/admin/YOUR_ADMIN_SECRET
```

Replace `YOUR_ADMIN_SECRET` with the value of `ADMIN_SECRET` in your `.env.local`.

## 🌐 Deployment (Vercel)

1. Push code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Database for Production

Use one of these providers:
- [Neon](https://neon.tech) (recommended, free tier)
- [Supabase](https://supabase.com)
- [Vercel Postgres](https://vercel.com/storage/postgres)

### Cloudinary Setup

1. Create account at [cloudinary.com](https://cloudinary.com)
2. Go to **Settings → Security** → Enable PDF delivery
3. Copy cloud name, API key, and API secret

## 📦 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

npx prisma studio    # Open Prisma Studio (database GUI)
npx prisma migrate dev  # Run database migrations
npx prisma db seed   # Seed database
npx prisma generate  # Generate Prisma client
```

## 🎓 Supported Branches

CSE • ISE • AIML • AIDS • ECE • EEE • MECH • CIVIL • CHEMICAL • BIOTECH

## 📋 API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/papers` | GET | List papers (with filters) |
| `/api/papers` | POST | Create paper |
| `/api/papers/[id]` | GET | Get paper details |
| `/api/papers/[id]/download` | POST | Track download |
| `/api/papers/[id]/view` | POST | Track view |
| `/api/upload` | POST | Upload PDF |
| `/api/search` | GET | Search papers |
| `/api/analytics` | GET | Get analytics |
| `/api/report` | POST | Report paper |
| `/api/admin/papers` | GET/POST | Admin paper management |
| `/api/admin/reports` | GET/DELETE | Admin reports |

---

Made with ❤️ for VTU Students
