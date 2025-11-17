"use client"

import { Button, Container } from "react-bootstrap"

import Header from "@/components/header"
import { useState } from "react";

export default function DummyTextPage() {
  const [content, setContent] = useState("");

  const onGenerate = async () => {
    const res = await fetch('https://corporatelorem.kovah.de/api/10', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    setContent(data.paragraphs.join('\n'));
  }

  return <main>
    <Header title="Dummy Text Generator"/>
    <Container>
      <div className="mb-3">
        <label className="form-label">Content</label>
        <textarea
          className="form-control"
          rows={20}
          value={content}
          placeholder="Results are generated here"
          >
        </textarea>
      </div>

      <Button onClick={() => onGenerate()}>Generate</Button>
    </Container>
  </main>
}