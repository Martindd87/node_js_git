const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware zum Servieren statischer Dateien
app.use(express.static(path.join(__dirname, 'public')));

// Routen
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Starten des Servers
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
