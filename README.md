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

Debugging Notes

During development, I encountered an issue where port 3000 was already occupied by another Node.js process.

To identify which process was using the port, I used:

```bash
netstat -ano | findstr :3000
```

This returned the Process ID (PID).

Example:

```
TCP 0.0.0.0:3000 LISTENING 10640
```

To stop that process:

```bash
taskkill /PID 10640 /F
```

After freeing the port, the application started successfully.

##WEEK 3
In Week 2, I built a Task API using Node.js and Express.js. The tasks were stored in a JavaScript array in memory, which meant that all task data was lost whenever the server was restarted.

In Week 3, I continued working on the same project and replaced the in-memory task storage with a SQLite database. The API endpoints remained the same, but the way the data was stored changed. Tasks are now stored in a database file called tasks.db, which allows the data to persist even after restarting the server.

This assignment helped me understand the difference between the API layer and the data storage layer. The client still communicates with the same API endpoints, while the backend now uses SQL queries and SQLite to store and manage the task data.

Stage 0 — Creating the SQLite Database

I connected the Node.js and Express application to SQLite using better-sqlite3. I created the tasks.db database and the tasks table. Three example tasks are added only when the table is empty

Stage 1 — Reading Tasks from the Database

I replaced the in-memory array reading logic with SQLite database operations. The API can retrieve all tasks or a single task by ID. Unknown task IDs still return a 404 error.

Stage 2 — Creating New Tasks in the Database

I updated the POST endpoint to save new tasks directly into SQLite. The existing validation and response status codes remained the same. Tasks now persist after restarting the server.

Stage 3 — Updating and Deleting Tasks

I replaced the in-memory update and delete operations with SQLite operations. PUT updates an existing task, while DELETE removes it from the database. I tested both operations through the API.
Stage 4 — Exploring SQLite and SQL Queries

I opened tasks.db using DB Browser for SQLite and manually explored the database. I performed operations to view, filter, count, update, and delete tasks. I then verified the database changes through the API
---

## Author

Backend AI Engineering Internship Project
