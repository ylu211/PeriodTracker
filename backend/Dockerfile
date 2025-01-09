# Utilisation de l'image de base
FROM node:22-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers nécessaires dans le conteneur
COPY package*.json ./

# Installer les dépendances
RUN npm install 

# Copie du reste des fichiers de l'application 
COPY . .

# Build de l'application NestJs
RUN npm run build 

# Exposer le port utilisé par le seveur 
EXPOSE 3001

# Lancer le serveur
CMD ["npm", "run", "start"] 