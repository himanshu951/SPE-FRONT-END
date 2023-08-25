import React from "react";

export default function LoggedInNavList(){
    return(
        <ul className="navbar-nav">
        <li className="nav-item active">
          <a className="nav-link" href="/admin/home">
              Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/admin/home">
            Features
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/admin/home">
            Feedback
          </a>
        </li>
      </ul>
    );
}