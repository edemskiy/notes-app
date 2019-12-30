import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./NavBar.scss";

export function NavBar() {
  const { logout } = useContext(AuthContext);
  return (
    <>
      <div className="navbar-wrapper">
        <nav>
          <div className="menu-and-logo">
            <div className="menu-icon">
              <i className="fas fa-bars"></i>
            </div>
            <a href="#" className="logo">
              <i className="far fa-sticky-note"></i>
              <span>Notes</span>
            </a>
          </div>
          <div className="search-and-tools">
            <div className="search-bar">
              <form className="search-form">
                <input placeholder="search" />
              </form>
            </div>
            <div className="tools">
              <button className="btn-logout" onClick={logout}>
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
