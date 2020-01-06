import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRequest } from "../../hooks/request";
import "./Note.scss";

const colors = {
  white: "#fff",
  red: "#f28b82",
  blue: "#aecbfa",
  green: "#ccff90",
  purple: "#d7aefb",
  pink: "#fdcfe8",
  yellow: "#fff475",
  grey: "#e8eaed"
};

export function Note({ note, changeNote, openNoteEditor }) {
  const { request, error } = useRequest();
  const { userToken } = useContext(AuthContext);

  useEffect(() => {
    if (error) console.log(error);
    //TODO show popup message instead
  }, [error]);

  function changeBackgroundColor(event) {
    changeNote({ _id: note._id, color: event.target.dataset.color });
    request(
      `/api/notes/update/${note._id}`,
      "PUT",
      { color: event.target.dataset.color },
      { auth: `Bearer ${userToken}` }
    );
  }

  function deleteNote() {
    changeNote({ _id: note._id, isTrashed: true });
    request(
      `/api/notes/update/${note._id}`,
      "PUT",
      { isTrashed: true },
      { auth: `Bearer ${userToken}` }
    );
  }

  return (
    <div className="note-card" style={{ backgroundColor: colors[note.color] }}>
      <div className="note-title" onClick={openNoteEditor}>
        {note.title}
      </div>

      <div className="note-text" onClick={openNoteEditor}>
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
              onClick={changeBackgroundColor}
            ></div>
          ))}
        </div>
        <div className="delete-btn" onClick={deleteNote}>
          <i className="fas fa-trash"></i>
        </div>
      </div>
    </div>
  );
}
