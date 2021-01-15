import React,{ useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";

export default function Home()
{
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();
    if(!userData.user) history.push("/login");
    else 
    {
        async function temp()
        {
        const tokenx = userData.token;
        const tokenRes = await Axios.post(
        "http://localhost:5050/users/isTokenValid", 
        null, 
        { headers: {"x-auth-token": tokenx } });
        if(tokenRes.data) history.push("/user/home");
        else
        {
            const adminTokenRes = await Axios.post(
            "http://localhost:5050/admin/isTokenValid", 
            null, 
            { headers: {"x-auth-token": tokenx } });
            if(adminTokenRes.data) history.push("/admin/home");
        }
        }
        temp();
    }
    return (
        <div>
        </div>
    );
}