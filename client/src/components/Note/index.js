import React from "react";

import "./Note.scss";

export function Note({ note }) {
  return (
    <div className="note">
      <div className="title">{note.title}</div>
      <div className="text">
        {note.text.split("\n").map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  );
}
