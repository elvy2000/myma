const express= require('express');
const path = require('path');
const bodyParser =require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose =require('mongoose');
const config =require('./config/database');

// steps sequence is importent in this page

// database connection
mongoose.connect(config.database);
// onconnection method
mongoose.connection.on('connected', function(){
    console.log('Connected to database'+ config.database);
});

// onconnection error  method
mongoose.connection.on('error', function(err){
    console.log('Database error'+ err);
});


// inditialised app with express
const app =express();

const users= require('./routes/users');

// local server port
//const port = 3003;

// heroku server port
const port = process.env.PORT || 8080;

// initilise the cors middle ware
app.use(cors());

//set  static folder
app.use(express.static(path.join(__dirname,'public')));

// body parser middleware
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// routing to users
app.use('/users',users);

// test index route /
app.get('/', function (req,res){
    res.send('Invalid EndPoint Elvin');
});

app.get('*', function (req,res) {
   res.sendfile(path.join(__dirname, 'public/index.html'));
});

// server listenin the port
app.listen(port, function(){
  console.log('Express Server Started on port'+ port);
});