const db = require('../config/db');

const create_table = async () => {
    try {
        await db.promise().query(`
        create database if not exists todo;
        use todo;
        create table todo(user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        task VARCHAR(20) )`);
    } catch (err) {
        console.error("error in creating table");
    }
};

module.exports = { create_table };
