import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const image1 = formData.get("image1") as File | null;
    const image2 = formData.get("image2") as File | null;

    if (!image1 || !image2) {
      return new Response(
        JSON.stringify({ error: "Two images required (image1, image2)." }),
        { status: 400 }
      );
    }

    const result = await openai.images.edit({
      model: "gpt-image-1",
      prompt:
        "Place the mural artwork on the building wall in a realistic style.",
      image: [image1, image2],
    });

    if (!result.data || result.data.length === 0) {
      return new Response(
        JSON.stringify({ error: "No image returned from OpenAI." }),
        { status: 500 }
      );
    }

    const combined = result.data[0];

    return new Response(JSON.stringify({ image: combined }), { status: 200 });
  } catch {
    return new Response(JSON.stringify("Unexpected error"), { status: 500 });
  }
}
