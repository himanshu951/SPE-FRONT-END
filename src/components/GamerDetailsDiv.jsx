import { Avatar ,Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getConfig, initUrl } from "../config/auth";
// import AdminDoctorStats from "./adminDoctorStats";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function GamerDetailsDiv(props) {
  const navigate= useNavigate();
  const id = props.id;
  const [docDetail, setDocDetail] = useState({});
  const [activDetail, setActivDetail] = useState({});
  useEffect(() => {
    fetchData();
    fetchactiv();
  }, []);
  const fetchData = async () => {
    const config = getConfig();
    const result = await axios.post(initUrl + "/gamer/get/" + id,{}, config);
    console.log(result.data);
    setDocDetail(result.data);
  };
  const fetchactiv = async () => {
    const config = getConfig();
    const result = await axios.post(initUrl + "/gamer/getactiv/" + id,{}, config);
    console.log(result.data);
    setActivDetail(result.data);
  };
  const handleapprov= async()=>{
    const config = getConfig();
    const result = await axios.post(initUrl + "/approve/gamer/" + id,{}, config);
    alert("Approved Gamer");
    navigate('/admin/home');
  }
  const handlebann= async()=>{
    const config = getConfig();
    const result = await axios.post(initUrl + "/bann/gamer/" + id,{}, config);
    alert("Blocked Gamer");
    navigate('/admin/home');
  }
  return (
    <div className="container" style={{}}>
      <div className="row bg-light" style={{padding:"1rem", boxShadow: "6px 5px 8px gray",}}>
        <div className="col-md-2" style={{textAlign:"center"}}>
          {/* <img
            className="doctor-img"
            src={require("./images/profile2-doctor.jpg")}
            alt="logo"
            style={{marginTop:"0.5rem" }}
          /> */}
          
        </div>
        <div className="col">
          <h1><b>{docDetail.firstname}</b> {docDetail.lastname}</h1>
          <h3></h3>
          <h6>Age : {docDetail.age}</h6>
          <h6>Level : {docDetail.level}</h6>
          <h6>Gamer Tag : <b>{docDetail.gamertag}</b></h6>
          <h6>Gender : {docDetail.gender==1 ? 'Male' : "female"}</h6>
          <h1>Active : {activDetail.verified==1 ? "Approved" : "Blocked"}</h1>
          <div row>
          <Button variant="contained" color="primary" onClick={handleapprov}>
            Approve Gamer
          </Button>

          <Button variant="contained" color="primary" onClick={handlebann} style={{margin: '0px 0px 0px 50px'}}>
            Reject Gamer
          </Button>
          </div>
        </div>
      </div>

    </div>
  );
}