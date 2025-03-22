require('dotenv').config()
const mysql = require('mysql2');
const create_table = require('../models/models')



const db = mysql.createConnection({
        host:process.env.DB_HOST || 'localhost',
        user:process.env.DB_USER || 'root',
        password:process.env.DB_PASSWORD || 'Ramu@1729'   ,
        database:process.env.DB_NAME || 'todo',
        port:process.env.DB_PORT || 3306
});

const promisecon = db.promise();

promisecon.connect((err)=>{
    if(err){
        console.error('❌ error connecting database',err.message);
        return;
    }
    console.log("✅ connected to database");
   

});

module.exports=promisecon;