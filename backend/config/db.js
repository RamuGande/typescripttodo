require('dotenv').config()
const mysql = require('mysql2');
const create_table = require('../models/models')


const db = mysql.createConnection({
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD    ,
        database:process.env.DB_NAME,
        port:process.env.DB_PORT
});
db.connect((err)=>{
    if(err){
        console.error('❌ error connecting database',err);
        return;
    }
    console.log("✅ connected to database");
   

});

module.exports=db;