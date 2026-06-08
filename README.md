# 📋 LIFE CONTROL SYSTEM — SECOND BRAIN
## Application Personnelle Complète (Vue d'Ensemble Technique)

---

## 🎯 RÉSUMÉ EXÉCUTIF

**Nom du Projet:** Life Control System — Second Brain  
**Slogan:** TABLEAU DE BORD 2026 - CENTRE DE CONTRÔLE DE LA VIE  
**Stack:** React + TypeScript + Vite (Frontend) | Node.js + Express (Backend) | PostgreSQL + Prisma (DB)  
**Thème:** Mode sombre épuré, UI compacte, 1 emoji max par section  
**Déploiement cible:** Web responsive, base pour intégration Notion/Indify

---

## 📊 ARCHITECTURE BASE DE DONNÉES

### Pages Principales (7 total)

1. **Dashboard** 🎯 - Centre de contrôle avec 5 sections (progression, aujourd'hui, objectifs, agenda, habitudes)
2. **BAC 2026** 📚 - Système de contrôle BAC (17 sujets philo + maths + anglais)
3. **Calendrier** 📅 - Événements, examens, deadlines
4. **Habit Tracker** ⚡ - Suivi quotidien (9 habitudes + score)
5. **Goals** 🎯 - Objectifs par domaine (USA, Bac, Vie)
6. **USA** 🇺🇸 - Dossier universitaire complet
7. **Tech/Cyber** 💻 - Compétences informatiques

---

## 🗄️ TABLES BASE DE DONNÉES

### 1. SUBJECTS (BAC)
- **Name** : Titre du sujet
- **Type** : Philosophie | Mathématiques | Anglais | Autre
- **Chapter** : Sous-titre optionnel
- **Level** : 0-10
- **Mastery** : Pas commencé | En cours | Bien | Solide
- **Understood** : Checkbox
- **Exam** : Checkbox
- **Confidence** : 0-10
- **Notes** : Text

**Données pré-chargées:**
- 17 sujets Philosophie
- 7 sujets Mathématiques
- 6 sujets Anglais

### 2. HABIT_ENTRIES (Suivi Quotidien)
- **Date** : Unique par jour
- **Mathematics** : Checkbox
- **Philosophy** : Checkbox
- **English** : Checkbox
- **Informatics** : Checkbox
- **Gym** : Checkbox
- **Sleep** : Checkbox
- **Water** : Checkbox
- **Organization** : Checkbox
- **PersonalProject** : Checkbox
- **Score** : Formula `(somme checkboxes) / 9` → 0.0 - 1.0

### 3. CALENDAR_EVENTS
- **Name** : Titre
- **Type** : Examen | Devoirs | Événement | Objectif
- **Date** : DateTime
- **Domain** : Bac | États-Unis d'Amérique | Personnel

### 4. GOALS
- **Name** : Titre
- **Domain** : USA | Bac | Vie
- **Progress** : 0-100 (%)
- **Deadline** : Date optionnelle
- **Status** : Not started | In progress | Done
- **Description** : Text

**Exemples pré-chargés:**
- TOEFL Score 100+ (45%)
- Common App Essays (20%)
- Visa F1 Preparation (30%)
- Maîtriser 17 sujets Philo (82%)
- Mathématiques 20/20 (65%)

### 5. TASKS
- **Name** : Titre
- **Description** : Text
- **DueDate** : Date
- **Status** : Not started | In progress | Done
- **Domain** : Bac | États-Unis | Personnel
- **GoalId** : Relation à GOALS
- **Tags** : Python | JavaScript | Linux | Cybersecurity | GitHub

---

## 📱 PAGES DÉTAILS

### PAGE 1 — DASHBOARD (/)
**Titre:** 🎯 TABLEAU DE BORD 2026 - CENTRE DE CONTRÔLE DE LA VIE

**SECTION 1 — Progression Globale**
- Carte 1: Progression BAC (% de sujets compris)
- Carte 2: Progrès États-Unis (moyenne goals USA)
- Carte 3: Progrès de la Vie (moyenne habitudes 7j)

**SECTION 2 — Aujourd'hui**
- Liste filtrée: Tasks dueDate=today AND status != Done
- Max 5 items visibles

**SECTION 3 — Objectifs Actuels**
- Gallery 3 colonnes
- Filtre: status != Done

**SECTION 4 — Agenda Rapide**
- Mini calendrier + liste 7 prochains jours

**SECTION 5 — Habitudes d'Aujourd'hui**
- Table interactive (9 checkboxes)
- Live score update

---

### PAGE 2 — BAC 2026 (/bac)
**Titre:** 📚 SYSTÈME DE CONTRÔLE BAC

**Vues:**
- Tableau Philosophie (17 sujets)
- Tableau Mathématiques (7 sujets)
- Tableau Anglais (6 sujets)
- Vue Progrès Global (% global avec rollup)

**Fonctionnalités:**
- Édition inline
- Tri par type, niveau, maîtrise
- Calcul de progression en temps réel

---

### PAGE 3 — CALENDRIER (/calendar)
**Titre:** 📅 CALENDRIER 2026

**Vues:**
- Calendrier full (month view, couleurs par domaine)
- 7 prochains jours (list)
- Examens seulement (filtrée)

---

### PAGE 4 — HABIT TRACKER (/habits)
**Titre:** ⚡ SUIVI DES HABITUDES

**Vues:**
- Table par jour (défaut)
- Calendrier (coloration par score)
- Aujourd'hui seulement (éditable)

**Graphique:**
- **Indify Integration** : Line chart Score vs Date (7/30/90 jours)
- Alternative : Chart natif si disponible

**Export:**
- CSV téléchargeable

---

### PAGE 5 — GOALS (/goals)
**Titre:** 🎯 OBJECTIFS 2026

**Vues:**
- Gallery (défaut, 3 colonnes)
- Kanban (par status)
- Filtrée par domaine (USA / Bac / Vie)

---

### PAGE 6 — USA (/usa)
**Titre:** 🇺🇸 ÉTATS-UNIS D'AMÉRIQUE

**Sections:**
1. **TOEFL** - Score target + mock tests
2. **Common App** - Essays + recommendations
3. **Universités** - List + status
4. **Visa F1** - Checklist documents
5. **Budget** - Financements

---

### PAGE 7 — TECH (/tech)
**Titre:** 💻 COMPÉTENCES INFORMATIQUE

**Vues par tag:**
- Python (70% progress)
- JavaScript (60% progress)
- Linux (80% progress)
- Cybersecurity (45% progress)
- GitHub (85% progress)

**Affichage:**
- Ressources par compétence
- Projets GitHub liés
- Progression globale

---

## 🎨 DESIGN SYSTEM

### Couleurs (Mode Sombre)
```css
--bg-primary: #0F0F0F;
--bg-secondary: #1A1A1A;
--text-primary: #FFFFFF;
--text-secondary: #B0B0B0;
--accent-primary: #3B82F6;   /* Bleu */
--accent-secondary: #10B981; /* Vert */
--accent-warning: #F59E0B;   /* Orange */
--domain-bac: #3B82F6;       /* Bleu */
--domain-usa: #10B981;       /* Vert */
--domain-life: #F59E0B;      /* Orange */
```

### Emojis (Max 1 par Section)
- Dashboard: 🎯
- BAC: 📚
- Calendar: 📅
- Habits: ⚡
- Goals: 🎯
- USA: 🇺🇸
- Tech: 💻
- Graph: 📈

---

## 🚀 STACK TECHNIQUE

### Frontend
- **React 18** + TypeScript
- **Vite** (build tool)
- **TailwindCSS** (styling)
- **React Router** (navigation)
- **Axios** (API calls)
- **Recharts** (charts)

### Backend
- **Node.js** + Express
- **PostgreSQL**
- **Prisma** (ORM)
- **Jest** (tests)

### Intégrations
- **Indify** (graphiques avancés)
- **GitHub API** (repos)

---

## 📋 STRUCTURE PROJET

```
life-control-system/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Bac.tsx
│   │   │   ├── Calendar.tsx
│   │   │   ├── Habits.tsx
│   │   │   ├── Goals.tsx
│   │   │   ├── USA.tsx
│   │   │   └── Tech.tsx
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── dashboard/
│   │   │   ├── bac/
│   │   │   ├── habits/
│   │   │   └── layouts/
│   │   ├── hooks/
│   │   ├── api/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── styles/
│   │   └── App.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── backend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   ├── controllers/
│   │   │   └── middleware/
│   │   ├── services/
│   │   ├── db/
│   │   ├── utils/
│   │   ├── config/
│   │   └── app.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── docker-compose.yml
└── README.md
```

---

## ✅ CHECKLIST LIVRAISON

### Phase 1: Configuration Base
- [ ] Repo créé et initié
- [ ] .env configuré
- [ ] PostgreSQL setup
- [ ] Prisma schéma défini

### Phase 2: Backend
- [ ] API CRUD complète (Subjects, Habits, Goals, Calendar, Tasks)
- [ ] Calculs (score habitudes, progression BAC/USA/Vie)
- [ ] Export CSV
- [ ] Tests unitaires

### Phase 3: Frontend
- [ ] 7 pages principales
- [ ] Composants réutilisables
- [ ] Design system mode sombre
- [ ] Intégration API

### Phase 4: Graphiques & Données
- [ ] Indify integration
- [ ] Data seeding (17 philo + maths + anglais + goals USA + samples)
- [ ] Exports fonctionnels

### Phase 5: Déploiement
- [ ] Build production
- [ ] Docker setup
- [ ] CI/CD GitHub Actions
- [ ] Domain + SSL

---

## 🔗 RESSOURCES

- **Docs Prisma:** https://www.prisma.io/docs/
- **React:** https://react.dev/
- **Express:** https://expressjs.com/
- **Indify:** https://indify.co

---

**Status:** 🟡 En attente de développement  
**Version:** 1.0 (Spécification Complète)  
**Created:** 2026-06-08
