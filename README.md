 Task API

A simple REST API built using Node.js and Express.

This project was created to practice backend fundamentals by implementing a complete CRUD API for managing tasks.

---

## Features

- GET / (API information)
- GET /health
- GET /tasks
- GET /tasks/:id
- POST /tasks
- PUT /tasks/:id
- DELETE /tasks/:id

---

## Technologies

- Node.js
- Express.js

---


Move into the project.

## Installation

Clone the repository.

```bash
git clone <repository-url>
```

Move into the project.

```bash
cd task-api
```

Install dependencies.

```bash
npm install
```

Run the server.

```bash
node app.js
```

Server starts at

```
http://localhost:3000
```

---
## API Endpoints

| Method | Endpoint | Description |
|----------|-------------|---------------------------|
| GET | / | API information |
| GET | /health | Health check |
| GET | /tasks | Get all tasks |
| GET | /tasks/:id | Get task by ID |
| POST | /tasks | Create a new task |
| PUT | /tasks/:id | Update a task |
| DELETE | /tasks/:id | Delete a task |

---
