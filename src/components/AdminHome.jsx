import React, { useEffect, useState } from "react";
import DoctorsList from "./doctorsList";
import AdminSidebar from "./adminSidebar";
import axios from "axios";
import { getConfig, initUrl, isTokenExist } from "../config/auth";
// import NotLoggedIn from "../config/handleNotLoggedIn";
import { useNavigate } from "react-router-dom";
import WarningPage from "./warningPage";
import ActiveGamerListDash from "./activeGamerList";
import BlockedGamerListDash from "./blockedGamerList";
export default function AdminHome() {
    const headStyle={
        textAlign:"center",
        // backgroundColor:"#FDF4F5",
        marginLeft:"0",
        marginBottom:"1rem",
        padding:"0.5rem",
        boxShadow:"8px 8px 8px gray",
        borderTopLeftRadius:"20px",
        borderTopRightRadius:"20px",
        color:"white"
    }
    const cardStyle={
        padding:"1rem",
        paddingLeft:"2rem",
        boxShadow:"6px 5px 8px gray",
        opacity:"1",
        textAlign: "center"
    };
    const [doclist,setDoclist]=useState();
    const [isToken,setIsToken]=useState(false);
    const [countOfGamers,setCountOfGamers] = useState(0);
    const [games,setGames] = useState(0);
    const navigate = useNavigate();
    useEffect(()=>{
      //this is to set is Token
      setIsToken(isTokenExist());
        fetchAllGamer();
        fetchGames();
    },[]);
    const fetchAllGamer=async()=>{
        const config = getConfig();
        const res = await axios.post(initUrl+"/gamer/getall",{},config);
        // console.log(res);
        setCountOfGamers(res.data.length);
    };

    const fetchGames=async()=>{
        const config = getConfig();
        const res = await axios.post(initUrl+"/getall/games",{},config);
        // console.log(res);
        setGames(res.data.length);
    };
    if(!isToken){
      return(<WarningPage/>);
    }
    else
  return (
    <div className="container row" style={{ margin: "0.5rem auto" }}>
      <div className="col-12 col-md-3" style={{}}>
        <AdminSidebar/>
      </div>
      <div className="col-12 col-md-9 dashboard" style={{}}>
        <div className="row" style={{marginBottom:"1rem"}}>
          <div className="col-md-6">
            <div className="bg-light" style={cardStyle}>
                <h3>Gamers</h3>
                <small>Count of Gamers</small>
                <h1 style={{fontSize:"4rem"}}>{countOfGamers}</h1>
            </div>
          </div>
          <div className="col-md-6">
          <div className="bg-light" style={cardStyle}>
                <h3>Games</h3>
                <small>Count of Games</small>
                <h1 style={{fontSize:"4rem"}}>{games}</h1>
            </div>
          </div>
        </div>
        <div className="bg-light" style={{padding:"0.5rem",textAlign:"center",marginBottom:"1rem",boxShadow:"6px 5px 8px gray",}}>
            <h3>List of Gamers</h3>
        </div>
        <div className="row" style={{display:"flex",justifyContent:"center"}}>
            <div className="col" >
                <h4 className="blue-heading bg-dark" style={headStyle}>Approved Gamers</h4>
                <ActiveGamerListDash/>
            </div>
            <div className="col">
                <h4 className="blue-heading bg-dark" style={headStyle}>Blocked Gamers</h4>
                <BlockedGamerListDash/>
            </div>
        </div>
      </div>
      <br/><br/><br/><br/><br/><br/><br/>
    </div>
  );
}