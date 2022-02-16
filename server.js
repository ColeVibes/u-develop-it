const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//app.get('/', (req, res) => {
//    res.json({
//        message: 'Hello World'
//    });
//});

// default resposne for any other request (NOT FOUND)
app.use((req,res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      //your SQL username
      user: 'root',
      //your password
      password: 'SQLRoot1953!',
      database: 'election'
    },
    console.log('Connected to the election database')
);

//db.query(`SELECT * FROM candidates WHERE id =1`, (err, row) => {
//  if (err) {
//      console.log(err);
//  }
//  console.log(row);
//});

//delete a candidate
//db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//  if(err){
//      console.log(err);
//  }
//  console.log(result);
//});

//create a candidate
//const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
              //VALUES (?,?,?,?)`;
//const params = [1, 'Ronald', 'Firbank', 1];

//db.query(sql, params, (err, result) => {
//  if(err) {
//      console.log(err);
//  }
//  console.log(result);
//});