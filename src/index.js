const express = require('express');
const app = express();

function log(...msgs) {
  console.log(new Date().toISOString(), ...msgs);
} 

function parseRequest(req) {
  try {
    return JSON.stringify({
      method: req.method,
      path: req.path,
      query: req.query,
      host: req.hostname,
      ip: req.ip,
    });
  } catch {
    return '';
  }
}

app.get('/_ah/start', (req, res) => {
  res.sendStatus(200);
});

app.all('*', (req, res) => {
  log('Request received', parseRequest(req));  
  res.status(503).send('Service Unavailable');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

