console.log("this is the main task file ");

const express = require('express');
const app = express();
app.use(express.json());
const tasks = require('./task_List.js')
const PORT = 3000;

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
    return res.json(tasks);
})
// returning task with id 

app.get('/tasks/:id', (req, res) =>
{
    const task_id = Number(req.params.id);
    const Task = tasks.find((task) => task.id === task_id);
    if(Task)
    {
        return res.json(Task);
    }
    else
    {
        return res.status(404).json({
            error:`task ${task_id} not found`,
        });
    }
})



// Create: POST a new task 
app.post('/tasks', (req, res)=> {
    const { title } = req.body;
    if(!title)
    {
        return res.status(400).json(
            {
                error:`task ${title} not added, please give some title!`
            }
        )
    }
    // adding task new id where previous task in task list were ended 
    const newID = tasks[tasks.length-1].id+1;

    // creating new object in task list file 
    const newTask = {
        id  : newID, 
        title: title,
        done:false,
    }

    // psuh to that task list 
    tasks.push(newTask);

    return  res.status(201).json(newTask);
})


app.listen(PORT, ()=>
{
    console.log(`this is running on port http://localhost:${PORT}`)
})