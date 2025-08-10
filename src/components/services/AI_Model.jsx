// import { GoogleGenerativeAI } from '@google/generative-ai';


// const ai = new GoogleGenerativeAI({
//   apiKey: import.meta.env.VITE_GOOGLE_GEMINI_API_KEY,
// });

// export async function generateTripPlan(prompt) {
//   const config = {
//     thinkingConfig: {
//       thinkingBudget: -1,
//     },
//     responseMimeType: 'application/json',
//   };

//   const model = 'gemini-2.5-pro';

//   const contents = [
//     {
//       role: 'user',
//       parts: [
//         {
//           text: prompt,
//         },
//       ],
//     },
//   ];

//   const response = await ai.models.generateContentStream({
//     model,
//     config,
//     contents,
//   });

//   let fullText = '';
//   for await (const chunk of response) {
//     fullText += chunk.text;
//   }

  
//   const cleaned = fullText.replace(/```json([\s\S]*?)```/, '$1').trim();

//   try {
//     return JSON.parse(cleaned);
//   } catch (err) {
//     console.error('❌ Failed to parse Gemini response as JSON:', err);
//     console.log('Raw response:', fullText);
//     return null;
//   }
// }

import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the API client
const ai = new GoogleGenerativeAI({
  apiKey: import.meta.env.VITE_GOOGLE_GEMINI_API_KEY,
});

export async function generateTripPlan(prompt) {
  // Get the generative model
  const model = ai.getGenerativeModel({ model: 'gemini-1.5-pro' });

  try {
    // Generate content from the prompt
    const result = await model.generateContent(prompt);

    // Extract raw text output
    const text = result.response.text();

    // Clean up markdown-wrapped JSON
    const cleaned = text.replace(/```json([\s\S]*?)```/, '$1').trim();

    // Parse and return the JSON
    return JSON.parse(cleaned);
  } catch (err) {
    console.error('❌ Failed to parse Gemini response as JSON:', err);
    return null;
  }
}
