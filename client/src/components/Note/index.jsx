import React, { useState, useContext, useEffect } from "react";
import { NoteTools } from "../NoteTools";
import { noteColors } from "../../constants/note";

import "./Note.scss";

export function Note({
  note,
  changeBackgroundColor,
  deleteNote,
  openNoteEditor,
  hidden
}) {
  const [isToolsHidden, setToolsHidden] = useState(true);

  function showTools() {
    setToolsHidden(false);
  }
  function hideTools() {
    setToolsHidden(true);
  }

  function onColorPick(color) {
    changeBackgroundColor(note, color);
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
        hidden={isToolsHidden}
        onColorPick={onColorPick}
        onDeleteNote={deleteNote.bind(null, note)}
      />
    </div>
  );
}
