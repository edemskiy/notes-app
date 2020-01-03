import React from "react";

import "./Note.scss";

export function Note({ note }) {
  return (
    <div className="note">
      <div
        contentEditable="true"
        aria-multiline="false"
        role="textbox"
        tabIndex="1"
        data-name="title"
        className="title"
        aria-label="Title"
        spellCheck="true"
      >
        {note.title}
      </div>
      <div
        contentEditable="true"
        aria-multiline="true"
        role="textbox"
        className="text"
        aria-label="Take a note…"
        tabIndex="2"
        data-name="text"
        spellCheck="true"
      >
        {note.text.split("\n").map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  );
}
