import { connect } from "react-redux";
import { userHasAlreadyVoted } from "../utils/helper";
import { handleSaveQuestionAnswer } from "../actions/shared";

const Question = ({ dispatch, question, usersValues, authedUser }) => {
  let questionAuthor = question.author;
  console.log(questionAuthor);

  let user = usersValues.filter((u) => {
    return u.id === questionAuthor;
  });

  let canVote = !userHasAlreadyVoted(question, authedUser);

  const handleOnClick = (e) => {
    e.preventDefault();
    console.log("e: ", e.target.value);
    dispatch(handleSaveQuestionAnswer(authedUser, question.id, e.target.value));
  };

  return (
    <div className="question">
      <div>
        <p>{"Poll by: " + user.name}</p>
        <br></br>
        <img
          src={user.avatarURL}
          alt={`Avatar of ${user.id}`}
          className="avatar"
        />
      </div>
      <br></br>
      <div>
        <p>Would you rather?</p>
        <div>
          <p>{question.optionOne.text}</p>
          <ul>
            {question.optionOne.votes.map((v) => {
              return <li key={v}>{v}</li>;
            })}
          </ul>
          <br></br>
          <span>or</span>
          <br></br>
          <p>{question.optionTwo.text}</p>
          <ul>
            {question.optionTwo.votes.map((v) => {
              return <li key={v}>{v}</li>;
            })}
          </ul>
        </div>
      </div>
      <br></br>
      <div>
        {canVote && (
          <div>
            <button onClick={handleOnClick} value="optionOne">
              Option 1
            </button>
            <button onClick={handleOnClick} value="optionTwo">
              Option 2
            </button>
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
