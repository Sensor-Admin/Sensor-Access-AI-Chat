app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch('https://sensor-access-ai-chat.vercel.app/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-4o",  // Or whatever model
        messages: [{ role: "user", content: userMessage }]
      })
    });

    const data = await response.json();  // <== this must succeed!
    res.json({ reply: data.choices[0].message.content });  // <== must send JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: 'Server error talking to OpenAI.' });  // Still send JSON on error
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
