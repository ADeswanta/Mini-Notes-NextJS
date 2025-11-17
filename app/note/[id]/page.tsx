"use client"

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import Header from "@/components/header"

import type { Note } from "@/types/Note"

export default function NoteEditor() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [note, loadNote] = useState<Note | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`/api/notes/${id}`).then(async (res) => {
      if (res.status === 404) router.push('/not-found');
      else {
        const data = await res.json();
        loadNote(data);
        setTitle(data.title);
        setContent(data.content);
      }
    });
  }, [id, router]);

  if (!note) return <div className="container py-4">Note not found.</div>

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title must not be empty");

    await fetch(`/api/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content,
        movedToTrash: note.movedToTrash
      }),
    }).then(async () => {
      alert("Note saved!");
      window.location.reload();
    });
  }

  const onMoveTrash = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`/api/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content,
        movedToTrash: true
      }),
    }).then(async () => {
      alert("Note moved to Trash!");
      window.location.reload();
    });
  }

  const onRestore = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`/api/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content,
        movedToTrash: false
      }),
    }).then(async () => {
      alert("Note restored from Trash!");
      window.location.reload();
    });


    window.location.reload();
  }

  const onDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!confirm("Are you sure you want to delete this note?")) return;

    await fetch(`/api/notes/${id}`, { method: 'DELETE' });

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