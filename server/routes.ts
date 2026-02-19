import type { Express } from "express";
import { storage } from "./storage";
import OpenAI from "openai";
import { insertAssistantSchema } from "@shared/schema";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function getUserIdOrDemo(req: any): string {
  return req.user?.claims?.sub || "demo_user_1";
}

export async function registerRoutes(app: Express) {
  // ======================================================
  // SEED INICIAL (solo si no existen asistentes)
  // ======================================================
  app.post("/api/seed", async (_req, res) => {
    try {
      const userId = "demo_user_1";

      const existing = await storage.getUserAssistants(userId);
      if (existing.length > 0) {
        return res.json({
          message: "Ya existen asistentes",
          count: existing.length,
        });
      }

      const assistants = [
        {
          name: "Cerebro Central",
          role: "Coordinador Estratégico",
          systemPrompt: "Sistema maestro que coordina todos los asistentes.",
          temperature: 0.7,
        },
        {
          name: "Asistente A",
          role: "SEO & Estrategia",
          systemPrompt: "Especialista en SEO y arquitectura de contenido.",
          temperature: 0.5,
        },
        {
          name: "Asistente B",
          role: "Técnica & Backend",
          systemPrompt: "Especialista en arquitectura técnica y backend.",
          temperature: 0.4,
        },
        {
          name: "Asistente C",
          role: "Monetización",
          systemPrompt: "Especialista en modelos de monetización y SaaS.",
          temperature: 0.6,
        },
        {
          name: "Asistente D",
          role: "Datos & Optimización",
          systemPrompt: "Especialista en métricas, análisis y optimización.",
          temperature: 0.3,
        },
        {
          name: "Asistente J",
          role: "Gobernanza & GitHub",
          systemPrompt:
            "Especialista en control de versiones y gobernanza técnica.",
          temperature: 0.4,
        },
      ];

      for (const assistant of assistants) {
        await storage.createAssistant({
          ...assistant,
          userId,
        });
      }

      res.json({ message: "Seed completado correctamente" });
    } catch (error) {
      console.error("Error en seed:", error);
      res.status(500).json({ message: "Error en seed" });
    }
  });

  // ======================================================
  // GET USER ASSISTANTS
  // ======================================================
  app.get("/api/assistants", async (req: any, res) => {
    try {
      const userId = getUserIdOrDemo(req);
      const assistants = await storage.getUserAssistants(userId);
      res.json(assistants);
    } catch (error) {
      console.error("Error al obtener asistentes:", error);
      res.status(500).json({ message: "Error al obtener asistentes" });
    }
  });

  // ======================================================
  // CREATE ASSISTANT
  // ======================================================
  app.post("/api/assistants", async (req: any, res) => {
    try {
      const userId = getUserIdOrDemo(req);
      const data = insertAssistantSchema.parse(req.body);

      const assistant = await storage.createAssistant({
        ...data,
        userId,
      });

      res.json(assistant);
    } catch (error) {
      console.error("Error creando asistente:", error);
      res.status(500).json({ message: "Error creando asistente" });
    }
  });

  // ======================================================
  // RUN ASSISTANT
  // ======================================================
  app.post("/api/assistants/run", async (req: any, res) => {
    try {
      const { assistantId, input } = req.body;

      if (!assistantId || !input) {
        return res.status(400).json({
          message: "assistantId e input son obligatorios",
        });
      }

      const assistant: any = await storage.getAssistant(Number(assistantId));

      if (!assistant) {
        return res.status(404).json({
          message: "Asistente no encontrado",
        });
      }

      // MODO MOCK si no hay API key
      if (!process.env.OPENAI_API_KEY) {
        return res.json({
          assistantId: assistant.id,
          output: `Mock response from assistant "${assistant.name}" with input: ${input}`,
          mock: true,
        });
      }

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        temperature: assistant.temperature || 0.7,
        messages: [
          { role: "system", content: assistant.systemPrompt },
          { role: "user", content: input },
        ],
      });

      const output = response.choices?.[0]?.message?.content || "";

      res.json({
        assistantId: assistant.id,
        output,
      });
    } catch (error: any) {
      console.error("Error ejecutando asistente:", error);

      res.status(500).json({
        message: "Error ejecutando asistente",
        error: error?.message,
      });
    }
  });
}
