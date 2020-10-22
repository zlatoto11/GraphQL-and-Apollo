import React, { Component } from "react";
import logo from "../../acre-logo.svg";
import "../CSSFiles/Navbar.css";

export default class NavBar extends Component {
  render() {
    return (
      <div className="Navbar">
        <a href="" className="Title__Text">
          <h1>User Management System</h1>
        </a>

        <div className="Navbar__LinksContainer">
          <a href="/" className="Navbar__Links" aria-current="page">
            Home
          </a>
          <a href="/" className="Navbar__Links" aria-current="page">
            Careers
          </a>
          <a href="/" className="Navbar__Links" aria-current="page">
            Contact
          </a>
          <a
            href="/"
            id="current"
            className="Navbar__Links"
            aria-current="page"
          >
            User Management
          </a>
        </div>
      </div>
    );
  }
}
