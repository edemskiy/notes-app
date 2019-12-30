import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Container } from "@material-ui/core";

export default function NotesPage() {
  const { logout } = useContext(AuthContext);
  return (
    <Container>
      <div>
        <h1>Notes page</h1>
      </div>
    </Container>
  );
}
