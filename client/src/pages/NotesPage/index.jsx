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
  const [notes, setNotes] = useState({});
  const [isEditorOpen, setEditorOpen] = useState(false);
  const [activeNoteId, setactiveNoteId] = useState(null);

  function changeNote({ _id, ...newProperties }) {
    setNotes({ ...notes, [_id]: { ...notes[_id], ...newProperties } });
  }

  function updateNote(newProperties) {
    changeNote({ _id: activeNoteId, ...newProperties });
  }

  function addNote(note) {
    setNotes({ ...notes, [note._id]: note });
  }

  function saveNote(note) {
    changeNote(note);
    request(`/api/notes/update/${note._id}`, "PUT", note, {
      auth: `Bearer ${userToken}`
    });
  }

  const fetchNotes = useCallback(() => {
    request("/api/notes", "GET", null, {
      auth: `Bearer ${userToken}`
    }).then(res => {
      setNotes(
        res.notes.reduce(
          (notesMap, note) => ({
            ...notesMap,
            [note._id]: note
          }),
          {}
        )
      );
    });
  }, [userToken, request]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  function openNoteEditor(noteId) {
    setEditorOpen(true);
    setactiveNoteId(noteId);
  }

  function closeNoteEditor() {
    setEditorOpen(false);
    setactiveNoteId(null);
  }

  return (
    <Container>
      <NewNote addNote={addNote} />
      <div className="notes">
        {Object.values(notes)
          .filter(note => !note.isTrashed)
          .reverse()
          .map(note => (
            <Note
              openNoteEditor={openNoteEditor.bind(null, note._id)}
              key={note._id}
              note={note}
              hidden={isEditorOpen && note._id === activeNoteId}
              changeNote={changeNote}
            />
          ))}
      </div>

      {isEditorOpen && (
        <div className="modal-back">
          <NoteEditor
            note={notes[activeNoteId]}
            setNote={updateNote}
            onOutsideClick={closeNoteEditor}
            onNoteSave={saveNote}
          />
        </div>
      )}
    </Container>
  );
}
