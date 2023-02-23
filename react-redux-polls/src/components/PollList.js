import { connect } from "react-redux";
import Poll from "./Poll.js";
import { userHasAlreadyVoted } from "../utils/helper.js";

const PollList = ({ questionValues, authedUser }) => {
  let questionsDone = questionValues.filter((question) => {
    return userHasAlreadyVoted(question, authedUser);
  });

  let questionsTodo = questionValues.filter((question) => {
    return !userHasAlreadyVoted(question, authedUser);
  });

  return (
    <div>
      <h3>Poll List</h3>
      <h4>Todo</h4>
      <ul className="question-list">
        {questionsTodo.map((question) => {
          // return <li key={question.id}> {question.id}</li>;
          return <Poll question={question} key={question.id}></Poll>;
        })}
      </ul>

      <h4>Done</h4>
      <ul className="question-list">
        {questionsDone.map((question) => {
          // return <li key={question.id}> {question.id}</li>;
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
