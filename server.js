app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {   // <-- REAL OpenAI endpoint
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-4o",    // or "gpt-4", "gpt-3.5-turbo"
        messages: [{ role: "user", content: userMessage }]
      })
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });

  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: 'Server error talking to OpenAI.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
