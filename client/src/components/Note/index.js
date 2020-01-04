import React from "react";

import "./Note.scss";

export function Note({ note }) {
  return (
    <div className="note-card">
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
        <div className="delete-btn">
          <i className="fas fa-trash"></i>
        </div>
      </div>
    </div>
  );
}
