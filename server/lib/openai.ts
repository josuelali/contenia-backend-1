import OpenAI from "openai";
import { storage } from "../storage";

// ==========================
// CLIENT
// ==========================

function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    console.log("No OPENAI_API_KEY found");
    return null;
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// ==========================
// GENERATE TEXT SIMPLE
// ==========================

export async function generateText(prompt: string): Promise<string> {
  try {
    const client = getOpenAIClient();
    if (!client) return "No hay API Key configurada.";

    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Error generating text:", error);
    return "Error generando texto.";
  }
}

// ==========================
// RUN ASSISTANT (🔥 MVP CORE)
// ==========================

export async function runAssistant(
  assistantId: number,
  input: string,
): Promise<string> {
  try {
    const client = getOpenAIClient();
    if (!client) return "No hay API Key configurada.";

    const assistant = await storage.getAssistant(assistantId);
    if (!assistant) {
      return "Asistente no encontrado.";
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o",
      temperature: assistant.temperature ?? 0.7,
      messages: [
        {
          role: "system",
          content: assistant.systemPrompt,
        },
        {
          role: "user",
          content: input,
        },
      ],
    });

    return response.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Error running assistant:", error);
    return "Error ejecutando asistente.";
  }
}
