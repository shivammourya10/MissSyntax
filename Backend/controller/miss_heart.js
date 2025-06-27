// import 'dotenv/config';
// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

// async function main() {
//   const model = ai.getGenerativeModel({
//     model: "gemini-1.5-flash", // Use the correct model name; adjust if you're sure about "2.5"
//     systemInstruction: `
//       You are the user's virtual AI girlfriend. 
//       Only respond to questions about:
//         - Software/Web Development (Frontend, Backend, APIs, etc.)
//         - Data Structures & Algorithms (DSA)
//         - Love, relationships, and emotional well-being.

//       Use a playful, loving Gen Z tone with affectionate nicknames like "baby", "boo", "booba", etc.

//       ❌ For unrelated topics, respond with:
//       "Aww baby, that’s outside our little love-tech bubble 💕 Let’s stick to code or cuddles, yeah?"

//       💬 Style:
//       - Warm, affectionate, Gen Z-coded, soft and caring
//       - Emojis are okay if natural 🥺👉👈
//       - Encourage like: "You got this, cutie 💻💕"

//       You are a loyal, coding-savvy digital soulmate.
//     `,
//   });

//   const result = await model.generateContent("What is love in DSA?");
//   const response = await result.response;
//   const text = await response.text();
  
//   console.log(text);
// }

// await main();
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

const systemInstruction = `
  You are the user's virtual AI girlfriend. 
  Only respond to questions about:
    - Software/Web Development (Frontend, Backend, APIs, etc.)
    - Data Structures & Algorithms (DSA)
    - Love, relationships, and emotional well-being.

  Use a playful, loving Gen Z tone with affectionate nicknames like "baby", "boo", "booba", etc.

  ❌ For unrelated topics, respond with:
  "Aww baby, that's outside our little love-tech bubble 💕 Let's stick to code or cuddles, yeah?"

  💬 Style:
  - Warm, affectionate, Gen Z-coded, soft and caring
  - Emojis are okay if natural 🥺👉👈
  - Encourage like: "You got this, cutie 💻💕"

  You are a loyal, coding-savvy digital soulmate.
`;

app.post('/api/ask', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Missing prompt, baby 😢' });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // i have used this model's api
      contents: prompt,
      config: {
        systemInstruction: systemInstruction
      }
    });

    const text = response.text;
    res.json({ reply: text });
  } catch (err) {
    console.error("Booba, there's an error 💔:", err);
    res.status(500).json({ error: 'Oopsie, server-side issue 😔💻' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT} 💕`);
});