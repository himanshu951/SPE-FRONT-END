import { Avatar, Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useEffect } from "react";
import { getConfig, initUrl } from "../config/auth";
import { TextField }from "@mui/material"
import { useNavigate } from "react-router-dom";

export default function AddCategory() {
  // const l = [1, 2, 3, 4, 5, 6, 7, 78, 8, 9, 9, 1, 1, 2];
  useEffect(()=>{
    getCategories();
  },[]);
  const navigate= useNavigate();
  const getCategories= async()=>{
    const config= getConfig();
    const res= await axios.post(initUrl+"/getall/cat",{},config)
    .catch(function (error){
        console.log(error);
    });
    let x= res.data;
    console.log(res);
    let tx=[];
    for(let i=0;i<x.length;i++){
      tx.push(x[i]);
    }
    SetListofActive(tx);
  }
  const handleAddCat= async() =>{
    const config= getConfig();
    const res= await axios.post(initUrl+"/cat/add",{ctype:cat.toUpperCase()},config);
    alert("added category");
    navigate('/admin/home');
  }
  const [listofActive,SetListofActive]= useState([]);
  const [cat,setCat]=useState('');
  const divStyle={
    margin:"1rem auto",width:"70%",paddingBottom:"1rem",borderRadius:"20px",boxShadow:"8px 8px 8px gray",backgroundColor:"#FDF4F5"
  }
  return (
    <div style={divStyle}>
        <h2 className="bg-dark" style={{textAlign:"center",padding:"1rem",color:"white",borderTopLeftRadius:"20px",borderTopRightRadius:"20px"}}>Category</h2>
        <div style={{height:"300px",overflow:"auto"}}>
    <table className="table" style={{margin:"1rem auto",textAlign:"center"}}>
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
        </tr>
      </thead>
      <tbody>
        {listofActive.map((e) => {
            return(
                <tr>
                <td>
                  {e.cid}
                </td>
                <td>
                  {e.ctype}
                </td>
              </tr>
            )
        })}
      </tbody>
    </table>
    </div>
    <div style={{margin:"1rem auto",width:"400px"}}>
    <TextField
    label="New Category"
    variant="outlined"
    value={cat}
    onChange={(e) => setCat(e.target.value)}
    style={{display:"block",margin:"1rem auto"}}
    fullWidth
    />
    <Button className="bg-dark" onClick={handleAddCat} style={{width:"100%",cursor:"pointer"}} variant="contained"> Add Category</Button>
    </div>
    </div>
  );
}