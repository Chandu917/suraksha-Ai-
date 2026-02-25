# SurakshaAI — Project Summary
> Last Updated: 26 February 2026

---

## 🌐 Live URLs
| URL | Purpose |
|-----|---------|
| https://surakshai.vercel.app | **Primary URL (share this)** |
| https://surakshagpt.vercel.app | Alternate short URL |

## 📦 GitHub Repository
- **Repo:** https://github.com/Chandu917/suraksha-Ai-
- **Branch:** `main`
- **Latest commit:** ChatGPT-style chat layout + all features

---

## 🔑 Environment Variables (Vercel)
| Key | Purpose |
|-----|---------|
| `GOOGLE_GENAI_API_KEY` | Gemini AI responses |
| `GOOGLE_API_KEY` | Google AI backup key |

---

## 📄 Pages & Routes
| Route | Description |
|-------|-------------|
| `/` | Landing Page |
| `/login` | Animated login (fingerprint, binary rain, circuit traces) |
| `/signup` | User registration |
| `/chat` | AI Chat (ChatGPT-style layout) |
| `/scan-url` | URL scanner tool |
| `/password-strength` | Password strength analyzer |
| `/reports` | Security analytics & scan history |
| `/settings` | Profile & security (real user credentials) |
| `/dashboard` | Security dashboard with charts |
| `/library` | Saved AI responses |

---

## ✅ Features Built
- 🔐 **Animated Login Page** — fingerprint scan, binary rain, circuit board animations
- 👤 **Auth System** — signup/login/logout with localStorage
- 🤖 **AI Chat** — Gemini AI, ChatGPT-style full-width bubbles, markdown rendering
- 🔗 **URL Scanner** — AI-powered phishing detection
- 🔑 **Password Analyzer** — strength checker
- 📊 **Reports Page** — charts, threat breakdown, scan history
- ⚙️ **Settings** — real user profile pre-filled from account
- 🛡️ **Auth Guard** — protected routes redirect to login
- 🌙 **Dark cybersecurity theme** throughout

---

## 🛠️ Tech Stack
- **Framework:** Next.js 15 (App Router)
- **AI:** Google Gemini via Genkit
- **Styling:** TailwindCSS + custom CSS
- **Auth:** localStorage-based (client-side)
- **Hosting:** Vercel (public, no auth wall)
- **Repo:** GitHub → auto-deploy on push

---

## 🚀 Local Development
```bash
cd /Users/gangachandu/Desktop/surakshagpt
npm run dev
# → http://localhost:3000
```

## 📤 Deploy to Vercel
```bash
vercel --prod --yes
```

## 💾 Push to GitHub
```bash
git add -A
git commit -m "your message"
git push origin main
```
