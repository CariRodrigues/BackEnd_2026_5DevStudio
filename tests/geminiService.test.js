import { describe, expect, test } from "@jest/globals";
import { limpiarMensaje, getPromptPath } from "../services/geminiService.js";

describe("geminiService", () => {
  test("debe quitar el prefijo @gemini y conservar la consulta", () => {
    expect(limpiarMensaje("@gemini cómo ingreso una compra?")).toBe("cómo ingreso una compra?");
    expect(limpiarMensaje("  @gemini   necesito ayuda")).toBe("necesito ayuda");
  });

  test("debe resolver la ruta del prompt correctamente", () => {
    const ruta = getPromptPath();
    expect(ruta).toMatch(/services[\\/]prompts[\\/](todostockPrompt|vendedor)\.txt$/);
  });
});
