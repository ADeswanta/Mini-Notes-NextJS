'use client';

// import React from "react";
import {
  Nav,
  Navbar,
  Container,
  Button
} from "react-bootstrap";
import { useRouter } from 'next/navigation'

export default function Header({
  title,
  hasBack = false,
  backHref
} : {
  title?: string,
  hasBack?: boolean
  backHref?: string
}) {
  const router = useRouter()

  return (
    <div className="container py-2 d-flex flex-column align-items-start gap-4">
      {hasBack ? <Button variant="outline-primary" onClick={() => { backHref ? router.push(backHref) : router.back() }} className="me-4">
        Go Back
      </Button> : ""}
      <div className="d-flex">
        <h1>{title}</h1>
      </div>
      {/* <Container fluid>
        <Navbar.Brand href="#" className="h1">{title ?? "Mini Notes"}</Navbar.Brand>
      </Container> */}
    </div>
  );
}