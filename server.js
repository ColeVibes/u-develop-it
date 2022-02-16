const express = require('express');
const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck.js');

const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//get candidates
app.get('/api/candidates', (req, res) => {
  const sql = `SELECT * FROM candidates`;

  db.query(sql, (err,rows) => {
    if (err) {
        res.status(500).json({ error: err.message});
        return;
    }
    res.json({
        message: 'success',
        data: rows
    });
  });
});

//get single cand
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT * FROM candidates WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) {
          //res.status(400).json({ error: err.message });
          //return;
          console.log(err)
      }
      res.json({
          message: 'success',
          data: row
      });
    });
});

//create a cand
app.post('/api/candidate', ({body}, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
        res.status(400).json({ error: errors});
        return;
    }

    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
      VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

//delete cand
app.delete('/api/candidate/:id', (req,res) => {
  const sql = `DELETE FROM candidates WHERE id =?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
        res.status(400).json({error:res.message});
    } else if (!result.affectedRows) {
      res.json({
          message: 'Candidate not found'
      });
    } else {
        res.json({
            message: 'deleted',
            changes: result.affectedRows,
            id: req.params.id
        });
    }
  });
});

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