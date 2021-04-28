const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');
const bodyParser = require('body-parser');
const passport = require('passport');

// routes go here
const repo = require('./routes/api/Repo');
const users = require("./routes/api/Users");
//
//
//

const app = express();
const port = process.env.PORT || 8080;

// cors config - allow same origin
const corsOptions = {
  origin: true,
  credentials: true,
};

// init cors
app.use(cors(corsOptions));

// init body parser
app.use(express.json());

// Passport middleware
app.use(passport.initialize());

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// use routes here
app.use('/api/repo', repo);
app.use('/api/users', users);
//
//

// Connect to Mongo Atlas
connectDB();
if (process.env.NODE_ENV === 'production') {
  // serve front-end client from build folder
  app.use(express.static(__dirname+'/../client/build'));
  app.get('*', (req, res) =>{
    res.sendFile(__dirname+'/../client/build/index.html')
  });
  
} else {
  app.get('/', (req, res) => res.send(`API running on port ${port}`));
}

app.listen(port, () => console.log(`Server running on port ${port}`));
