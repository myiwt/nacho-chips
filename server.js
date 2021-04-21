const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 8080;

// cors config - allow same origin
const corsOptions = {
  origin: true,
  credentials: true,
};

// init cors
app.use(cors(corsOptions));

/* app.use('/login', (req, res) => {
  res.send({
    token: 'test123',
  });
}); */

// Connect to Mongo Atlas
connectDB();
if (process.env.NODE_ENV === 'production') {
  // serve front-end client from build folder
  app.use(express.static('client/build'));
} else {
  app.get('/', (req, res) => res.send(`API running on port ${port}`));
}

app.listen(port, () => console.log(`Server running on port ${port}`));
