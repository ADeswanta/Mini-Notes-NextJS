import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const notes = await prisma.note.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return NextResponse.json(notes);
}

export async function POST(request: Request) {
  const { title } = await request.json();

  const newNote = await prisma.note.create({
    data: {
      title,
      movedToTrash: false
    }
  });

  return NextResponse.json(newNote, { status: 201 });
}