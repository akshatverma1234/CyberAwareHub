export async function generateSummary(content) {
  const apiKey = process.env.GEMINI_API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

  const userPrompt = `Summarize the following case study into 2–3 professional sentences for an approval email. 
  Keep the tone warm, congratulatory, and community-focused.\n\nCase Study: "${content}"`;

  const payload = {
    contents: [{ parts: [{ text: userPrompt }] }],
    systemInstruction: {
      parts: [{ text: "Act as a professional community email assistant." }],
    },
  };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Gemini API Error:", errorText);
    throw new Error("Failed to generate summary from Gemini API.");
  }

  const result = await response.json();
  return (
    result.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Congratulations! Your story has been published successfully."
  );
}

export async function generateRejectionNote(title) {
  const apiKey = process.env.GEMINI_API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const userPrompt = `Write a short, friendly, and encouraging rejection email note for a story titled "${title}". 
  1. Start by thanking the user.
  2. Politely state why it wasn’t accepted (focus, tone, or style).
  3. Encourage them to try again with a personal experience or tips.
  4. Keep the tone warm, positive, and not robotic.`;

  const payload = {
    contents: [{ parts: [{ text: userPrompt }] }],
    systemInstruction: {
      parts: [{ text: "Act as a warm and supportive community manager." }],
    },
  };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Gemini API Error:", errorText);
    throw new Error("Failed to generate rejection note from Gemini API.");
  }

  const result = await response.json();
  return (
    result.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Thank you for your submission! While it wasn’t approved this time, we’d love to see more from you."
  );
}
