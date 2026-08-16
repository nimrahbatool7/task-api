console.log("this is the main task file ");


const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./openapi.json');
const Database = require('better-sqlite3');

const app = express();
app.use(express.json());
const tasks = require('./task_List.js');
const PORT = 3000;



const db = new Database('tasks.db');

      
// Create tasks table if it does not exist.
    db.exec(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            done INTEGER NOT NULL DEFAULT 0
        )
    `);
    function getAllTasks ()
        {
            return db
            .prepare(`SELECT * FROM tasks`)
            .all();
        }


// Add example tasks only when the table is empty.
const taskCount = db
    .prepare('SELECT COUNT(*) AS count FROM tasks')
    .get();

if (taskCount.count === 0) {
    const insertTask = db.prepare(
        'INSERT INTO tasks (title, done) VALUES (?, ?)'
    );

    insertTask.run('study', 0);
    insertTask.run('exercise', 0);
    insertTask.run('read', 1);
};
//adding an endpoint get
app.get('/', (req, res) =>
{
    return res.json({
        name : "Task API",
        version : "1.0",
        endpoints : ["/tasks"],
    })
})

app.get("/health", (req, res) =>
{
    return res.json({
        "status" : "ok",
    })
})

// Stage 2 — Read: list and single task 

// getting task file 
app.get('/tasks', (req, res) =>
{
    const allTasks = db
    .prepare("SELECT * FROM tasks")
    .all();

    return res.json(allTasks);
})
// returning task with id 

app.get('/tasks/:id', (req, res) =>
{
    const task_id = Number(req.params.id);
    const task = db
    .prepare('SELECT * FROM tasks where id = ?')
    .get(task_id);
    if(task)
    {
        return res.json(task)
    }
    else{
        return res.status(404).json({
            error:"TASK not found "
        })
    }
})

// Create: POST a new task 
app.post('/tasks', (req, res)=> {
    const { title , done} = req.body;
    if(!title)
    {
        return res.status(400).json(
            {
                error:`task ${title} not added, please give some title!`
            }
        )
    }
    const result = db
    .prepare('INSERT INTO tasks (title, done) VALUES (?,?)')
    .run(title, done);

    const newTaskAdded = db
    .prepare('SELECT * FROM tasks WHERE id = ?')
    .get(result.lastInsertRowid);

    return(res.status(201).json(newTaskAdded));
    // newTask.run('dinner', 1);
    // newTask.run('Breaskfast', 0);
    // newTask.run('work', 1);
    // newTask.run('sleep', 1);

});

// Stage 4 — Update & Delete 
app.put('/tasks/:id', (req, res) =>
{
    const id = Number(req.params.id);

    const {title, done} = req.body;
    const updateTask = db
    .prepare('UPDATE tasks SET title = ?, done = ? WHERE id = ?')
    .run(title, done, id);

    if(updateTask.changes===0)
    {
        return res.status(404).json(
            {
                error: "Task with id not found "
            }
        );
    }
    const updatedTasks = getAllTasks();
    return res.json(updatedTasks);

});
console.log("DELETE route loaded");

app.delete('/tasks/:id', (req, res) =>
{
    const id = Number(req.params.id);
     const deleteTask = db
    .prepare('DELETE FROM tasks WHERE id = ? ')
    .run(id);

    const remaininTask= getAllTasks();

    return res.json(remaininTask);

})


app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.listen(PORT, ()=>
{
    console.log(`this is running on port http://localhost:${PORT}`)
})