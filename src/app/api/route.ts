import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await prisma.post.findMany();

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(request: Request) {
  const { pokemon, description, author, image_url } = await request.json();
  console.log(pokemon, description, author, image_url);
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

    const res = await request.json();
    return NextResponse.json({ res });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
