import { Avatar} from "@mui/material";
import { useEffect, useState } from "react";
import { initUrl, getConfig } from "../config/auth";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function BlockedGamerListDash(){
    // const l = [1, 2, 3, 4, 5, 6, 7, 78, 8, 9, 9, 1, 1, 2];
    useEffect(()=>{
      getBlockedGamers();
    },[]);
    const getBlockedGamers= async()=>{
      const config= getConfig();
      const res= await axios.post(initUrl+"/gamer/getall",{},config);
      let x= res.data;
      let tx=[];
      for(let i=0;i<x.length;i++){
        if(x[i]["verified"]==0) tx.push(x[i]);
      }
      SetListofBlock(tx);
    }
    const [listofBlock,SetListofBlock]= useState([]);
  return (
    <div style={{height:"300px",width:"100%",overflow:"auto",paddingBottom:"1rem",borderBottomLeftRadius:"20px",borderBottomRightRadius:"20px",boxShadow:"8px 8px 8px gray"}}>
    <table className="table" style={{margin:"1rem auto",textAlign:"center"}}>
      <thead>
        <tr className="blue-heading">
          <th scope="col">Name</th>
          <th scope="col">More Info</th>
        </tr>
      </thead>
      <tbody>
        {listofBlock.map((e) => {
            return(
                <tr>
                <td>
                  {e["username"]}
                </td>
                <td>
                  <Link to={`/admin/gamer/${e.id}`}>View</Link>
                </td>
              </tr>
            )
        })}
      </tbody>
    </table>
    </div>
    );
}