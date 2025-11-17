import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _Request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const note = await prisma.note.findUnique({
    where: {
      id: Number(id)
    },
  });

  if (!note) {
    return NextResponse.json({ message: "Note not found" }, { status: 404 });
  }

  return NextResponse.json(note);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { title, content, movedToTrash } = await request.json();

  const updatedNote = await prisma.note.update({
    where: {
      id: Number(id)
    },
    data: {
      title,
      content,
      lastEditedAt: new Date(),
      movedToTrash
    }
  });

  return NextResponse.json(updatedNote, { status: 200 });
}

export async function DELETE(
  _Request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.note.delete({
    where: {
      id: Number(id)
    }
  });

  return NextResponse.json({ message: "Deleted" }, { status: 204 });
}