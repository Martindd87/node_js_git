require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Statisches Verzeichnis für Frontend
app.use(express.static(path.join(__dirname, '/')));

// Root-Route: Serviert die index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API-Route für ChatGPT
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: 'Keine Nachricht erhalten.' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: userMessage }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const botMessage = response.data.choices[0].message.content;
    res.json({ reply: botMessage });
  } catch (error) {
    console.error('API-Fehler:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Fehler bei der Kommunikation mit der ChatGPT-API.' });
  }
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
