import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRequest } from "../../hooks/request";
import "./Note.scss";
import { NoteTools } from "../NoteTools";
import { noteColors } from "../../constants/note";

export function Note({ note, changeNote, openNoteEditor }) {
  const { request, error } = useRequest();
  const { userToken } = useContext(AuthContext);
  const [isToolsHidden, setToolsHidden] = useState(true);

  useEffect(() => {
    if (error) console.log(error);
    //TODO show popup message instead
  }, [error]);

  function showTools() {
    setToolsHidden(false);
  }
  function hideTools() {
    setToolsHidden(true);
  }

  function changeBackgroundColor(color) {
    changeNote({ _id: note._id, color });
    request(
      `/api/notes/update/${note._id}`,
      "PUT",
      { color },
      { auth: `Bearer ${userToken}` }
    );
  }

  function deleteNote() {
    request(
      `/api/notes/update/${note._id}`,
      "PUT",
      { isTrashed: true },
      { auth: `Bearer ${userToken}` }
    ).then(res => changeNote({ _id: res.note._id, isTrashed: true }));
  }

  return (
    <div
      className="note-card"
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
        isHidden={isToolsHidden}
        onColorPick={changeBackgroundColor}
        deleteNote={deleteNote}
      />
    </div>
  );
}
