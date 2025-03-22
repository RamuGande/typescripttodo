
const express = require('express');
const todorouter = express.Router();

const db = require('../config/db')

todorouter.post('/add_task',async(req,res)=>{
    
    const {task} = req.body;
    
    if(!task){
        return res.status(400).json({message:'Task is required'})
    }
    try{
        const query = `INSERT INTO todo (task) VALUES (?)`
        const result = await db.query(query,[task])
        return res.status(200).send('task inserted successfully')
    }
    catch(err){
        console.log(err);
        return res.status(500).send("   Internal server error")
    }
});

todorouter.post('/remove_task',async(req,res)=>{
    const {id} = req.body;
    console.log(id);
    try{
        const query = `DELETE FROM todo WHERE user_id = ?`

        const result = await db.query(query,[id])
        return res.status(200).send('task removed successfully')
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:'error removing task'})
    }
})

todorouter.get('/get_tasks',async(req,res)=>{
            try{
                const query = `SELECT * FROM todo`
                const result = await db.query(query)
                return res.status(200).json(result)
            }
            catch(err){
                console.log(err);
            }
})


todorouter.post('/update_task',async(req,res)=>{
    const {id,task} = req.body;
    try{
        const query = `UPDATE todo SET task = ? WHERE user_id = ?`
        const results = await db.execute_query(query,[id,task]);
        return res.status(200).send('task updated successfully')
    }
    catch(err){
        return res.status(500).send("updation failed")
    }
})

module.exports = todorouter;
