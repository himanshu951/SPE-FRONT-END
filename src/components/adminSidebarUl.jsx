import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../config/auth";

export default function AdminSideBarUl() {
  const navigate=useNavigate();
  const handleLogout = ()=>{
    logoutAdmin();
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
        <a href="/admin/addcat"> <i class="fa-solid fa-plus"></i> Add Category</a>
      </li>
      <hr />
      <li>
        <a href="/admin/addgame"> <i class="fa-solid fa-plus"></i> Add Game</a>
      </li>
      <hr />
      <li>
        <a href="/admin/generatebill"> <i class="fa-duotone fa-money-bills"></i> Generate Bill</a>
      </li>
      <hr/>
      <li>
        <a href="/admin/seebill"> <i class="fa-duotone fa-money-bills"></i> View Bills</a>
      </li>
      <hr/>
      <li>
        <p onClick={handleLogout} style={{cursor:"pointer"}}> <i class="fa-solid fa-right-from-bracket"></i> Logout</p>
      </li>
      <hr />
    </ul>
  );
}