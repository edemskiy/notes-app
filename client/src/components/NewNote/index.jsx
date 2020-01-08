import React, { useState, useRef, useEffect, useContext } from "react";
import { useRequest } from "../../hooks/request";
import { AuthContext } from "../../context/AuthContext";
import { emptyNote } from "../../states/note";
import { NoteEditor } from "../NoteEditor";

export function NewNote({ addNote }) {
  const { userToken } = useContext(AuthContext);
  const { request, error } = useRequest();

  const [note, setNote] = useState(emptyNote);
  const [hideTitleAndTools, setHideTitleAndTools] = useState(true);

  function openFullEditor() {
    setHideTitleAndTools(false);
  }

  function closeFullEditor() {
    setHideTitleAndTools(true);
  }

  function saveNote() {
    if (!note.title && !note.text) {
      closeFullEditor();
      return;
    }
    request("/api/notes/create", "POST", note, {
      auth: `Bearer ${userToken}`
    }).then(res => {
      setNote(emptyNote);
      closeFullEditor();
      addNote(res.note);
    });
  }

  return (
    <NoteEditor
      hideTitleAndTools={hideTitleAndTools}
      note={note}
      fillContent={false}
      setNote={setNote}
      openFullEditor={openFullEditor}
      closeNoteEditor={closeFullEditor}
      onNoteSave={saveNote}
    />
  );
}
