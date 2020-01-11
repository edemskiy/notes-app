import React, { useState } from "react";
import { NoteTools } from "../NoteTools";
import { noteColors } from "../../constants/note";

import "./Note.scss";

export function Note({ note, updateNote, openNoteEditor, hidden }) {
  const [isToolsHidden, setToolsHidden] = useState(true);

  function showTools() {
    setToolsHidden(false);
  }
  function hideTools() {
    setToolsHidden(true);
  }

  return (
    <div
      className={"note-card " + (hidden ? "opacity-0" : "opacity-1")}
      style={{ backgroundColor: noteColors[note.color] }}
      onMouseEnter={showTools}
      onMouseLeave={hideTools}
    >
      <div className="note-content" onClick={openNoteEditor}>
        <div className="note-title">{note.title}</div>

        <div className="note-text">
          {note.text.split("\n").map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      </div>

      <NoteTools
        note={note}
        updateNote={updateNote}
        hidden={isToolsHidden}
        hideCloseButton={true}
      />
    </div>
  );
}
