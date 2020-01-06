import React, { useEffect, useCallback, useContext, useState } from "react";
import { NewNote } from "../../components/NewNote";
import { Note } from "../../components/Note";
import { AuthContext } from "../../context/AuthContext";
import { useRequest } from "../../hooks/request";

import { Container } from "@material-ui/core";
import "./NotesPage.scss";
import { NoteEditor } from "../../components/NoteEditor";

export default function NotesPage() {
  const { userToken } = useContext(AuthContext);
  const { request, error } = useRequest();
  const [notes, setNotes] = useState([]);
  const [isEditorOpen, setEditorOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState({});

  function changeNote({ _id, ...newProperties }) {
    setNotes(
      notes.map(note => {
        return note._id !== _id ? note : { ...note, ...newProperties };
      })
    );
  }

  const fetchNotes = useCallback(() => {
    request("/api/notes", "GET", null, {
      auth: `Bearer ${userToken}`
    }).then(res => setNotes(res.notes));
  }, [userToken, request]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  function openNoteEditor(note) {
    setEditorOpen(true);
    setNoteToEdit(note);
  }

  function closeNoteEditor() {
    setEditorOpen(false);
    setNoteToEdit({});
  }

  return (
    <Container>
      <NewNote fetchNotes={fetchNotes} />
      <div className="notes">
        {notes
          .filter(note => !note.isTrashed)
          .reverse()
          .map(note => (
            <Note
              openNoteEditor={openNoteEditor.bind(null, note)}
              key={note._id}
              note={note}
              changeNote={changeNote}
            />
          ))}
      </div>

      {isEditorOpen && (
        <NoteEditor note={noteToEdit} closeNoteEditor={closeNoteEditor} />
      )}
    </Container>
  );
}
