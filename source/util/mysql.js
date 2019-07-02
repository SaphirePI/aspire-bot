const mysql = require('mysql');
const config = require('../../config.json');
const con = mysql.createConnection({
  host: config.HOST,
  user: config.USER,
  password:  config.PASS,
  database:  config.DATABASE
});

module.exports = con;