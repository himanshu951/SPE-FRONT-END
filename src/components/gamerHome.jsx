import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getConfig, initUrl, logoutGamer } from "../config/auth";
import AdminSidebar from "./adminSidebar";
import GamerSidebar from "./gamerSidebar";

export default function GamerHome(){
    const navigate= useNavigate();
    const [gid,setgid]= useState(0);
    useEffect(()=>{
        getUser();
    },[]);
    const getUser= async()=>{
        const config= getConfig();
        const result= await axios.post(initUrl+"/get/user",{},config)
        .catch(function(err){
            logoutGamer();
            alert("session timed out");
            navigate("/");
        });
        setgid(result.data);
    };
    const handleclick=()=>{
        logoutGamer();
        navigate("/");
    }
    return(
        <div className="container row" style={{ margin: "0.5rem auto" }}>
            <div className="col-12 col-md-3" style={{}}>
                <GamerSidebar gid={gid}/>
            </div>
            <div>
                
            </div>
        </div>
    );
}