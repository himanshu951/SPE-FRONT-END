import { textAlign } from "@mui/system";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getConfig, initUrl } from "../config/auth";

export default function AdminSeeBill() {
    useEffect(()=>{
        getusers();
    },[])
    // var l =[1,1,1,1,1,1,1,1,1,1,1,1,1];
    const getusers=async()=>{
        const config= getConfig();
        const res= await axios.post(initUrl+"/gamer/getall",{},config);
        setUsers(res.data);
    }

    const [users,setUsers]= useState([]);
    return (<div className="col-md-4" style={{margin:"1rem auto",height:"500px",overflow:"auto"}}>
        <h3 className="bg-dark" style={{color:"white",textAlign:"center"}}>
            Bills
        </h3>
        <table class="table" style={{border:"groove"}}>
            <tbody>
                {users.map((ele,index)=>{
                    return(
                        <tr>
                        <th scope="row">{index+1}</th>
                        <td>{ele.username}</td>
                        <td>Activation : {ele.verified==1? "Approved": "Rejected"}</td>
                        <td> {ele.verified==1 ? <Link to={`/admin/view/`+ele.id}> View</Link> : <h6>Activate User first </h6>}</td>
                    </tr>
                    )
                })}
            </tbody>
        </table>
    </div>);
}