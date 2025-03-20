require('dotenv').config();
const db = require('./config/db.js')

const express = require('express')
const app = express()
const cors = require('cors');

app.use(cors());
app.use(express.json());


const todorouter = require('./Routers/todo.js')
app.use('/todo',todorouter)


app.listen(5000,()=>{
    console.log('server is running on port 5000')
})
