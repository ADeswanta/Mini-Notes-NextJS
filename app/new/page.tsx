"use client"

import Header from "@/components/header"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Container } from "react-bootstrap";

import type { Note } from "@/types/Note"

export default function NewNotePage() {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title must not be empty");

    const newNote: Note = {
      id: Date.now(),
      title,
      content: "",
      createdAt: new Date().toLocaleDateString("en-US"),
      lastEditedAt: new Date().toLocaleDateString("en-US"),
      movedToTrash: false
    };

    const saved = localStorage.getItem("notes");
    const notes = saved ? JSON.parse(saved) : [];
    notes.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notes));

    router.push(`/note/${newNote.id}`);
  }

  return <>
    <Header title="New Note" hasBack/>
    <Container>
      <form onSubmit={onSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title"
          />
        </div>

        <button type="submit" className="btn btn-success">
          Create
        </button>
      </form>
    </Container>
  </>
}