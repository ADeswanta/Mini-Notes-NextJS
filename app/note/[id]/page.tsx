"use client"

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import { Container } from "react-bootstrap";
import Link from "next/link";

import Header from "@/components/header"

import type { Note } from "@/types/Note"

export default function NoteEditor() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [note, loadNote] = useState<Note | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (saved) {
      const notes: Note[] = JSON.parse(saved);
      const found = notes.find((p) => p.id === Number(id));
      if (found) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadNote(found);
        setTitle(found.title);
        setContent(found.content);
      }
    }
  }, [id]);

  if (!note) return <div className="container py-4">Note not found.</div>

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title must not be empty");

    const savedNote: Note = {
      ...note,
      title,
      content,
      lastEditedAt: new Date().toLocaleDateString("en-US"),
    };

    const saved = localStorage.getItem("notes");
    const notes = saved ? JSON.parse(saved) : [];
    const index = notes.findIndex((p: Note) => p.id === Number(id));
    notes[index] = savedNote;
    localStorage.setItem("notes", JSON.stringify(notes));

    alert("Note saved!");

    router.push(`/note/${id}`);
  }

  const onMoveTrash = (e: React.FormEvent) => {
    e.preventDefault();

    const savedNote: Note = {
      ...note,
      movedToTrash: true
    };

    const saved = localStorage.getItem("notes");
    const notes = saved ? JSON.parse(saved) : [];
    const index = notes.findIndex((p: Note) => p.id === Number(id));
    notes[index] = savedNote;
    localStorage.setItem("notes", JSON.stringify(notes));

    alert("Note moved to Trash!");

    router.refresh();
  }

  const onRestore = (e: React.FormEvent) => {
    e.preventDefault();

    const savedNote: Note = {
      ...note,
      movedToTrash: false
    };

    const saved = localStorage.getItem("notes");
    const notes = saved ? JSON.parse(saved) : [];
    const index = notes.findIndex((p: Note) => p.id === Number(id));
    notes[index] = savedNote;
    localStorage.setItem("notes", JSON.stringify(notes));

    alert("Note restored from Trash!");

    router.refresh();
  }

  const onDelete = (e: React.FormEvent) => {
    e.preventDefault();

    if (!confirm("Are you sure you want to delete this note?")) return;

    const saved = localStorage.getItem("notes");
    if (!saved) return;

    const notes: Note[] = JSON.parse(saved).filter((p: Note) => p.id !== Number(id));
    localStorage.setItem("notes", JSON.stringify(notes));
    router.push("/");
  }

  return <>
      <Header title="Edit Note" hasBack backHref="/"/>
      <Container>
        <form onSubmit={onSave} className="mt-3">
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              className="form-control form-control-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Content</label>
            <textarea
              className="form-control"
              rows={20}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write anything here"
              >
            </textarea>
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-success">
              Save
            </button>
            {
              note.movedToTrash ? (
                <>
                <button className="btn btn-outline-primary" onClick={(e) => onRestore(e)}>
                  Restore trash
                </button>
                <button className="btn btn-danger" onClick={(e) => onDelete(e)}>
                  Delete permanently
                </button>
                </>
              ) : (
                <button className="btn btn-outline-danger" onClick={(e) => onMoveTrash(e)}>
                  Move to trash
                </button>
              )
            }
          </div>
        </form>
      </Container>
    </>
}