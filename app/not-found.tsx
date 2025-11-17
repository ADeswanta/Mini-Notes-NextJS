"use client"

import { Button, Container } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return <main>
    <Container>
      <h1 className="mb-4">Notes not found</h1>
      <Button variant="outline-primary" onClick={() => router.replace("/")} className="me-4">
        Go Back
      </Button>
    </Container>
  </main>
}