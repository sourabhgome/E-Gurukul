import { MDBCol, MDBBtn, MDBContainer, MDBRow, MDBInput, MDBFormInline } from "mdbreact";
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBIcon } from "mdbreact";
import React, { Component, useContext } from "react";
import UserContext from "../../../../context/UserContext";
import Axios from "axios";

export default class CreateExam extends Component {
  static contextType = UserContext;
  componentDidMount() {
    const { userData, UserContext } = this.context;
  }

  constructor() {
    super();
    this.question = "";
    this.option1 = "";
    this.option2 = "";
    this.option3 = "";
    this.option4 = "";
    this.correctOption = "";
    this.addQuestion = this.addQuestion.bind(this);
    this.createExam = this.createExam.bind(this);
    //const {userData, setUserData} = this.context;
    this.state = {
      question: "",
      questions: [],
    };
  }

  addQuestion() {
    var ques = {
      question: this.state.question,
      options: [this.option1, this.option2, this.option3, this.option4],
      correctAnswer: this.correctOption,
    };
    this.question = "";
    this.option1 = "";
    this.option2 = "";
    this.option3 = "";
    this.option4 = "";
    this.setState({
      question: "",
      questions: [...this.state.questions, ques],
    });
  }

  createExam = async (e) => {
    e.preventDefault();
    try {
      const newExam = { questions: this.state.questions };
      const examRes = await Axios.post("http://localhost:5050/admin/createExam", {
        questions: this.state.questions,
      });
      alert("Exam code: ", examRes.data.examCode);
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  /*async function test()
        {
            const loginRes = await Axios.post("http://localhost:5050/users/practiceQuestions",{});
        }

    test();*/

  render() {
    /*async function test()
        {
            const loginRes = await Axios.post("http://localhost:5050/users/practiceQuestions",{});
        }

        test();*/

    var index = 0;
    return (
      <MDBContainer fluid>
        <MDBRow>
          <MDBCol md="12">
            <MDBRow className="border d-flex align-items-center" style={{ padding: "30px" }}>
              <MDBCol md="3"></MDBCol>
              <MDBCol md="6">
                <MDBCard>
                  <MDBCardBody className="mx-4">
                    <div className="text-center">
                      <h3 className="dark-grey-text mb-5">
                        <strong>Question</strong>
                      </h3>
                    </div>
                    <form>
                      <MDBInput
                        label="Question"
                        val={this.state.question}
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        onChange={(e) => this.setState({ question: e.target.value })}
                      />
                      <MDBRow>
                        <MDBCol>
                          <MDBInput
                            label="Option A"
                            group
                            type="text"
                            validate
                            containerClass="mb-0"
                            onChange={(e) => (this.option1 = e.target.value)}
                          />
                        </MDBCol>
                        <MDBCol>
                          <MDBInput
                            label="Option B"
                            group
                            type="text"
                            validate
                            containerClass="mb-0"
                            onChange={(e) => (this.option2 = e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol>
                          <MDBInput
                            label="Option C"
                            group
                            type="text"
                            validate
                            containerClass="mb-0"
                            onChange={(e) => (this.option3 = e.target.value)}
                          />
                        </MDBCol>
                        <MDBCol>
                          <MDBInput
                            label="Option D"
                            group
                            type="text"
                            validate
                            containerClass="mb-0"
                            onChange={(e) => (this.option4 = e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>
                      <MDBInput
                        label="Correct option"
                        group
                        type="text"
                        validate
                        containerClass="mb-0"
                        onChange={(e) => (this.correctOption = e.target.value)}
                      />
                      <div className="text-center mb-3">
                        <MDBBtn
                          onClick={this.addQuestion}
                          gradient="blue"
                          rounded
                          className="btn-block z-depth-1a"
                        >
                          Add question
                        </MDBBtn>
                      </div>
                    </form>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol md="3"></MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="12" style={{ paddingTop: "30px" }}>
            <form>
              {this.state.questions.map((question) => {
                return (
                  <div>
                    <strong>
                      {++index}. {question.question}
                    </strong>
                    <MDBFormInline className="mt-2">
                      {question.options.map((option, i) => {
                        return (
                          <MDBInput
                            label={option}
                            type="radio"
                            name="answer"
                            disabled
                            containerClass="mr-5"
                          />
                        );
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
                <MDBBtn onClick={this.createExam} gradient="blue">
                  Create Exam
                </MDBBtn>
              )}
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
