import React, { useContext, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBModalFooter,
} from "mdbreact";
import { useHistory } from "react-router-dom";
import UserContext from "../../../context/UserContext";
import Axios from "axios";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { email, password };
      const loginRes = await Axios.post("http://localhost:5050/users/loginUser", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/user/home");
    } catch (err) {
      console.log(err.response.data.msg);
    }
    //window.location.href="/user/home";
  };

  return (
    <MDBContainer fluid>
      <MDBRow className="border d-flex align-items-center" style={{ height: "90vh" }}>
        <MDBCol md="3"></MDBCol>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody className="mx-4">
              <div className="text-center">
                <h3 className="dark-grey-text mb-5">
                  <strong>Sign in</strong>
                </h3>
              </div>
              <form onSubmit={submit}>
                <MDBInput
                  label="Your email"
                  group
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  validate
                  error="wrong"
                  success="right"
                />
                <MDBInput
                  label="Your password"
                  group
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  validate
                  containerClass="mb-0"
                />
                <p className="font-small blue-text d-flex justify-content-end pb-3">
                  Forgot
                  <a href="#!" className="blue-text ml-1">
                    Password?
                  </a>
                </p>
                <div className="text-center mb-3">
                  <MDBBtn type="submit" gradient="blue" rounded className="btn-block z-depth-1a">
                    Sign in
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="3"></MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
