import { connect } from "react-redux";
import Poll from "./Poll.js";
import { userHasAlreadyVoted } from "../utils/helper.js";
import { useState } from "react";

const PollList = ({ questionValues, authedUser }) => {
  const [selectionTodoDone, setSelectionTodoDone] = useState("todo");

  const handleOnChangeSelection = (e) => {
    e.preventDefault();
    const newValue = e.target.value;
    setSelectionTodoDone(newValue);
  };

  let questionsDone = questionValues.filter((question) => {
    return userHasAlreadyVoted(question, authedUser);
  });

  let questionsTodo = questionValues.filter((question) => {
    return !userHasAlreadyVoted(question, authedUser);
  });

  const filterQuestions = () => {
    if (selectionTodoDone === "todo") {
      return questionsTodo;
    } else if (selectionTodoDone === "done") {
      return questionsDone;
    }
  };

  let questionsToDisplay = filterQuestions();
  questionsToDisplay.sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div>
      <h3>Poll List</h3>

      <select onChange={handleOnChangeSelection} value={selectionTodoDone}>
        <option key="todo" value="todo">
          To do
        </option>
        <option key="done" value="done">
          Done
        </option>
      </select>

      <h4>{selectionTodoDone}</h4>
      <ul className="question-list">
        {questionsToDisplay.map((question) => {
          return <Poll question={question} key={question.id}></Poll>;
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser }) => ({
  questionValues: Object.values(questions),
  authedUser,
});

export default connect(mapStateToProps)(PollList);
