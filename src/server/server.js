const PORT = 8888;

const express = require('express'); 
const app = express();
const cors = require('cors');

app.use(cors());
const http = require('http').Server(app);


// Middleware
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

// Routes
app.post('/login', require('./router/postLogin'));
app.post('/loginafter', require('./router/postLoginAfter.js'));

http.listen(PORT, function() {
  console.log("Server listening on: " + PORT); 
});
