const http = require('http');
const fs = require('fs');

const idCodes = [
  "acad", "npsa", "arch", "badl", "bibe", "bisc", "blca", "brca", "cany", "care",
  "cave", "chis", "cong", "crla", "cuva", "deva", "dena", "drto", "ever", "gaar",
  "jeff", "glac", "glba", "grca", "grta", "grba", "grsa", "grsm", "gumo", "hale",
  "havo", "hosp", "indu", "isro", "jotr", "katm", "kefj", "seki", "kova", "lacl",
  "lavo", "maca", "meve", "mora", "neri", "noca", "olym", "pefo", "pinn", "redw",
  "romo", "sagu", "seki", "shen", "thro", "viis", "voya", "whsa", "wica", "wrst",
  "yell", "yose", "zion"
];

// Moving random code access to microservice
function getRandomID() {
    const randomID = Math.floor(Math.random() * idCodes.length);
    return idCodes[randomID]
}

const server = http.createServer((req, res) => {
  // Allow requests from any origin (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'GET' && req.url === '/') {
    console.log('Request Received')
    // Serve ID codes as JSON
    res.setHeader('Content-Type', 'application/json');
    const randomIDValue = getRandomID() //Added this to call PRIOR to sending back 
    res.end(JSON.stringify(randomIDValue));
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`ID Codes Microservice running on port ${PORT}`);
});
