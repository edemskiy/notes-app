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
  const [notes, setNotes] = useState([]);
  const [isEditorOpen, setEditorOpen] = useState(false);
  const [activeNoteInfo, setActiveNoteInfo] = useState(null);

  const fetchNotes = useCallback(() => {
    request("/api/notes", "GET", null, {
      auth: `Bearer ${userToken}`,
    }).then((notes) => setNotes(notes));
  }, [userToken, request]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  function createNote(note) {
    if (!note.title || !note.text) {
      return;
    }
    request("/api/notes/create", "POST", note, {
      auth: `Bearer ${userToken}`,
    }).then((note) => setNotes([...notes, note]));
  }

  function findNoteById(id) {
    return notes.find((note) => note._id === id);
  }

  function updateNote(updatedNote) {
    let noteIndex = notes.findIndex((note) => note._id === updatedNote._id);
    notes[noteIndex] = { ...notes[noteIndex], ...updatedNote };

    request(`/api/notes/update/${updatedNote._id}`, "PUT", updatedNote, {
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

  const notesToShow = notes
    .filter((note) => isSubstr(note.title, searchPattern) || isSubstr(note.text, searchPattern))
    .reverse();

  const pinnedNotes = notesToShow.filter((note) => note.isPinned);
  const notPinnedNotes = notesToShow.filter((note) => !note.isPinned);

  return (
    <Container>
      <NoteEditor updateNote={createNote} hideTitleAndTools={true} />

      {[pinnedNotes, notPinnedNotes].map((notes, i) => (
        <div className={"notes " + (i ? "other-notes" : "pinned-notes")} key={i}>
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
          <NoteEditor note={findNoteById(activeNoteInfo.id)} updateNote={updateNote} onClose={closeNoteEditor} />
        </div>
      )}
    </Container>
  );
}
