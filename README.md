# Kids Learning Hub

A Nuxt 3 app with interactive math and literacy games for early learners.

---

## Games

### STEM
- **Math Grid** (`/stem/math-grid`) — Fill a grid of equations. Configurable via nav:
  - **Sum button** cycles: `Sum = 10 → Sum = 20 → Sum = 30 → Sum < 10 → Sum < 20 → Sum < 30`
    - `Sum = N` — every equation's result is exactly N
    - `Sum < N` — results range from 2 up to and including N
  - **Missing** — cycles which part of the equation is the blank (`?+b=s`, `a+?=s`, `a+b=?`)
  - **+ − Mix** — addition, subtraction, or both
  - **Practice #** — forces a chosen number (1–10) to appear in every equation; integrates with Sum mode (e.g. `Sum = 10, Practice # = 6` always produces `6 + 4 = 10`)
- **Addition Mission** (`/stem/addition-mission`) — Ten-frame number bond practice with emoji/block modes
- **Subtraction Mission** (`/stem/subtraction-mission`)
- **Counting** (`/stem/counting`)
- **Patterns** (`/stem/patterns`)
- **Coding Missions** (`/stem/coding-missions`)

### Literacy
- **Word Sounds** (`/literacy`) — Drag or click words to match sounds; includes a spelling mode with on-screen keyboard. French and English.

---

## Shared Components

- **`GameNav.vue`** — Reusable nav bar with `backTo`, `backLabel`, `score` props and left/center/right slots
- **`YaBud.vue`** — Success overlay ("Ya Bud!" + confetti) triggered by a `show` prop; slot for custom equation display
- **`useProgress.js`** — Composable for tracking game sessions in localStorage. Fields: `gameId`, `skill`, `tags`, `completed`, `score`, `stars`, `attempts`, `duration`, `timestamp`. Exposes `startSession`, `endSession`, `recordAttempt`, `dashboard`, `bySkill`.
- **`/dashboard`** — Progress dashboard: per-game stats, star ratings, skill filter, recent session log.

---

# Kids Game Engine Monetization Strategy

---

## 1) Tiering Strategy

### 🟢 Free (No Account, Instant Play)
- Immediate access to games (no signup)
- Rotating or limited game set
- Session-only progress (local storage)
- Basic feedback after each session

**Goal:** Hook users, build trust, encourage repeat use

---

### 🟡 Free Account (Optional)
- Save progress across sessions/devices
- Basic progress tracking (recent scores, streaks)
- Resume gameplay anywhere

**Triggers:**
- “Save your progress”
- “Continue on another device”

**Goal:** Low-friction conversion

---

### 🔵 Paid (Subscription or Packs)
- Full game library (no rotation)
- Full learning reports (parent-facing insights)
- Skill breakdown + long-term improvement tracking
- Exportable reports (PDF/share)
- Advanced modes / extra levels

**Triggers:**
- “See full report”
- “Unlock all games”
- “Track improvement over time”

**Goal:** Monetize insight and depth, not access

---

### 🟣 One-Time Purchases (No Account Required)
- Extra level packs
- Unlock specific game sets
- Temporary full access (e.g. 7-day pass)

**Goal:** Capture impulse parent spending

---

## 2) School / Curriculum Strategy

### 🏫 A. Teacher Mode (No Student Accounts)
**Teachers get:**
- Pre-built game sets by:
  - Grade (e.g. Grade 1 Math)
  - Topic (fractions, reading comprehension, etc.)
- Ability to run sessions in class
- Group-level session summaries

**Students:**
- Join via class code or URL
- No login required

**Key Insight:** Teachers avoid tools requiring student accounts

---

### 🧩 B. Custom Curriculum Packs (B2B Revenue)
- Game sets mapped to:
  - Regional curriculum (e.g. Ontario)
  - Specific units or topics
- Structured progression aligned to lessons
- Increasing difficulty across sessions

**Monetization:**
- Per-class license
- Per-school license
- District-level deals

**Role:** Primary revenue driver

---

### 🛠️ C. Custom Game Builder (Productized Service)
**Offer:**
- Custom-built games for specific content

**Audience:**
- Schools
- Tutors
- Homeschool groups

**Output:**
- Custom game URLs
- Topic-specific or branded experiences

**Pricing:**
- Setup fee ($100–$1000+)
- Optional ongoing subscription (hosting/updates)

---

### 📊 D. Reporting Layer (Paid)
**For Schools:**
- Class-level performance summaries
- Skill gap analysis
- Downloadable reports

**For Parents:**
- Individual child progress tracking
- Improvement insights over time

**Note:** Same system, different audience views

---

### 🔁 E. Hybrid Growth Funnel

1. Kids/parents discover via free play  
2. Teachers discover classroom use case  
3. Teachers adopt → bring students  
4. Parents see value → upgrade for reports  
5. Schools request custom content → higher-value sales  

---

## 3) Core Strategy

> Let kids play for free → charge adults (parents/teachers) for insight, structure, and control.