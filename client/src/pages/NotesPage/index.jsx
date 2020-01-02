import React from "react";
import { Container } from "@material-ui/core";
import "./NotesPage.scss";
import { NewNote } from "../../components/NewNote";

export default function NotesPage() {
  return (
    <Container>
      <NewNote />
    </Container>
  );
}
