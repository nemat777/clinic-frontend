// api/ai-summary.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { symptoms } = req.body;

  if (!symptoms) return res.status(400).json({ error: 'No symptoms provided' });

  try {
    const HF_TOKEN = process.env.HUGGINGFACE_TOKEN; // Set in Vercel Environment Variables
    const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: `Summarize these patient symptoms for a doctor: ${symptoms}`,
      }),
    });

    const data = await response.json();
    const summary = Array.isArray(data) && data[0]?.generated_text
      ? data[0].generated_text
      : 'No summary available';

    res.status(200).json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ summary: '' });
  }
}