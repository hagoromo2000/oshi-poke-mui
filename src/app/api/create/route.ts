import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { pokemon, description, author, image_url } = JSON.parse(request.body);

  try {
    const data = await prisma.post.create({
      select: {
        id: true,
        pokemon: true,
        description: true,
        author: true,
        image_url: true,
      },
      data: {
        pokemon: pokemon,
        description: description,
        author: author,
        image_url: image_url,
      },
    });

    return response.status(200).json({ data });
  } catch (error) {
    return response.status(500).json({ error });
  }
}
