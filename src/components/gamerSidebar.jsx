import React from "react";
import Avatar from "@mui/material/Avatar";
import GamerSideBarUl from "./gamerSidebarUl";
export default function GamerSidebar(props) {
  const {gid}= props;
  return (
    <div className="sidebar bg-light" style={{ textAlign: "center",boxShadow:"5px 5px 5px gray" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <Avatar sx={{ bgcolor: "grey", height: "70px", width: "70px" }}>
          G
        </Avatar>
      </div>
      <h2>Gamer</h2>
      <GamerSideBarUl/>
    </div>
  );
}