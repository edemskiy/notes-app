import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function NotesPage() {
  const { logout } = useContext(AuthContext);
  return (
    <div>
      <h1>Notes page</h1>
    </div>
  );
}
