require('dotenv').config()
const todorouter = require('./Routers/todo.js')
const db = require('./config/db.js');
const express = require('express');
const app = express();





const cors = require('cors');

app.use(cors());
app.use(express.json());


app.use('/todo', todorouter);

app.post('/todo/add_task',async(req,res)=>{
    
    const {task} = req.body;
    
    if(!task){
        return res.status(400).json({message:'Task is required'})
    }
    try{
        const query = `INSERT INTO todo(task) VALUES (?)`
        const result = await db.query(query,[task])
        return res.status(200).send('task inserted successfully')
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Internal server error")
    }
});

app.post('/todo/remove_task',async(req,res)=>{
    const {id} = req.body;
    
    try{
        const query = `DELETE FROM todo WHERE user_id = ?`
        const result = await db.query(query,[id])
        return res.status(200).send('task removed successfully')
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:'error removing task'})
    }
});

app.listen(5000, () => {
    console.log('server is running on port 5000');
});
