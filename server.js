require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl', (req,res,next) =>{
  console.log("middeware");
}, (req, res) => {
  res.send("prueba");
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});