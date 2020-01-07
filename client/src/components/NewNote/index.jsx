import React, { useState, useRef, useEffect, useContext } from "react";
import { useRequest } from "../../hooks/request";
import { AuthContext } from "../../context/AuthContext";
import { NoteTools } from "../NoteTools";
import { noteColors } from "../../constants/note";
import "./NewNote.scss";

const initialState = {
  title: "",
  text: "",
  color: "white",
  labels: []
};

export function NewNote({ addNote }) {
  const { userToken } = useContext(AuthContext);
  const { request, error } = useRequest();

  const newNoteElement = useRef(null);
  const titleInput = useRef(null);
  const textInput = useRef(null);

  const [note, setNote] = useState(initialState);
  const [isNoteEditorOpen, setEditorOpen] = useState(false);

  function innerHTMLtoStr(s) {
    return s
      .replace(/<div>/gi, "\n")
      .replace(/<\/div>/gi, "")
      .replace(/<br>/gi, "");
  }

  function openNoteEditor() {
    setEditorOpen(true);
  }

  function closeNoteEditor() {
    setEditorOpen(false);
  }

  function clearNoteEditor() {
    setNote(initialState);
    titleInput.current.innerHTML = "";
    textInput.current.innerHTML = "";
  }

  /* close editor on outside click */
  function handleClickOutside(event) {
    if (
      newNoteElement.current &&
      !newNoteElement.current.contains(event.target)
    ) {
      saveNote();
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  /********************************* */

  function inputKeyDownHandler(event) {
    if (event.key === "Enter" && event.target.dataset.name === "title") {
      event.preventDefault();
    }
  }
  function inputKeyUpHandler(event) {
    if (event.target.textContent === "") {
      event.target.innerHTML = "";
    }
    setNote({ ...note, [event.target.dataset.name]: event.target.innerHTML });
  }

  function changeBackgroundColor(color) {
    setNote({ ...note, color });
  }

  function saveNote() {
    if (!note.title && !note.text) {
      closeNoteEditor();
      return;
    }
    const newNote = {
      ...note,
      title: innerHTMLtoStr(note.title),
      text: innerHTMLtoStr(note.text)
    };

    request("/api/notes/create", "POST", newNote, {
      auth: `Bearer ${userToken}`
    }).then(res => {
      clearNoteEditor();
      closeNoteEditor();
      addNote(res.note);
    });
  }

  return (
    <div
      className="new-note"
      ref={newNoteElement}
      style={{ backgroundColor: noteColors[note.color] }}
    >
      {isNoteEditorOpen && (
        <div
          contentEditable="true"
          aria-multiline="false"
          role="textbox"
          tabIndex="1"
          data-name="title"
          className="note-title"
          aria-label="Title"
          spellCheck="true"
          ref={titleInput}
          onKeyDown={inputKeyDownHandler}
          onKeyUp={inputKeyUpHandler}
        ></div>
      )}
      <div
        contentEditable="true"
        aria-multiline="true"
        role="textbox"
        className="note-text"
        aria-label="Take a note…"
        tabIndex="2"
        data-name="text"
        spellCheck="true"
        onClick={openNoteEditor}
        ref={textInput}
        onKeyDown={inputKeyDownHandler}
        onKeyUp={inputKeyUpHandler}
      ></div>
      {isNoteEditorOpen && <NoteTools onColorPick={changeBackgroundColor} />}
    </div>
  );
}
