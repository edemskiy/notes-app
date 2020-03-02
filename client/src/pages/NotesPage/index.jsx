import React, { useEffect, useCallback, useContext, useState } from "react";
import { Note } from "../../components/Note";
import { NoteEditor } from "../../components/NoteEditor";
import { AuthContext } from "../../context/AuthContext";
import { useRequest } from "../../hooks/request";
import { Container } from "@material-ui/core";

import { isSubstr } from "../../utils/main";
import "./NotesPage.scss";

export default function NotesPage({ searchPattern }) {
  const { userToken } = useContext(AuthContext);
  const { request } = useRequest();
  const [notes, setNotes] = useState({});
  const [isEditorOpen, setEditorOpen] = useState(false);
  const [activeNoteId, setactiveNoteId] = useState(null);

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
          Object.create(null)
        )
      );
    });
  }, [userToken, request]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  function changeNoteState({ _id, ...newProperties }) {
    setNotes({ ...notes, [_id]: { ...notes[_id], ...newProperties } });
  }

  function addNote(note) {
    if (!note.title && !note.text) {
      return;
    }
    request("/api/notes/create", "POST", note, {
      auth: `Bearer ${userToken}`
    }).then(res => {
      setNotes({ ...notes, [res.note._id]: res.note });
    });
  }

  function updateNote(note) {
    const editedNote = { ...note, editedAt: new Date().toISOString() };
    changeNoteState(editedNote);
    request(`/api/notes/update/${note._id}`, "PUT", editedNote, {
      auth: `Bearer ${userToken}`
    });
  }

  function openNoteEditor(noteId) {
    setEditorOpen(true);
    setactiveNoteId(noteId);
  }

  function closeNoteEditor() {
    setEditorOpen(false);
    setactiveNoteId(null);
  }

  const notesToShow = Object.values(notes)
    .filter(
      note =>
        isSubstr(note.title, searchPattern) ||
        isSubstr(note.text, searchPattern)
    )
    .reverse();

  return (
    <Container>
      <NoteEditor updateNote={addNote} hideTitleAndTools={true} />

      <div className="notes pinned-notes">
        {notesToShow
          .filter(note => note.isPinned)
          .map(note => (
            <Note
              openNoteEditor={openNoteEditor.bind(null, note._id)}
              key={note._id}
              note={note}
              updateNote={updateNote}
              hidden={isEditorOpen && note._id === activeNoteId}
            />
          ))}
      </div>
      {/* yep, repeat. Will make it a component when React.Context is added */}
      <div className="notes other-notes">
        {notesToShow
          .filter(note => !note.isPinned)
          .map(note => (
            <Note
              openNoteEditor={openNoteEditor.bind(null, note._id)}
              key={note._id}
              note={note}
              updateNote={updateNote}
              hidden={isEditorOpen && note._id === activeNoteId}
            />
          ))}
      </div>

      {isEditorOpen && (
        <div className="modal-back">
          <NoteEditor
            note={notes[activeNoteId]}
            updateNote={updateNote}
            onClose={closeNoteEditor}
          />
        </div>
      )}
    </Container>
  );
}
