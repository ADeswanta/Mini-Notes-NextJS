"use client"

import Header from "@/components/header"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Container } from "react-bootstrap";

import type { Note } from "@/types/Note"

export default function NewNotePage() {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title must not be empty");

    await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    }).then(async (res) => {
      router.push(`/note/${(await res.json()).id}`);
    });
  }

  return <>
    <Header title="New Note" hasBack/>
    <Container>
      <form onSubmit={onSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control form-control-lg"
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