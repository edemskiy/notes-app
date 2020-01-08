import React, { useEffect, useCallback, useContext, useState } from "react";
import { NewNote } from "../../components/NewNote";
import { Note } from "../../components/Note";
import { NoteEditor } from "../../components/NoteEditor";
import { AuthContext } from "../../context/AuthContext";
import { useRequest } from "../../hooks/request";

import { Container } from "@material-ui/core";
import "./NotesPage.scss";

export default function NotesPage() {
  const { userToken } = useContext(AuthContext);
  const { request, error } = useRequest();
  const [notes, setNotes] = useState([]);
  const [isEditorOpen, setEditorOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState({});

  useEffect(() => console.log(notes), [notes]);

  function changeNote({ _id, ...newProperties }) {
    setNotes(
      notes.map(note => {
        return note._id !== _id ? note : { ...note, ...newProperties };
      })
    );
  }

  function addNote(note) {
    setNotes([...notes, note]);
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
      <NewNote addNote={addNote} />
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
        <div className="modal-back">
          <NoteEditor
            note={noteToEdit}
            setNote={changeNote}
            fillContent={true}
            closeNoteEditor={closeNoteEditor}
            onNoteSave={() => null}
          />
        </div>
      )}
    </Container>
  );
}
