const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          model: "gpt-4o",  // or "gpt-4", "gpt-3.5-turbo"
          messages: [{ role: "user", content: "Hello, how are you?" }]
      })
    });

    const data = await response.json(); // 👈 parse OpenAI's response
    res.json({ reply: data.choices[0].message.content }); // 👈 send JSON back to frontend

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ reply: 'Server error talking to OpenAI.' }); // 👈 still send JSON on error
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
