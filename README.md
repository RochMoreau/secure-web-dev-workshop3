# Workshop 3 - Create an API (ExpressJS)

## 🌟 Goal

> Build a REST API with ExpressJS

## 👷 Prerequisites

1. Fork this repository then clone it on your computer
2. install Insomnia (or your API Testing tool of choice)
3. Paste your .env file from workshop2 containing credentials to your Mongo Database

## 🗒 What to do

> ⚠ Commit your changes after **each** instruction, following the commit message format:
> ```text
> feat(1): Initiate NPM Project
> ```

1. Install existing packages with `npm install`
   > ```shell
   >  npm install
   > ```
2. Add NPM packages `express`
   > Mongoose is a package making mongo request easier and more secure
   > ```shell
   > npm install --save express
   > ```
3. Put your database credentials in a file named `.env` (from Workshop2)
4. Take a look at the architecture 
   > One Folder per entity.
   > In each folder, 3 files:
   > 
   > entity.controller.js -> Presentation Layer, API
   > 
   > entity.service.js -> Business Logic Layer
   > 
   > entity.model.js -> Database Layer
5. Implement a "Hello World" route, on GET / that returns "Hello World"
   1. Visit the route at http://localhost:3000/
6. Create the API CRUD for Location
   1. Create routes at Presentation Layer
   2. Implement business logic in the Location Service
   > ```
   > For reference, CRUD:
   > Create: /locations
   > Update: /locations/:id
   > Request (Get All: /locations , Get One: /locations/:id)
   > Delete: /locations/:id
   > ```
## .ENV

Le fichier .env contient une variable MONGO_URI avec le lien de la database MongoDB, ainsi qu'une variable SECRET_JWT avec une clé qui dans mon cas a été secret

## Pour utiliser l'API
lancer index.js
Puis sur insomnia
Pour se register : ajouter un body JSON à la requête 
Pour se log mettez le même body JSON qui a été registered
Tout utilisateur créé est user //il n'est pas possible de créé un admin
Puis copier le token qui est retourné 
Ajouter une Authorization "Bearer Token" et coller le token pour les autres fonction qui nécessite d'etres connecter 

## SonarCloud

https://sonarcloud.io/summary/new_code?id=tristrat_secure-web-dev-workshop3

