import React, { useRef, useEffect } from "react";
import { NoteTools } from "../NoteTools";

import { noteColors } from "../../constants/note";
import "./NoteEditor.scss";

export function NoteEditor({
  note,
  setNote,
  hideTitleAndTools,
  fillContent,
  openFullEditor,
  closeNoteEditor,
  onNoteSave
}) {
  const newNoteElement = useRef(null);
  const titleInput = useRef(null);
  const textInput = useRef(null);

  function innerHTMLtoStr(s) {
    return s
      .replace(/<div>/gi, "\n")
      .replace(/<\/div>/gi, "")
      .replace(/<br>/gi, "");
  }

  function clearNoteEditor() {
    if (titleInput.current) titleInput.current.innerHTML = "";
    if (textInput.current) textInput.current.innerHTML = "";
  }

  /* close editor on outside click */
  function handleClickOutside(event) {
    if (
      newNoteElement.current &&
      !newNoteElement.current.contains(event.target)
    ) {
      clearNoteEditor();
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
    setNote({
      ...note,
      [event.target.dataset.name]: innerHTMLtoStr(event.target.innerHTML)
    });
  }

  function changeBackgroundColor(color) {
    setNote({ ...note, color });
  }

  function saveNote() {
    closeNoteEditor();
    onNoteSave();
  }

  return (
    <div
      className="note-editor"
      ref={newNoteElement}
      style={{ backgroundColor: noteColors[note.color] }}
    >
      {!hideTitleAndTools && (
        <div
          contentEditable="true"
          suppressContentEditableWarning="true"
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
        >
          {fillContent && note.title}
        </div>
      )}
      <div
        contentEditable="true"
        suppressContentEditableWarning="true"
        aria-multiline="true"
        role="textbox"
        className="note-text"
        aria-label="Take a note…"
        tabIndex="2"
        data-name="text"
        spellCheck="true"
        onClick={openFullEditor || function() {}}
        ref={textInput}
        onKeyDown={inputKeyDownHandler}
        onKeyUp={inputKeyUpHandler}
      >
        {fillContent &&
          note.text.split("\n").map((line, i) => <div key={i}>{line}</div>)}
      </div>
      {!hideTitleAndTools && <NoteTools onColorPick={changeBackgroundColor} />}
    </div>
  );
}
