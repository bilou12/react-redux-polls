import { connect } from "react-redux";
import { userHasAlreadyVoted } from "../utils/helper";
import { handleSaveQuestionAnswer } from "../actions/shared";
import LoginPage from "./LoginPage";

const Question = ({ dispatch, question, usersValues, authedUser }) => {
  if (authedUser === null || authedUser === "") {
    return <LoginPage />;
  }

  let questionAuthor = question.author;

  let user = usersValues.filter((u) => {
    return u.id === questionAuthor;
  })[0];

  let canVote = !userHasAlreadyVoted(question, authedUser);

  const handleOnClick = (e) => {
    e.preventDefault();
    dispatch(handleSaveQuestionAnswer(authedUser, question.id, e.target.value));
  };

  return (
    <div className="question2">
      <div>
        <p>{"Poll by: " + user.name}</p>
        <br></br>
        <img
          src={user.avatarURL}
          alt={`Avatar of ${user.id}`}
          className="avatar"
        />
      </div>
      <div>
        <p>Would you rather?</p>
      </div>
      <div>
        {canVote && (
          <div>
            <p>{question.optionOne.text}</p>
            <br></br>
            <span>or</span>
            <br></br>
            <p>{question.optionTwo.text}</p>
            <button onClick={handleOnClick} value="optionOne">
              Option 1
            </button>
            <button onClick={handleOnClick} value="optionTwo">
              Option 2
            </button>
          </div>
        )}
      </div>
      <div>
        {!canVote && (
          <div>
            <p>{question.optionOne.text}</p>
            <p>
              {question.optionOne.votes.length} votes =
              {Math.round(
                (100 * question.optionOne.votes.length) /
                  (question.optionOne.votes.length +
                    question.optionTwo.votes.length)
              )}
              %
            </p>
            {question.optionOne.votes.includes(authedUser) && (
              <div>
                <p>You voted for the option one above</p>
              </div>
            )}
            <br></br>
            <p>{question.optionTwo.text}</p>
            <p>
              {question.optionTwo.votes.length} votes =
              {Math.round(
                (100 * question.optionTwo.votes.length) /
                  (question.optionOne.votes.length +
                    question.optionTwo.votes.length)
              )}
              %
            </p>
            {question.optionTwo.votes.includes(authedUser) && (
              <div>
                <p>You voted for the option two above</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ users, authedUser }) => {
  return {
    usersValues: Object.values(users),
    authedUser,
  };
};

export default connect(mapStateToProps)(Question);
