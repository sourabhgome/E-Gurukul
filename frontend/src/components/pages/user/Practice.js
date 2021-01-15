import React,{ useState, useEffect, useContext } from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Axios from "axios";
import { MDBContainer, MDBRow } from "mdbreact";
import UserContext from "../../../context/UserContext";
import PracticeQuestions from "./sections/PracticeQuestions";

export default function Practice()
{
    const {userData, setUserData} = useContext(UserContext);
    console.log("Practice : ",userData);
    return (<PracticeQuestions/>);
    //return <p>Practice</p>;
}