import React,{ useContext, useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import { useHistory } from "react-router-dom";
import UserContext from "../../../context/UserContext";
import Axios from "axios";

const Register = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [username, setUsername] = useState();
    const { setUserData } = useContext(UserContext);
    console.log(setUserData);
    const history = useHistory();
    const submit = async (e) =>{
        e.preventDefault();
        const newAdmin = {email, password, passwordCheck, username};
        await Axios.post("http://localhost:5050/admin/registerAdmin", newAdmin);
        const loginRes = await Axios.post("http://localhost:5050/admin/loginAdmin", {
            email,
            password,
        });
        setUserData({
            token : loginRes.data.token,
            user : loginRes.data.user,
        });
        localStorage.setItem("auth-token", loginRes.data.token);
        history.push("/");
    };

  return (
    <MDBContainer fluid>
      <MDBRow className="border d-flex align-items-center" style={{height: "90vh"}}> 
      <MDBCol md="3"></MDBCol>
      <MDBCol md="6">
          <MDBCard>
            <MDBCardBody className="mx-4">
              <div className="text-center">
                <h3 className="dark-grey-text mb-5">
                  <strong>Register Admin</strong>
                </h3>
              </div>
              <form onSubmit={submit}>
              <MDBInput
                label="Your email"
                group
                type="email"
                onChange = { e => setEmail(e.target.value)}
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                label="Your password"
                group
                type="password"
                onChange = { e => setPassword(e.target.value)}
                validate
                containerClass="mb-0"
              />
              <MDBInput
                label="Confirm password"
                group
                type="password"
                onChange = { e => setPasswordCheck(e.target.value)}
                validate
                containerClass="mb-0"
              />
              <MDBInput
                label="Username"
                group
                type="text"
                onChange = { e => setUsername(e.target.value)}
                validate
                error="wrong"
                success="right"
              />
              <div className="text-center mb-3">
                <MDBBtn
                  type="submit"
                  gradient="blue"
                  rounded
                  className="btn-block z-depth-1a"
                >
                  Register
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

export default Register;