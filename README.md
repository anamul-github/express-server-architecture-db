# Express.js Server Architecture & Database Integration

This repository contains my hands-on practice for Express.js server architecture, REST API development, PostgreSQL database integration, and backend configuration using TypeScript.

This project is part of my backend development practice where I am re-practicing important Express.js concepts in detail.

## What I Practiced

* Setting up an Express.js server with TypeScript
* Understanding Express request and response handling
* Using Express middleware

  * `express.json()`
  * `express.text()`
  * `express.urlencoded()`
* Setting up PostgreSQL with Neon Serverless Cloud
* Connecting Express.js with PostgreSQL using `pg` Pool
* Creating a database table from the backend
* Exploring SQL data types
* Writing SQL queries inside API routes
* Creating REST API endpoints
* Testing APIs with Postman
* Handling route parameters
* Adding basic validation
* Handling errors using `try/catch`
* Using parameterized SQL queries
* Setting up environment-based configuration using `.env` and `dotenv`
* Separating port and database connection configuration into a config file

## Technologies Used

* Node.js
* Express.js
* TypeScript
* PostgreSQL
* Neon Serverless Cloud
* pg
* dotenv
* Postman
* TSX

## API Endpoints

### Root Route

```http
GET /
```

Returns a basic server response.

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

This update uses SQL `COALESCE`, so only the provided fields are updated.

### Delete User

```http
DELETE /api/users/:id
```

Deletes a user by ID.

## Database Table

The project creates a `users` table if it does not already exist.

```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  age INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Project Structure

```bash
express-js/
├── src/
│   ├── config/
│   │   └── index.ts
│   └── server.ts
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── tsconfig.json
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

In this project, I practiced how an Express.js backend works with a real PostgreSQL database. I implemented basic CRUD operations, tested endpoints using Postman, used parameterized SQL queries, and organized environment-based configuration for cleaner server setup.

The main goal of this practice was to strengthen my backend foundation by understanding how Express.js, REST APIs, PostgreSQL, Neon, and server configuration work together.
