import { padding } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getConfig, initUrl } from "../config/auth";

export default function AdminAddGame() {
    useEffect(()=>{
        getAllGames();
        getoptions();
    },[]);

    const getAllGames= async()=> {
        const config= getConfig();
        const result= await axios.post(initUrl+"/getall/games",{},config);
        const x=result.data;
        console.log(x);
        const tx=[];
        for(let i=0;i<x.length;i++){
            tx.push(x[i]);
        }
        sell(tx);
    }

    const getoptions= async()=>{
        const config= getConfig();
        const result= await axios.post(initUrl+"/getall/cat",{},config);
        const x=result.data;
        const tx=[];
        for(let i=0;i<x.length;i++){
            tx.push(x[i]);
        }
        setOpt(tx);
    }
    const navigate=useNavigate();
    const [opt,setOpt]= useState([]);
    const [value, setValue] = useState("0");
    const [nameofgame,SetNameofGame]= useState("");
    const [cost,SetCost]= useState("");
    const [l,sell] = useState([]);
    const handleChange = (e) => {
        setValue(e.target.value);
    };
    const handelname = (e) => {
        SetNameofGame(e.target.value);
    };
    const handelcost = (e) => {
        SetCost(e.target.value);
    };
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(value === '0'){
            alert("Select a Category first");
        }
        else if(nameofgame==='' || cost==='' || cost ==='0'){
            alert("Invalid Name or Cost");
        }
        else{
            const intvalue= parseInt(value,10);
            const intcost=parseInt(cost,10);
            const data={gamename:nameofgame.toUpperCase(),cid:intvalue,cost:intcost}
            console.log(data);
            const config= getConfig();
            const result= await axios.post(initUrl+"/game/add",data,config);
            console.log(result.data);
            alert("Added Game Successfully");
            navigate("/admin/home");
        }
    }
    return (
        <div className="row">
            <div className="col-12 col-md-8" style={{ padding: "2rem", height: "550px", overflow: "auto" }}>
                <div style={{ border: "solid" }}>
                    <table class="table" style={{ textAlign: "center" }}>
                        <thead>
                            <tr className="bg-dark" style={{ color: "white" }}>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Category</th>
                                <th scope="col">Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {l.map((ele, index) => {
                                return (
                                    <tr>
                                        <th scope="row">{ele.gid}</th>
                                        <td>{ele.name}</td>
                                        <td>{ele.cate}</td>
                                        <td>{ele.cost}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="col-md-4" style={{ padding: "2rem" }}>
                <div style={{border:"solid"}}>
                    <h3 className="bg-dark" style={{ textAlign: "center", padding: "0.5rem", color: "white" }}>Add New Game</h3>
                    <form style={{ padding: "1rem" }} onSubmit={handleSubmit}>
                        <div class="form-group">
                            <label for="exampleInputCategory">Select Category</label>
                            <select class="form-control form-control-md" value={value} onChange={handleChange}>
                                <option value="0" > Select </option>
                                {opt.map((ele,index)=>{
                                    return <option key={ele.cid} value={ele.cid}>{ele.ctype}</option>
                                })}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Name</label>
                            <input type="text" 
                            class="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter Name of Game"
                            value={nameofgame}
                            onChange={handelname}
                            />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Cost</label>
                            <input 
                            value={cost}
                            onChange={handelcost}
                             type="text" class="form-control" id="exampleInputPassword1" placeholder="Cost Per Hour" />
                        </div>
                        <button type="submit" class="btn btn-dark" style={{ margin: "1rem auto", width: "100%", opacity: "0.8" }}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}