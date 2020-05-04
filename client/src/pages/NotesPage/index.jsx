import React, { useEffect, useCallback, useContext, useState } from "react";
import { Note } from "../../components/Note";
import { NoteEditor } from "../../components/NoteEditor";
import { AuthContext } from "../../context/AuthContext";
import { useRequest } from "../../hooks/request";
import { isSubstr } from "../../utils/main";
import { Container } from "@material-ui/core";
import "./NotesPage.scss";

export default function NotesPage({ searchPattern }) {
  const { userToken } = useContext(AuthContext);
  const { request } = useRequest();
  const [notes, setNotes] = useState({});
  const [isEditorOpen, setEditorOpen] = useState(false);
  const [activeNoteInfo, setActiveNoteInfo] = useState(null);

  const fetchNotes = useCallback(() => {
    request("/api/notes", "GET", null, {
      auth: `Bearer ${userToken}`,
    }).then((res) => {
      setNotes(
        res.notes.reduce(
          (notesMap, note) => ({
            ...notesMap,
            [note._id]: note,
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
      auth: `Bearer ${userToken}`,
    }).then((res) => {
      setNotes({ ...notes, [res.note._id]: res.note });
    });
  }

  function updateNote(note) {
    const editedNote = { ...note, editedAt: new Date().toISOString() };
    changeNoteState(editedNote);
    request(`/api/notes/update/${note._id}`, "PUT", editedNote, {
      auth: `Bearer ${userToken}`,
    });
  }

  function openNoteEditor({ id, boundingClientRect }) {
    setEditorOpen(true);
    setActiveNoteInfo({ id, boundingClientRect });
  }

  function closeNoteEditor() {
    setEditorOpen(false);
    setActiveNoteInfo(null);
  }

  const notesToShow = Object.values(notes)
    .filter(
      (note) =>
        isSubstr(note.title, searchPattern) ||
        isSubstr(note.text, searchPattern)
    )
    .reverse();

  const pinnedNotes = notesToShow.filter((note) => note.isPinned);
  const notPinnedNotes = notesToShow.filter((note) => !note.isPinned);

  return (
    <Container>
      <NoteEditor updateNote={addNote} hideTitleAndTools={true} />

      {[pinnedNotes, notPinnedNotes].map((notes, i) => (
        <div
          className={"notes " + (i ? "other-notes" : "pinned-notes")}
          key={i}
        >
          {notes.map((note) => (
            <Note
              openNoteEditor={openNoteEditor}
              key={note._id}
              note={note}
              updateNote={updateNote}
              hidden={isEditorOpen && note._id === activeNoteInfo.id}
            />
          ))}
        </div>
      ))}

      {isEditorOpen && (
        <div className="modal-back">
          <NoteEditor
            note={notes[activeNoteInfo.id]}
            updateNote={updateNote}
            onClose={closeNoteEditor}
            initialPosition={activeNoteInfo.boundingClientRect}
          />
        </div>
      )}
    </Container>
  );
}
