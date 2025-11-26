import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
  try {
    const { art, building } = await req.json();

    const result = await openai.responses.create({
      model: "google/gemini-3-pro-image-preview",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: "Apply the provided mural artwork onto the building's exterior wall in a highly realistic, photo-accurate style. Do it only on one side. Use the wall surface that directly faces the viewer as the placement area. Match the mural precisely to the wall’s proportions, edges, and perspective lines so it appears naturally attached to the architecture. Preserve all structural and functional elements—do not cover or distort windows, doors, vents, lights, signage, trim, or any other architectural features. Blend the mural with the existing wall texture, including brick, stucco, concrete, or paint, and maintain the building’s natural lighting direction, shadows, highlights, and environmental reflections. Ensure the mural’s colors, brightness, and contrast harmonize with the photograph so the final result looks seamlessly integrated and physically plausible. Only place the artwork on the appropriate wall surface and avoid spilling onto adjacent walls, the ground, or surrounding objects.",
            },
            {
              type: "input_image",
              image_url: `https://mural.sixten.app/${art}`,
              detail: "auto",
            },
            {
              type: "input_image",
              image_url: `https://mural.sixten.app/${building}`,
              detail: "auto",
            },
          ],
        },
      ],
    });

    return new Response(JSON.stringify(result.output[2]), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
