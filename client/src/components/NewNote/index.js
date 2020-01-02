import React, { useState, useRef, useEffect } from "react";
import "./NewNote.scss";

export function NewNote() {
  const newNoteElement = useRef(null);
  const titleInput = useRef(null);
  const noteTools = useRef(null);
  const [note, setNote] = useState({
    title: "",
    text: "",
    color: "white",
    labels: []
  });

  function innerHTMLtoStr(s) {
    return s
      .replace(/<div>/gi, "\n")
      .replace(/<\/div>/gi, "")
      .replace(/<br>/gi, "");
  }

  function openNoteEditor() {
    [titleInput, noteTools].forEach(block => {
      block.current.style.display = "block";
    });
  }
  function closeNoteEditor() {
    [titleInput, noteTools].forEach(block => {
      block.current.style.display = "none";
    });
  }

  function handleClickOutside(event) {
    if (
      newNoteElement.current &&
      !newNoteElement.current.contains(event.target)
    ) {
      closeNoteEditor();
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  function inputHandler(event) {
    setNote({ ...note, [event.target.dataset.name]: event.target.innerHTML });
    if (event.key === "Backspace" && event.target.textContent === "") {
      event.target.innerHTML = "";
    }
  }

  function saveNote() {
    const newNote = {
      ...note,
      title: innerHTMLtoStr(note.title),
      text: innerHTMLtoStr(note.text)
    };
    // post request...
  }

  return (
    <div className="new-note" ref={newNoteElement}>
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
        onKeyUp={inputHandler}
      ></div>
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
        onKeyUp={inputHandler}
      ></div>
      <div className="note-tools" ref={noteTools}>
        <button onClick={saveNote}>save</button>
      </div>
    </div>
  );
}
