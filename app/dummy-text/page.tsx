"use client"

import { Button, Container } from "react-bootstrap"

import Header from "@/components/header"

export default function DummyTextPage() {
  const [content, setContent] = useState("");

  const onGenerate = async () => {

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
          onChange={(e) => setContent(e.target.value)}
          placeholder="Results are generated here"
          >
        </textarea>
      </div>

      <Button onClick={() => onGenerate()}>Generate</Button>
    </Container>
  </main>
}