import dotenv from "dotenv";
import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPromptPath = () => {
  const candidatos = [
    path.join(__dirname, "prompts", "todostockPrompt.txt"),
    path.join(__dirname, "prompts", "vendedor.txt"),
  ];

  const existente = candidatos.find((ruta) => fsSync.existsSync(ruta));
  return existente || candidatos[0];
};

const limpiarMensaje = (mensaje) => {
  if (typeof mensaje !== "string") return "";
  return mensaje.trim().replace(/^@gemini\s*/i, "").trim();
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const consultarIA = async (pregunta) => {
  if (!process.env.GEMINI_API_KEY) {
    return "No hay API key de Gemini configurada. Agrega GEMINI_API_KEY al archivo .env.";
  }

  const contexto = await fs.readFile(getPromptPath(), "utf-8");
  const preguntaLimpia = limpiarMensaje(pregunta);

  const prompt = `
${contexto}

Cliente:
${preguntaLimpia}
`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error al consultar Gemini:", error);
    return "No pude responder en este momento. Revisa la API key de Gemini o la conexión.";
  }
};

export { consultarIA, limpiarMensaje, getPromptPath };
