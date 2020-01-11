import React from "react";
import { noteColors } from "../../constants/note";
import "./NoteTools.scss";

export function NoteTools({
  hidden,
  hideCloseButton,
  note,
  updateNote,
  onClose
}) {
  function onColorPick(color) {
    updateNote({ ...note, color });
  }
  function onDeleteClick() {
    updateNote({ ...note, isTrashed: true });
  }
  function onPinClick() {
    updateNote({ ...note, isPinned: !note.isPinned });
  }
  return (
    <div className={"note-tools " + (hidden ? "opacity-0" : "opacity-1")}>
      {onColorPick && (
        <>
          <div className="color-picker-btn note-tool">
            <i className="fas fa-palette"></i>
          </div>

          <div className="color-palette">
            {Object.keys(noteColors).map((color, i) => (
              <div
                key={i}
                data-color={color}
                style={{ backgroundColor: noteColors[color] }}
                onClick={onColorPick.bind(null, color)}
              ></div>
            ))}
          </div>
        </>
      )}

      {note && (
        <div className="delete-btn note-tool" onClick={onDeleteClick}>
          <i className="fas fa-trash"></i>
        </div>
      )}

      {!hideCloseButton && (
        <div className="btn-close note-tool" onClick={onClose}>
          <button className="s">Close</button>
        </div>
      )}

      <div
        className={"pin-btn note-tool " + (note.isPinned ? "pinned" : "")}
        onClick={onPinClick}
      >
        <i className="fas fa-thumbtack"></i>
      </div>
    </div>
  );
}
