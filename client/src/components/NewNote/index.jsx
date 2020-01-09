import React, { useState, useRef, useEffect, useContext } from "react";
import { useRequest } from "../../hooks/request";
import { AuthContext } from "../../context/AuthContext";
import { NoteEditor } from "../NoteEditor";

export function NewNote({ addNote }) {
  const { userToken } = useContext(AuthContext);
  const { request, error } = useRequest();

  function saveNote(note) {
    if (!note.title && !note.text) {
      return;
    }
    request("/api/notes/create", "POST", note, {
      auth: `Bearer ${userToken}`
    }).then(res => {
      addNote(res.note);
    });
  }

  return <NoteEditor onNoteSave={saveNote} hideTitleAndTools={true} />;
}
