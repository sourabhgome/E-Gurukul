import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import Home from "./components/pages/Home";
import Header from "./components/layout/Header";
import UserRegistration from "./components/auth/user/Register";
import UserLogin from "./components/auth/user/Login";
import UserContext from "./context/UserContext";
import Login from "./components/auth/Login";
import UserHomePage from "./components/pages/user/Home";
import PracticeQuestions from "./components/pages/user/sections/PracticeQuestions";
import AdminRegistration from "./components/auth/admin/Register";
import AdminLogin from "./components/auth/admin/Login";
import AdminHomePage from "./components/pages/admin/Home";
import CreateExam from "./components/pages/admin/sections/CreateExam";
import Exam from "./components/pages/user/sections/Exam";

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  console.log("App : ", userData);
  useEffect(() => {
    const checkLoggedIn = async () => {
      let tokenx = localStorage.getItem("auth-token");
      if (!tokenx) {
        localStorage.setItem("auth-token", "");
        tokenx = "";
      }
      const tokenRes = await Axios.post("http://localhost:5050/users/isTokenValid", null, {
        headers: { "x-auth-token": tokenx },
      });
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5050/users/", {
          headers: { "x-auth-token": tokenx },
        });
        setUserData({
          tokenx,
          user: userRes.data,
        });
      } else {
        const adminTokenRes = await Axios.post("http://localhost:5050/admin/isTokenValid", null, {
          headers: { "x-auth-token": tokenx },
        });
        if (adminTokenRes.data) {
          const adminRes = await Axios.get("http://localhost:5050/admin/", {
            headers: { "x-auth-token": tokenx },
          });
          setUserData({
            tokenx,
            user: adminRes.data,
          });
        }
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header></Header>
          <div className="cloudy-knoxville-gradient">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/user/login" component={UserLogin} />
              <Route exact path="/user/register" component={UserRegistration} />
              <Route exact path="/user/home" component={UserHomePage} />
              <Route exact path="/user/practice" component={PracticeQuestions} />
              <Route exact path="/user/exam" component={Exam} />
              <Route exact path="/admin/login" component={AdminLogin} />
              <Route exact path="/admin/register" component={AdminRegistration} />
              <Route exact path="/admin/home" component={AdminHomePage} />
              <Route exact path="/admin/createexam" component={CreateExam} />
            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
