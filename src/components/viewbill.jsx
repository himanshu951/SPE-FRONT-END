import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { initUrl, getConfig } from "../config/auth";
import { Button } from "@mui/material";
export default function ViewBill() {
    var sum=0,hsum=0;
    const { billid, gamerid } = useParams();
    const [bills, setBills] = useState([]);
    const [listofint, setlistofint] = useState([]);
    const [gamess, setgames] = useState([]);
    const [billitem, setbillitem] = useState([]);
    // const x=useParams();
    useEffect(() => {
        getBills();
        // getgamedetails();
    }, []);
    const getBills = async () => {
        const config = getConfig();
        const res = await axios.post(initUrl + "/get/bill/items", { gamerid, billid }, config);
        setBills(res.data);
    }

    return (
        <div className="col-md-8" style={{ margin: "1rem auto", height: "500px", overflow: "auto" }}>
            <h3 className="bg-dark" style={{ color: "white", textAlign: "center" }}>
                Items : {bills.length}
            </h3>

            <table class="table" style={{ border: "groove" }}>

                <thead>
                    <tr style={{ textAlign: "center" }}>
                        <th scope="col">#</th>
                        <th scope="col">Category</th>
                        <th scope="col">Game</th>
                        <th scope="col">Cost per hour</th>
                        <th scope="col">Time Played</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.map((ele, index) => {
                        sum=sum+ele.total;
                        hsum=hsum+ele.hours;
                        // setSum(sum);
                        return (
                            <tr style={{ textAlign: "center" }}>
                                <th scope="row">{index + 1}</th>
                                <td> {ele.gamename}</td>
                                <td>{ele.catename}</td>
                                <td> {ele.cost}</td>
                                <td> {ele.hours}</td>
                                <td> {ele.total}</td>
                            </tr>
                        );
                    })}
                    <tr style={{ textAlign: "center" }}>
                        <th> Total </th>
                        <td> </td>
                        <td></td>
                        <td> </td>
                        <td> {hsum} </td>
                        <td> {sum}</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <Button >Click here</Button>
            </div>
        </div>
    );
}