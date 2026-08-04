console.log("this is the main task file ");

const express = require('express');
const app = express();
const PORT = 3000;


app.get('/', (req,res)=>
{
    res.send("this is my new app");
})
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

app.listen(PORT, ()=>
{
    console.log(`this is running on port http://localhost:${PORT}`)
})