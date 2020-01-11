import React from "react";
import "./SearchBar.scss";

export function SearchBar({ setSearchPattern }) {
  const inputElement = React.createRef();
  function updateSearchPattern(event) {
    setSearchPattern(event.target.value);
  }

  function clearInput() {
    setSearchPattern("");
    inputElement.current.value = "";
  }
  return (
    <div className="search-bar">
      <form className="search-form">
        <label htmlFor="search-input" className="searchbar-icon search-icon">
          <i className="fas fa-search"></i>
        </label>
        <input
          placeholder="search"
          autocomplete="off"
          id="search-input"
          required="required"
          onChange={updateSearchPattern}
          ref={inputElement}
        />
        <div className="searchbar-icon clear-input-icon" onClick={clearInput}>
          <i className="fas fa-times"></i>
        </div>
      </form>
    </div>
  );
}
