import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Container } from "@material-ui/core";
import "./NotesPage.scss";
import { NewNote } from "../../components/NewNote";

export default function NotesPage() {
  const { logout } = useContext(AuthContext);
  return (
    <Container>
      <div className="notes-container">
        <NewNote />
      </div>
    </Container>
  );
}
