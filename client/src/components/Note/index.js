import React, { useState } from "react";

import "./Note.scss";

const colors = {
  white: "white",
  red: "red",
  blue: "blue",
  green: "green",
  purple: "purple",
  pink: "pink",
  yellow: "yellow",
  grey: "grey"
};

export function Note({ note }) {
  const [noteColor, setNoteColor] = useState(note.color);
  function pickColor(e) {
    setNoteColor(e.target.dataset.color);
    //TODO update note request...
  }
  return (
    <div className="note-card" style={{ backgroundColor: noteColor }}>
      <div className="note-title">{note.title}</div>

      <div className="note-text">
        {note.text.split("\n").map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>

      <div className="pin-btn">
        <i className="fas fa-thumbtack"></i>
      </div>
      <div className="note-tools">
        <div className="color-picker">
          <i className="fas fa-palette"></i>
        </div>
        <div className="color-palette">
          {Object.keys(colors).map((color, i) => (
            <div
              key={i}
              data-color={color}
              style={{ backgroundColor: colors[color] }}
              onClick={pickColor}
            ></div>
          ))}
        </div>
        <div className="delete-btn">
          <i className="fas fa-trash"></i>
        </div>
      </div>
    </div>
  );
}
