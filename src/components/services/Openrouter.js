import axios from 'axios';

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export async function generateTripPlan(prompt) {
  try {
    // console.log(OPENROUTER_API_KEY)
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model:  'z-ai/glm-4.5-air:free',   //'z-ai/glm-4.5-air:free', // or 'mistralai/mixtral-8x7b'
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'http://localhost:5173', // your local dev URL
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = response.data.choices[0].message.content;

    // Clean ```json ``` wrappers
    const cleaned = reply.replace(/```json([\s\S]*?)```/, '$1').trim();

    try {
      return JSON.parse(cleaned);
    } catch (err) {
      console.warn("Could not parse JSON, returning raw:", reply);
      return reply;
    }
  } catch (error) {
    console.error('OpenRouter API Error:', error);
    return null;
  }
}
