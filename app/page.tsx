"use client"

// import Image from "next/image";
// import styles from "./page.module.css";

import { Container, Card, Row } from "react-bootstrap";
import Link from "next/link";
import { useEffect, useState } from "react";

import type { Note } from "@/types/Note";

import Header from "@/components/header";

export default function Home() {
  const [notes, loadNotes] = useState<Note[]>([]);

  const init = () => {
    const saved = localStorage.getItem("notes");
    if (saved) {
      loadNotes(JSON.parse(saved));
    } else {
      loadNotes([]);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    init();
  }, []);

  return (
    <div>
      <Header title="Notes"/>
      <Container>

        <Link href="/new" className="btn btn-primary mb-3">
          + New Note
        </Link>

        { notes.length === 0 && <p>No notes created yet.</p> }

        <div style={{ gridTemplateColumns: "1fr 1fr" }} className="d-grid gap-2 mb-4">
          {notes
            .filter((post) => !post.movedToTrash)
            .map((note) => (
            <Link key={note.id} href={`/note/${note.id}`} className="text-decoration-none">
              <Card>
                <Card.Body>
                  <Card.Title>{note.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Last edited at {note.lastEditedAt}</Card.Subtitle>
                  <Card.Text>
                    {note.content}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          ))}
        </div>

        <p className="text-muted">Trash notes</p>

        <div style={{ gridTemplateColumns: "1fr 1fr", opacity: .5 }} className="d-grid gap-2">
          {notes
            .filter((post) => post.movedToTrash)
            .map((note) => (
            <Link key={note.id} href={`/note/${note.id}`} className="text-decoration-none">
              <Card>
                <Card.Body>
                  <Card.Title>{note.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Last edited at {note.lastEditedAt}</Card.Subtitle>
                  <Card.Text>
                    {note.content}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          ))}
        </div>

      </Container>
    </div>
  );
}
