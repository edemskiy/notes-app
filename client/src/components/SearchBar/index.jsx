import React from "react";
import "./SearchBar.scss";

export function SearchBar({ setSearchPattern }) {
  function updateSearchPattern(event) {
    setSearchPattern(event.target.value);
  }
  return (
    <div className="search-bar">
      <form className="search-form">
        <input placeholder="search" onChange={updateSearchPattern} />
      </form>
    </div>
  );
}
