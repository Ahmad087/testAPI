var express = require('express');
var http = require('http');
var app = express();
var cors =require('cors');
//var server = http.createServer(app);
//var io = require('socket.io')(server);
//const bodyParser = require('body-parser')

var path = require('path');
var mysql = require('mysql');


const HOST = '127.0.0.1';
const PORT = 8080;


var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    port: "3306",
    database: 'patients'
});


// Database Statements (Might need to be in a repo folder)
let SELECT_ALL_PATIENTS = 'SELECT * FROM patient'
let INSERT_PATIENT = `INSERT INTO patient ( f_name,l_name,location,dob,illness) VALUES (?,?,?,?,?)`;
let DELETE_PATIENT = `DELETE FROM patient WHERE user_id = ?`


connection.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');
});


// Middleware
// Allow app to support differnt body content types (using the bodyParser package)
app.use((req, res) => {
    console.log(req);
    next();
});
//app.use((req, res) => { console.log(req) })
app.use(cors({ credentials: true, preflightContinue: true }));
app.use(express.text());
// support json encoded bodies
app.use(express.json());
// support url encoded bodies
app.use(express.urlencoded({
    extended: true
}));
app.get('/patients', (req, res) => {
    
    connection.query(SELECT_ALL_PATIENTS, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.send(results);
    });
});


app.post('/patients', (req, res) => {
    console.log(req.body)
    const newPatient = [req.body.f_name, req.body.l_name, req.body.location, req.body.dob, req.body.illness]

    connection.query(INSERT_PATIENT, newPatient, function (error, result, fields) {
        if (error) throw error;
        console.log('The solution is: ', result);
        res.status(201).send({ "id": result.insertId });
    });
});

app.delete('/patients/:user_id', (req, res) => {
    console.log(req.params.id)

    connection.query(DELETE_PATIENT, req.params.user_id, function (error, result, fields) {
        if (error) throw error;
        console.log('The solution is: ', result);
        res.status(201).send("Successfully Deleted");
    });
});

app.listen(PORT, HOST, () => {
    console.log(`Express server listening on http://${HOST}:${PORT}`);
});

module.exports = app;
