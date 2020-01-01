import React from "react";
import "./SearchBar.scss";

export function SearchBar() {
  return (
    <div className="search-bar">
      <form className="search-form">
        <input placeholder="search" />
      </form>
    </div>
  );
}
