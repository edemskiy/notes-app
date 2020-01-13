import React, { useRef, useEffect, useState } from "react";
import { NoteTools } from "../NoteTools";
import { emptyNote } from "../../states/note";
import { noteColors, localeDateOptions } from "../../constants/note";
import "./NoteEditor.scss";
import { useCallback } from "react";

export function NoteEditor({ note, updateNote, onClose, hideTitleAndTools }) {
  const [noteCopy, setNoteCopy] = useState(note || emptyNote);
  const [hideFields, setHideFields] = useState(!!hideTitleAndTools);
  const [edited, setEdited] = useState(false);
  const newNoteElement = useRef(null);
  const titleInput = useRef(null);
  const textInput = useRef(null);

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      setEdited(true);
    }
  }, [noteCopy]);

  function openFullEditor() {
    setHideFields(false);
  }
  const closeNoteEditor = useCallback(() => {
    if (edited) {
      updateNote(noteCopy);
    }
    setHideFields(true);
    setNoteCopy(emptyNote);
    clearNoteEditor();

    if (typeof onClose === "function") {
      onClose();
    }
  }, [noteCopy, updateNote, onClose, edited]);

  useEffect(() => {
    if (noteCopy.isTrashed) {
      closeNoteEditor();
    }
  }, [noteCopy, closeNoteEditor]);

  function innerHTMLtoStr(s) {
    return s
      .replace(/<div>/gi, "\n")
      .replace(/<\/div>/gi, "")
      .replace(/<br>/gi, "")
      .replace(/^\n/, "");
  }

  function clearNoteEditor() {
    if (titleInput.current) titleInput.current.innerHTML = "";
    if (textInput.current) textInput.current.innerHTML = "";
  }

  /* close editor on outside click */
  function handleClickOutside(event) {
    if (
      newNoteElement.current &&
      !newNoteElement.current.contains(event.target) &&
      !hideFields
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
    setNoteCopy({
      ...noteCopy,
      [event.target.dataset.name]: innerHTMLtoStr(event.target.innerHTML)
    });
  }

  function pasteHandler(event) {
    event.preventDefault();
    const plainPastedText = event.clipboardData.getData("text/plain");
    console.log(plainPastedText);
    document.execCommand("insertHTML", false, plainPastedText);
  }

  return (
    <div
      className="note-editor"
      ref={newNoteElement}
      style={{ backgroundColor: noteColors[noteCopy.color] }}
    >
      {!hideFields && (
        <div
          className="note-title"
          contentEditable="true"
          suppressContentEditableWarning="true"
          aria-multiline="false"
          role="textbox"
          tabIndex="1"
          data-name="title"
          aria-label="Title"
          spellCheck="true"
          ref={titleInput}
          onPaste={pasteHandler}
          onKeyDown={inputKeyDownHandler}
          onKeyUp={inputKeyUpHandler}
        >
          {note && note.title}
        </div>
      )}
      <div
        className="note-text"
        contentEditable="true"
        suppressContentEditableWarning="true"
        aria-multiline="true"
        role="textbox"
        aria-label="Take a note…"
        tabIndex="2"
        data-name="text"
        spellCheck="true"
        onClick={openFullEditor}
        onPaste={pasteHandler}
        ref={textInput}
        onKeyDown={inputKeyDownHandler}
        onKeyUp={inputKeyUpHandler}
      >
        {note &&
          note.text.split("\n").map((line, i) => <div key={i}>{line}</div>)}
      </div>

      {note && (
        <div className="note-info">
          <span
            className="note-datetime"
            aria-label={new Date(note.createdAt).toLocaleString(
              undefined,
              localeDateOptions
            )}
          >
            Edited &nbsp;
            {new Date(note.editedAt).toLocaleString(
              undefined,
              localeDateOptions
            )}
          </span>
        </div>
      )}
      {!hideFields && (
        <NoteTools
          note={noteCopy}
          updateNote={setNoteCopy}
          onClose={closeNoteEditor}
        />
      )}
    </div>
  );
}

// export const NoteEditor = React.memo(NoteEditorComponent, () => true);
