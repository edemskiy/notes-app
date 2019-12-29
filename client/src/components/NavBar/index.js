import React from "react";
import "./NavBar.css";

export function NavBar(props) {
  return (
    <>
      <div className="navbar-wrapper">
        <nav>
          <div className="menu-and-logo">
            <div className="menu-icon">
              <i class="fas fa-bars"></i>
            </div>
            <a className="logo">
              <i class="far fa-sticky-note"></i>
              <span>Notes</span>
            </a>
          </div>
          <div className="search-and-tools">
            <div className="searchbar">
              <input placeholder="search" />
            </div>
            <div className="tools">
              <button className="btn-logout" onClick={props.logout}>
                Logout
              </button>
            </div>
          </div>
        </nav>
      </div>
      <div className="empty"></div>
    </>
  );
}
