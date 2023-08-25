import React from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getConfig, initUrl } from "../config/auth";
import axios from "axios";
import { toContainElement } from "@testing-library/jest-dom/dist/matchers";
export default function AdminAddBill() {
    useEffect(() => {
        getusers();
        getoptions();
    }, []);

    const navigate = useNavigate();
    const h = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [lst, setlst] = useState([1]);
    const [currentuser,setcurrentuser] = useState("0");
    const [users, setUsers] = useState([]);
    const [opt, setOpt] = useState([]);
    const [games, setgames] = useState([]);
    const [cattype, setCatType] = useState('0');
    const [gameid, setgameid] = useState('0');
    const [hours, sethours] = useState("0");
    const [inputs, setInputs] = useState({});
    const [data, setData] = useState([]);
    const [finaldata,setfinaldata]=useState([]);
    const [billid,setbillid]=useState('0');
    const divStyle = {
        margin: "1rem auto", width: "70%", paddingBottom: "1rem", borderRadius: "20px", boxShadow: "8px 8px 8px gray", backgroundColor: "#FDF4F5"
    }

    const getBillId=async(id)=>{
        const config = getConfig();
        const result = await axios.post(initUrl + "/get/billid/"+id, {}, config);
        setbillid(result.data);
    }
    const getusers = async () => {
        const config = getConfig();
        const result = await axios.post(initUrl + "/gamer/getall/activ", {}, config);
        const x = result.data;
        const tx = [];
        for (let i = 0; i < x.length; i++) {
            tx.push(x[i]);
        }
        setUsers(tx);
    }

    const getoptions = async () => {
        const config = getConfig();
        const result = await axios.post(initUrl + "/getall/cat", {}, config);
        const x = result.data;
        const tx = [];
        for (let i = 0; i < x.length; i++) {
            tx.push(x[i]);
        }
        setOpt(tx);
    }

    const handlechange = async (e) => {
        setCatType(e.target.value);
        getAllGamesbyCat(e.target.value);
        // console.log(cattype);
    };
    const getAllGamesbyCat = async (id) => {
        const config = getConfig();
        const result = await axios.post(initUrl + "/getall/games/cat/" + id, {}, config);
        const x = result.data;
        // console.log(x);
        const tx = [];
        for (let i = 0; i < x.length; i++) {
            tx.push(x[i]);
        }
        setgames(tx);
    }

    const handleaddmore = () => {

        var intcurrentuser= parseInt(currentuser,10);
        var intgameid= parseInt(gameid,10);
        var inthours= parseInt(hours,10);
        if(currentuser=="0" || gameid=="0" || hours=="0"){
            alert("Invalid choices");
        }
        else{
        var date= new Date();
        var dateStr =
            date.getFullYear() + "-"+
            ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
            ("00" + date.getDate()).slice(-2) +" ";
        
        
        let v=finaldata;
        const sendingdata={gid:intcurrentuser,billid,gameid:intgameid,hours:inthours,filledtime:dateStr}
        v.push(sendingdata);
        setfinaldata(v);
        // var inputcatname= opt.find(({ cid }) => cid == cattype);
        // console.log(inputcatname);
        setInputs({ category: cattype, gamename: gameid, hours: hours });
        setData((prevState) => [...prevState, inputs]);
        setCatType('0');
        setgameid('0');
        sethours('0');
        }
    }

    const handlegamechange = (e) => {
        setgameid(e.target.value);
    }

    const handlehourchange = (e) => {
        sethours(e.target.value);
        // var inputcatname= opt.find(({ cid }) => cid == cattype);
        var inputgamename = games.find(({gid}) => gid == gameid);
        console.log(hours);
        var total=parseInt(inputgamename.cost)* parseInt(e.target.value);
        setInputs({category:inputgamename.cate,cost: inputgamename.cost,gamename:inputgamename.name,hours:e.target.value,total});
    }

    const handlechangeuser=(e)=>{
        setcurrentuser(e.target.value);
        getBillId(e.target.value);
    }

    const finalGen= async()=>{
        const config = getConfig();
        const result = await axios.post(initUrl + "/add/bill", finaldata, config);
        const x = result.data;
        alert(x);
        navigate("/admin/home");
    }

    return (
        <div style={divStyle}>
            <h2 className="bg-dark" style={{ textAlign: "center", padding: "1rem", color: "white", borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}>Generate Bill</h2>
            <div className="row" style={{ overflow: "auto", margin: "1rem auto" }}>
                <h3 className="col-md-3"> Select User: </h3>
                <div class="col-md-3">
                    <select class="form-control form-control-md" value={currentuser} onChange={handlechangeuser}>
                        <option value='0' > Select </option>
                        {users.map((ele, index) => {
                            return <option value={ele.id}>{ele.username}</option>
                        })}
                    </select>
                </div>
            </div>

            <div className="row" style={{ overflow: "auto", margin: "1rem auto" }}>
                <div className="col-md-4">
                    <label for="exampleInputCategory">Select Category</label>
                    <div>
                        <select class="form-control form-control-md" value={cattype} onChange={handlechange}>
                            <option value='0' > Select </option>
                            {opt.map((ele, index) => {
                                return <option value={ele.cid}>{ele.ctype}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="col-md-4">
                    <label for="exampleInputCategory">Select Game</label>
                    <div>
                        <select class="form-control form-control-md" value={gameid} onChange={handlegamechange}>
                            <option value="0" > Select </option>
                            {games.map((ele, index) => {
                                return (<option value={ele.gid}>{ele.name}</option>);
                            })}
                        </select>
                    </div>
                </div>
                <div className="col-md-4">
                    <label for="exampleInputCategory">Select Hours</label>
                    <div>
                        <select class="form-control form-control-md" value={hours} onChange={handlehourchange}>
                            <option value="0">Select</option>
                            {h.map((ele, index) => {
                                return <option value={ele}>{ele}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", }}> <button className="btn btn-dark" style={{ width: "30%" }} onClick={handleaddmore}>Add Item</button></div>
            <table class="table" style={{ textAlign: "center" }}>
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category</th>
                        <th scope="col">Name</th>
                        <th scope="col">Cost Per Hour</th>
                        <th scope="col">Hours</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((ele,index)=>{
                        return(
                            <tr>
                                <th scope="row">{index+1}</th>
                                <td>{ele.category}</td>
                                <td>{ele.gamename}</td>
                                <td>{ele.cost}</td>
                                <td>{ele.hours}</td>
                                <td>{ele.total}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div style={{ display: "flex", justifyContent: "center", }}> <button className="btn btn-dark" style={{ width: "30%" }} onClick={finalGen}>Generate Bill</button></div>
        </div>
    );
}