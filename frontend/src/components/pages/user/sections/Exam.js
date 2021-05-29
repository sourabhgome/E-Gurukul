import {
  MDBCol,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBInput,
  MDBFormInline,
  MDBCardBody,
  MDBCard,
} from "mdbreact";
import React, { Component, useContext } from "react";
import Practice from "../Practice";
import UserContext from "../../../../context/UserContext";
import Axios from "axios";

export default class Exam extends Component {
  static contextType = UserContext;

  componentDidMount() {
    const { userData, UserContext } = this.context;
  }

  constructor() {
    super();
    this.examCode = "";
    this.state = {
      examCode: "",
      questions: [],
    };
  }

  setExamCode(examCode) {
    this.examCode = examCode;
  }

  startExam = async (e) => {
    e.preventDefault();
    try {
      const examCode = this.examCode;
      const examRes = await Axios.post("http://localhost:5050/users/startExam", {
        examCode: examCode,
      });
      if (examRes) {
        console.log(examRes);
        this.setState({
          examCode: this.examCode,
          questions: examRes.data.questions,
        });
      }
    } catch (err) {
      console.log(err.response.data.msg);
    }
    //window.location.href="/user/home";
  };

  render() {
    var index = 0;
    return (
      <MDBContainer fluid>
        {this.state.examCode.length == 0 ? (
          <MDBRow className="border d-flex align-items-center" style={{ height: "90vh" }}>
            <MDBCol md="3"></MDBCol>
            <MDBCol md="6">
              <MDBCard>
                <MDBCardBody className="mx-4">
                  <div className="text-center">
                    <h3 className="dark-grey-text mb-5">
                      <strong>Enter Exam Code</strong>
                    </h3>
                  </div>
                  <form>
                    <MDBInput
                      label="Exam code"
                      group
                      type="text"
                      onChange={(e) => this.setExamCode(e.target.value)}
                      validate
                      error="wrong"
                      success="right"
                    />
                    <div className="text-center mb-3">
                      <MDBBtn
                        onClick={this.startExam}
                        gradient="blue"
                        rounded
                        className="btn-block z-depth-1a"
                      >
                        Start Exam
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="3"></MDBCol>
          </MDBRow>
        ) : (
          <MDBRow>
            <MDBCol md="1" className="border-light" style={{ paddingTop: "30px" }}></MDBCol>
            <MDBCol md="9" style={{ paddingTop: "30px" }}>
              <form>
                {this.state.questions.map((question) => {
                  return (
                    <div>
                      <strong>
                        {++index}. {question.question}
                      </strong>
                      <MDBFormInline className="mt-2">
                        {question.options.map((option, i) => {
                          return <MDBInput label={option} type="radio" name="answer" containerClass="mr-5" />;
                        })}
                      </MDBFormInline>
                      <br></br>
                    </div>
                  );
                })}
                {index == 0 ? (
                  <strong>
                    No questions available.<br></br>
                  </strong>
                ) : (
                  <MDBBtn type="submit" gradient="blue">
                    Submit
                  </MDBBtn>
                )}
              </form>
              <MDBBtn onClick={() => this.props.history.push("/user/home")} gradient="blue">
                Exit Exam
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        )}
      </MDBContainer>
    );
  }
}
