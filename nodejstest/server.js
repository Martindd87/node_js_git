const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hallo Welt! Dein erstes Node.js-Projekt läuft.');
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
