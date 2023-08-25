import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getConfig, initUrl } from "../config/auth";

export default function GamerViewBill(){
    const [gid,setgid]=useState();
    useEffect(()=>{
        getgid();
        getBills();
    });
    const getgid=async()=>{
        const config=getConfig();
        const res= await axios.post(initUrl+"/get/gameridfromtoken",{},config);
        setgid(res.data);
    };
    const getBills=async()=>{
        const config= getConfig();
        const res= await axios.post(initUrl+"/get/bills/"+gid,{},config);
        setBills(res.data);
    }

    const [bills,setBills]= useState([]);

    return(
        <div className="col-md-2" style={{margin:"1rem auto",height:"500px",overflow:"auto"}}>
        <h3 className="bg-dark" style={{color:"white",textAlign:"center"}}>
            Bills : {bills.length}
        </h3>
        <table class="table" style={{border:"groove"}}>
            <tbody>
                {bills.map((ele,index)=>{
                    return(
                        <tr>
                        <th scope="row">{ele.billid}</th>
                        <td> <Link to={`/admin/bill/`+ele.billid+`/`+ele.gamerid}> View</Link></td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
    );
}