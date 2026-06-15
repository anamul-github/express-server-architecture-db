# Express.js Server Architecture & Database Integration

This repository contains my hands-on practice for Express.js server architecture, REST API development, PostgreSQL database integration, modular backend structure, and user authentication using TypeScript.

This project is part of my backend development practice where I am re-practicing important Express.js concepts in detail with a more organized and scalable structure.

## What I Practiced

* Setting up an Express.js server with TypeScript
* Understanding Express request and response handling
* Using Express middleware

  * `express.json()`
  * `express.text()`
  * `express.urlencoded()`
* Setting up PostgreSQL with Neon Serverless Cloud
* Connecting Express.js with PostgreSQL using `pg` Pool
* Creating database tables from the backend
* Exploring SQL data types
* Writing SQL queries inside service layers
* Creating REST API endpoints
* Testing APIs with Postman
* Handling route parameters
* Adding basic validation
* Handling errors using `try/catch`
* Using parameterized SQL queries
* Setting up environment-based configuration using `.env` and `dotenv`
* Separating port and database connection configuration into a config file
* Refactoring the project into a modular backend structure
* Separating route, controller, and service responsibilities
* Creating user profile APIs
* Managing user profile data with SQL references
* Understanding authentication and authorization
* Hashing passwords with bcrypt
* Comparing hashed passwords during login
* Creating JWT tokens for authentication
* Organizing authentication logic into a separate module

## Technologies Used

* Node.js
* Express.js
* TypeScript
* PostgreSQL
* Neon Serverless Cloud
* pg
* dotenv
* bcrypt
* jsonwebtoken
* Postman
* TSX

## Project Structure

```bash
express-js/
├── src/
│   ├── config/
│   │   └── index.ts
│   ├── db/
│   │   └── index.ts
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.route.ts
│   │   │   └── auth.service.ts
│   │   ├── profile/
│   │   │   ├── profile.controller.ts
│   │   │   ├── profile.route.ts
│   │   │   └── profile.service.ts
│   │   └── user/
│   │       ├── user.controller.ts
│   │       ├── user.interface.ts
│   │       ├── user.route.ts
│   │       └── user.service.ts
│   ├── app.ts
│   └── server.ts
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```

## API Endpoints

### Root Route

```http
GET /
```

Returns a basic server response.

---

## User Routes

### Create User

```http
POST /api/users
```

Creates a new user in the PostgreSQL database.

Example request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "age": 25
}
```

### Get All Users

```http
GET /api/users
```

Retrieves all users from the database.

### Get Single User

```http
GET /api/users/:id
```

Retrieves a single user by ID.

### Update User

```http
PUT /api/users/:id
```

Updates a user by ID.

Example request body:

```json
{
  "name": "Updated Name",
  "password": "newpassword123",
  "age": 30,
  "is_active": true
}
```

### Delete User

```http
DELETE /api/users/:id
```

Deletes a user by ID.

---

## Profile Routes

### Create Profile

```http
POST /api/profiles
```

Creates a profile for a user.

Example request body:

```json
{
  "user_id": 1,
  "bio": "This is my profile",
  "address": "Dhaka",
  "phone": "123456",
  "gender": "Male"
}
```

---

## Auth Routes

### Login User

```http
POST /api/auth/login
```

Authenticates a user and returns a JWT token.

Example request body:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

## How to Run This Project

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Server will run on:

```bash
http://localhost:3000
```

## Learning Summary

In this project, I practiced how an Express.js backend works with a real PostgreSQL database and a modular backend architecture. I implemented user CRUD operations, profile creation, authentication flow, password hashing, JWT token generation, and environment-based configuration.

The main goal of this practice was to strengthen my backend foundation by understanding how Express.js, REST APIs, PostgreSQL, Neon, modular architecture, authentication, and server configuration work together in a real backend application.
