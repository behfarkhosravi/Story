import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

const geminiModel = 'gemini-1.5-flash';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=`;

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { prompt, apiKey, conversationHistory } = await req.json()

    const response = await fetch(`${API_URL}${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: conversationHistory,
        systemInstruction: {
          parts: [{ text: prompt }]
        }
      }),
    });

    if (!response.ok) {
      let error_message = 'An unknown error occurred.';
      try {
        const error_data = await response.json();
        error_message = error_data.error.message;
      } catch (e) {
        error_message = await response.text();
      }
      throw new Error(error_message);
    }

    const data = await response.json();
    const assistantResponse = data.candidates[0].content.parts[0].text;

    return new Response(JSON.stringify({ assistantResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
})
