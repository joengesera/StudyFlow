# Script de soutenance — StudyFlow

**Durée :** 3 minutes (180s)
**Ton :** décontracté, vivant
**Format :** storyboard visuel (écran / parole / note technique)

---

## 1. Accroche — "Le problème" (0:00 → 0:20)

**Écran :** écran de connexion / accueil, puis montage de 3-4 réalités étudiantes (notification d'examen en retard, tableau de notes dispersées, todo oubliée).

**Parole :**
> "En tant qu'étudiants, on a tous vécu ça : des cours, des travaux, des examens qui s'accumulent, des notes éparpillées... Et personne ne nous dit \u2014 juste avant la deadline \u2014 qu'on est en train de couler un cours. C'est ce vide que StudyFlow remplit."

**Note technique :** ne pas rentrer dans la technique ici. Juste l'émotion.

---

## 2. La solution — StudyFlow en une phrase (0:20 → 0:35)

**Écran :** logo StudyFlow + tagline « Academic Excellence ».

**Parole :**
> "StudyFlow, c'est une application web pour étudiants : on planifie ses cours, ses tâches et ses travaux, on suit ses notes, et surtout, elle analyse son risque académique en temps réel."

**Note technique :** stack visible en petit en bas d'écran si le jury regarde — React + TypeScript + Node.js.

---

## 3. Démo — Le Dashboard (0:35 → 1:05)

**Écran :** `/dashboard` connecté — cartes résumé (moyenne, score de risque, tâches actives), frise des événements du jour, barres de progression.

**Parole :**
> "Dès qu'on ouvre l'app, le dashboard nous donne l'essentiel en un coup d'œil : la moyenne générale, les tâches actives et le score de risque global. Les événements du jour sont affichés heure par heure."

**Geste :** passer le curseur sur la carte de risque.

**Note technique (10s) :** "La moyenne se calcule en local pour que l'affichage soit instantané ; le détail du risque, lui, est calculé côté serveur avec des moteurs de points et de statistiques."

---

## 4. Démo — Agenda + Création intelligente (1:05 → 1:35)

**Écran :** `/agenda` (planning hebdomadaire), puis clic sur la FAB « Créer » → « Création intelligente ».

**Parole :**
> "Sur l'agenda, tout est filtrable par cours. Et la fonctionnalité que je préfère : la création intelligente. On écrit en langage naturel — par exemple \u201creviser maths demain matin urgent\u201d — et StudyFlow crée la tâche avec la date et l'urgence déjà comprises. Zéro navigation, zéro formulaire."

**Geste :** taper la phrase, montrer la tâche qui apparaît dans le Kanban.

**Note technique :** parsing NLP local (typiquement <10ms), aucun appel réseau.

---

## 5. Démo — Kanban, Pomodoro et Mode Focus (1:35 → 2:05)

**Écran :** `/tasks` — tableau Kanban avec drag & drop, puis le widget Pomodoro, puis `/focus/:taskId` plein écran.

**Parole :**
> "Les tâches sont gérées en Kanban avec un simple drag & drop. Intégré au tableau, un minuteur Pomodoro suit le temps réellement passé. Et quand on veut vraiment se concentrer, le mode Focus ouvre la tâche en plein écran — sous le compteur Pomodoro, on enchaîne automatiquement sur la prochaine tâche prioritaire. Les autres tâches 'en cours' passent en attente : une seule chose à la fois."

**Note technique :** la sélection de la prochaine tâche est automatique (algorithme de priorisation), et le timer survit même au rechargement de la page.

---

## 6. Démo — Le risque académique (2:05 → 2:30)

**Écran :** `/risk` — score global + cartes par cours (performance, procrastination, pression).

**Parole :**
> "Le cœur de StudyFlow, c'est l'analyse de risque. Pour chaque cours : un score global, décomposé en risque de performance, de procrastination et de pression d'examen. Avec des conseils actionnables pour redresser la barre avant qu'il ne soit trop tard."

**Note technique :** la logique est déterministe et transparente — on peut expliquer pourquoi chaque note est donnée, pas une boîte noire.

---

## 7. Du code à l'expérience : l'offline-first (2:30 → 2:45)

**Écran :** afficher la Sync Status (coupure réseau), démontrer une action qui se sync quand le réseau revient, ou montrer le Service Worker en DevTools / la PWA installée.

**Parole :**
> "Et le vrai défi technique, c'est la mobilité. StudyFlow est offline-first : tous les changements sont appliqués immédiatement, en local, même sans réseau — dans le métro, dans un amphi. Dès que la connexion revient, tout se synchronise en arrière-plan automatiquement. L'app s'installe même sur mobile comme une vraie PWA."

**Geste :** toggler offline dans DevTools, montrer la file de synchronisation qui se vide.

---

## 8. Clôture (2:45 → 3:00)

**Écran :** logo StudyFlow + « Merci » / onglets de contact.

**Parole :**
> "StudyFlow, c'est finalement trois choses : une organisation complète de la vie académique, une alerte précoce sur le risque de décrochage, et une expérience fluide — partout, même hors-ligne. Merci, je suis prêt pour vos questions."

---

## Aides mémoire (à ne pas dire mais à garder en tête)

| Question probable | Élément à sortir |
|---|---|
| « Comment ça gère l'offline ? » | File d'attente chiffrée en IndexedDB, sync par lots avec clés d'idempotence, coalescence des opérations |
| « Comment est calculé le risque ? » | Moteur de points + moteur de statistiques, risque = performance + procrastination + pression |
| « Quelle sécurité ? » | JWT, refresh tokens en rotation, AES-GCM pour le stockage local, notification push protégées |
| « Pourquoi ce stack ? » | React + Vite + TanStack Query côté front ; Node.js + Prisma côté back ; une seule langue (TypeScript) |
| « Vision ? » | Notifications push personnalisées, profils de promotion entiers, disponibilité en réel multi-appareils |