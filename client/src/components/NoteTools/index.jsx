import React from "react";
import { noteColors } from "../../constants/note";
import "./NoteTools.scss";

export function NoteTools({ hidden, onColorPick, deleteNote }) {
  return (
    <div className={"note-tools " + (hidden ? "opacity-0" : "opacity-1")}>
      {onColorPick && (
        <>
          <div className="color-picker-btn">
            <i className="fas fa-palette"></i>
          </div>

          <div className="color-palette">
            {Object.keys(noteColors).map((color, i) => (
              <div
                key={i}
                data-color={color}
                style={{ backgroundColor: noteColors[color] }}
                onClick={onColorPick.bind(null, color) || (() => null)}
              ></div>
            ))}
          </div>
        </>
      )}

      {deleteNote && (
        <i className="delete-btn" onClick={deleteNote}>
          <i className="fas fa-trash"></i>
        </i>
      )}

      <div className="pin-btn">
        <i className="fas fa-thumbtack"></i>
      </div>
    </div>
  );
}
