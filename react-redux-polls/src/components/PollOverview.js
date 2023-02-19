import { connect } from "react-redux";
import Question from "./Question.js";

const PollOverview = ({ questionValues, authedUser }) => {
  const userHasAlreadyVoted = (question) => {
    var inOptionOne = question["optionOne"]["votes"].indexOf(authedUser) > -1;
    var inOptionTwo = question["optionTwo"]["votes"].indexOf(authedUser) > -1;

    return inOptionOne || inOptionTwo;
  };

  let questionsDone = questionValues.filter((question) => {
    return userHasAlreadyVoted(question);
  });

  let questionsTodo = questionValues.filter((question) => {
    return !userHasAlreadyVoted(question);
  });

  return (
    <div>
      <h3>Poll Overview</h3>
      <h4>Todo</h4>
      <ul className="question-list">
        {questionsTodo.map((question) => {
          // return <li key={question.id}> {question.id}</li>;
          return <Question question={question} key={question.id}></Question>;
        })}
      </ul>

      <h4>Done</h4>
      <ul className="question-list">
        {questionsDone.map((question) => {
          // return <li key={question.id}> {question.id}</li>;
          return <Question question={question} key={question.id}></Question>;
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser }) => ({
  questionValues: Object.values(questions),
  authedUser,
});

export default connect(mapStateToProps)(PollOverview);
