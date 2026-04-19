# Authentification - Texte Ajuste Et Diagrammes

Le flux est le suivant : l’etudiant saisit son email et son mot de passe dans l’interface, puis l’application envoie la requete de connexion au service d’authentification. Si la connexion reussit, le service renvoie l’utilisateur et les jetons, la session est enregistree cote client, puis l’utilisateur est redirige vers le Dashboard. Si la connexion echoue, le service renvoie une erreur (401/400) et l’interface affiche un message d’erreur.

## Figure 4 - Diagramme De Sequence (Mermaid)

```mermaid
%%{init: {
  "theme": "base",
  "themeVariables": {
    "background": "#f3f3f3",
    "primaryColor": "#e8e4f8",
    "primaryBorderColor": "#c9bdf2",
    "primaryTextColor": "#2f2f2f",
    "secondaryColor": "#f5f2ff",
    "secondaryBorderColor": "#d8cdf7",
    "lineColor": "#8f84c8",
    "tertiaryColor": "#f8f8f8"
  }
}}%%
sequenceDiagram
    autonumber
    actor E as Etudiant
    participant UI as Interface (PWA)
    participant API as Service Auth API
    participant S as Session (client)

    E->>UI: Saisir email + mot de passe
    UI->>API: POST /auth/login

    alt Succes
        API-->>UI: user + accessToken + refreshToken
        UI->>S: Enregistrer session
        UI-->>E: Redirection vers Dashboard
    else Echec
        API-->>UI: 401/400 + message generique
        UI-->>E: Afficher message d'erreur
    end
```

## Diagramme D’activites (Mermaid)

```mermaid
%%{init: {
  "theme": "base",
  "themeVariables": {
    "background": "#f3f3f3",
    "primaryColor": "#e8e4f8",
    "primaryBorderColor": "#c9bdf2",
    "primaryTextColor": "#2f2f2f",
    "secondaryColor": "#f5f2ff",
    "secondaryBorderColor": "#d8cdf7",
    "lineColor": "#8f84c8",
    "tertiaryColor": "#f8f8f8"
  }
}}%%
flowchart TD
    A([Debut]) --> B[Saisie des identifiants]
    B --> C[POST /auth/login]
    C --> D{Authentification valide\net role STUDENT ?}
    D -- Oui --> E[Retour user + tokens]
    E --> F[Stockage session client]
    F --> G[Redirection Dashboard]
    D -- Non --> H[Retour 401/400]
    H --> I[Afficher message d'erreur generique]
    G --> J([Fin])
    I --> J
```
