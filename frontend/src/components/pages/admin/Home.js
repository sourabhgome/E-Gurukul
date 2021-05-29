import React, { useContext, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdbreact";
import { useHistory } from "react-router-dom";
import UserContext from "../../../context/UserContext";
import Axios from "axios";

const AdminHomePage = () => {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const createExam = () => {
    history.push("/admin/createexam");
  };

  return (
    <div>
      <MDBRow className="border d-flex align-items-center" style={{ height: "15vh" }}>
        <MDBCol md="12" className="text-center">
          <h1 className="text-primary display-4" style={{ fontSize: "50px" }}>
            Welcome {userData.user.username}
          </h1>
          <h1 className="text-muted display-6" style={{ fontSize: "15px" }}>
            All the best!
          </h1>
        </MDBCol>
      </MDBRow>
      <MDBRow className="border d-flex align-items-center" style={{ height: "75vh" }}>
        <MDBCol md="2"></MDBCol>

        <MDBCol md="4">
          <MDBCard>
            <MDBCardImage
              className="blue-gradient white-text d-flex justify-content-center align-items-center flex-column p-4 rounded"
              tag="div"
            >
              <h2>Admin mode</h2>
              <p></p>
            </MDBCardImage>
            <MDBCardBody cascade className="text-center">
              <MDBCardText></MDBCardText>
              <a href="#!" className="primary-text mt-1 d-flex justify-content-end align-items-center">
                <MDBBtn gradient="blue">
                  Go to page <MDBIcon icon="chevron-right" className="ml-2" size="sm"></MDBIcon>
                </MDBBtn>
              </a>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="4">
          <MDBCard>
            <MDBCardImage
              className="blue-gradient white-text d-flex justify-content-center align-items-center flex-column p-4 rounded"
              tag="div"
            >
              <h2>Create Exam</h2>
              <p></p>
            </MDBCardImage>
            <MDBCardBody cascade className="text-center">
              <MDBCardText></MDBCardText>
              <a
                onClick={createExam}
                className="primary-text mt-1 d-flex justify-content-end align-items-center"
              >
                <MDBBtn gradient="blue">
                  Go to page <MDBIcon icon="chevron-right" className="ml-2" size="sm"></MDBIcon>
                </MDBBtn>
              </a>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="2"></MDBCol>
      </MDBRow>
    </div>
  );
};

export default AdminHomePage;
