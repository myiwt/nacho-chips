const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// cors config - allow same origin
const corsOptions = {
  origin: true,
  credentials: true,
};

// init cors
app.use(cors(corsOptions));

// Connect to Mongo Atlas
connectDB();
if (process.env.NODE_ENV === 'production') {
  // serve front-end client from build folder
  app.use(express.static(__dirname+'/../client/build'));
  app.get('*', (req, res) =>{
    res.sendFile(__dirname+'/../client/build/index.html')
  });
  
} else {
  //app.get('/', (req, res) => res.send(`API running on port ${port}`));
  app.use(express.static(__dirname+'/../client/build'));
  app.get('*', (req, res) =>{
    res.sendFile(__dirname+'/../client/build/index.html')
  });
}

app.listen(port, () => console.log(`Server running on port ${port}`));
