import React, { useEffect, useCallback, useContext, useState } from "react";
import { NewNote } from "../../components/NewNote";
import { Note } from "../../components/Note";
import { AuthContext } from "../../context/AuthContext";
import { useRequest } from "../../hooks/request";

import { Container } from "@material-ui/core";
import "./NotesPage.scss";

export default function NotesPage() {
  const { userToken } = useContext(AuthContext);
  const { request, error } = useRequest();
  const [notes, setNotes] = useState([]);

  const fetchNotes = useCallback(() => {
    request("/api/notes", "GET", null, {
      auth: `Bearer ${userToken}`
    }).then(res => setNotes(res.notes));
  }, [userToken, request]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <Container>
      <NewNote fetchNotes={fetchNotes} />
      <div className="notes">
        {notes
          .filter(note => !note.isTrashed)
          .reverse()
          .map(note => (
            <Note
              key={note._id}
              note={note}
              fetchNotes={fetchNotes}
              notes={notes}
              setNotes={setNotes}
            />
          ))}
      </div>
    </Container>
  );
}
