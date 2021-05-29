import { MDBCol, MDBBtn, MDBContainer, MDBRow, MDBInput, MDBFormInline } from "mdbreact";
import React, { Component, useContext } from "react";
import Practice from "../Practice";
import UserContext from "../../../../context/UserContext";
import Axios from "axios";

export default class PracticeQuestions extends Component {
  static contextType = UserContext;

  componentDidMount() {
    const { userData, UserContext } = this.context;
  }

  constructor() {
    super();
    //const {userData, setUserData} = this.context;
    this.state = {
      selectedTopic: "C",
      topics: ["C", "C++", "Java", "Python", "JavaScript"],
      questions: [
        {
          topic: "C",
          question: "What is the 16-bit compiler allowable range for integer constants?",
          options: ["-3.4e38 to 3.4e38", "-32767 to 32768", "-32668 to 32667", "-32768 to 32767"],
          correctAnswer: "-32768 to 32767",
        },
        {
          topic: "C",
          question: "What is required in each C program? ",
          options: [
            "The program must have at least one function.",
            "The program does not require any function.",
            "Input data",
            "Output data",
          ],
          correctAnswer: "The program must have at least one function.",
        },
        {
          topic: "C",
          question: "What is a lint?",
          options: ["C compiler", "Interactive debugger", "Analyzing tool", "C interpreter"],
          correctAnswer: "Analyzing tool",
        },
        {
          topic: "C",
          question: "The prototype of a function can be used to,",
          options: ["Define a function", "Declare a function", "Erase a function", "None of the above"],
          correctAnswer: "Declare a function",
        },
        {
          topic: "C",
          question: "Which of the following is a logical AND operator?",
          options: ["!", "&&", "&", "||"],
          correctAnswer: "&",
        },
        {
          topic: "Python",
          question: "Which among them is used to create an object?",
          options: ["A Class", "A Function", "A Method", "A Constructor"],
          correctAnswer: "A Constructor",
        },
        {
          topic: "Python",
          question: "What is the maximum possible length of an identifier?",
          options: ["16", "32", "64", "None of these"],
          correctAnswer: "None of these",
        },
        {
          topic: "Python",
          question: "Who developed the Python language?",
          options: ["Zim Den", "Guido van Rossum", "Niene Stom", "Wick van Rossum"],
          correctAnswer: "Guido van Rossum",
        },
        {
          topic: "Python",
          question: "In which language is Python written?",
          options: ["English", "C", "PHP", "Go"],
          correctAnswer: "C",
        },
        {
          topic: "Python",
          question: "Which one of the following is the correct extension of the Python file?",
          options: [".py", ".python", ".pip", ".p"],
          correctAnswer: ".py",
        },
      ],
    };

    /*async function test()
        {
            const loginRes = await Axios.post("http://localhost:5050/users/practiceQuestions",{});
        }

        test();*/
  }

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
          <MDBCol md="3" className="border-right border-light" style={{ paddingTop: "30px" }}>
            {this.state.topics.map((topic) => (
              <a href="#" onClick={() => this.setState({ selectedTopic: topic })}>
                {" "}
                {topic} <br></br>
              </a>
            ))}
          </MDBCol>
          <MDBCol md="9" style={{ paddingTop: "30px" }}>
            <form>
              {this.state.questions.map((question) => {
                if (question.topic === this.state.selectedTopic)
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
              Home
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
