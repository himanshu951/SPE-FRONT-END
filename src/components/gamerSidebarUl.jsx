import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutAdmin, logoutGamer } from "../config/auth";

export default function AdminSideBarUl() {
  const navigate=useNavigate();
  const handleLogout = ()=>{
    logoutGamer();
    alert("You are logged out Successfully.");
    navigate("/");
  }
  return (
    <ul>
      <hr />
      <li>
        <a href="/admin/home"> <i class="fa-solid fa-desktop"></i> Dashboard</a>
      </li>
      <hr />
      <li>
        <Link to={`/gamer/seebill`}> <i class="fa-duotone fa-money-bills"></i> View Bills</Link>
      </li>
      <hr/>
      <li>
        <p onClick={handleLogout} style={{cursor:"pointer"}}> <i class="fa-solid fa-right-from-bracket"></i> Logout</p>
      </li>
      <hr />
    </ul>
  );
}