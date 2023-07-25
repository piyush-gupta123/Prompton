import { connectedToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET (Read)

export const GET = async (req, { params }) => {
  try {
    await connectedToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

// PATCH (Update)

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectedToDB();

    const existing = await Prompt.findById(params.id);

    if (!existing) return new Response("Prompt not found", { status: 404 });

    existing.prompt = prompt;
    existing.tag = tag;

    await existing.save();

    return new Response(JSON.stringify(existing), { status: 200 });
  } catch (err) {
    return new Response("Failed to update the prompt", { status: 500 });
  }
};

// DELETE (Delete)

export const DELETE = async (req, { params }) => {
  try {
    await connectedToDB();

    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt Deleted successfully", { status: 200 });
  } catch (err) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
