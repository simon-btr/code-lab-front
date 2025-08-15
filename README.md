# 📋 Collaborative To-Do Lists - Frontend

Interface utilisateur de mon projet code-lab , développée avec **React**.  
Ce front interagit avec l’API backend pour permettre aux utilisateurs d'accéder à différentes applications tel que gérer leurs listes de tâches collaboratives en temps réel.

---

## 🚀 Fonctionnalités

- **Authentification**
  - Inscription et connexion via JWT
  - Stockage sécurisé du token

- **Gestion des listes**
  - Création, modification et suppression
  - Ajout et suppression de membres
  - Changement du titre de la liste
  - Protection contre les suppressions non autorisées (alerte 403)

- **Gestion des tâches**
  - Ajout, modification, suppression
  - Marquer comme complétée / non complétée
  - Attribution à un membre

- **Interface responsive**
  - Adaptée aux écrans d’ordinateur, tablettes et téléphones
  - Navigation simple et claire

---

## 🛠️ Technologies utilisées

- **React 18**
- React Router DOM
- Context API (gestion de l'authentification)
- Axios (requêtes HTTP)
- CSS (responsive design)
- Vite (pour le build et le dev server)

---

## 📂 Structure du projet

frontend/  
│── src/  
│ ├── components/ # Composants réutilisables (Header, Footer, etc.)  
│ ├── context/ # AuthContext pour la gestion du token utilisateur  
│ ├── pages/ # Pages (Login, Register, TodoListsPage, TodoListDetailsPage)  
│ ├── services/ # API service (Axios wrapper)  
│ ├── App.jsx # Routing principal  
│ └── main.jsx # Point d'entrée  
│── public/  
│── package.json  

---

## ⚙️ Installation

### 1️⃣ Cloner le dépôt
git clone https://github.com/simon-btr/code-lab-front  
cd code-lab-front  

### 2️⃣ Installer les dépendances  
npm install  

#### ️3️⃣ Configurer l’URL du backend
Dans src/services/api.js, mettre l’URL de votre backend :  
const API_URL = "http://localhost:8080";  

### 4️⃣ Lancer l’application
npm run dev  
Le frontend sera accessible sur :  
http://localhost:5173  

📡 Communication avec le backend  
Ce frontend est conçu pour fonctionner avec le backend disponible ici :  
👉 [Code-lab-back](https://github.com/simon-btr/code-lab-back)

📄 Licence  
Ce projet est sous licence MIT.  
Vous êtes libre de l’utiliser, le modifier et le redistribuer à des fins personnelles ou professionnelles, avec attribution.