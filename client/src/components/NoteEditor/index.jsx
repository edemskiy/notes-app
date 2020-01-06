import React, { useRef, useEffect } from "react";
import "./NoteEditor.scss";

export function NoteEditor({ note, closeNoteEditor }) {
  const noteEditor = useRef();

  /** copy from NewNote component. Export in separate module?? */
  /* close editor on outside click */
  function handleClickOutside(event) {
    if (noteEditor.current && !noteEditor.current.contains(event.target)) {
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

  return (
    <div className="modal-back">
      <div className="note-editor" ref={noteEditor}>
        {/* placeholder for editor
            combine with NewNote component?? */}
        <div>{note.title}</div>
        <div>{note.text}</div>
      </div>
    </div>
  );
}
