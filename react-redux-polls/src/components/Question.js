import { Link } from "react-router-dom";

const Question = ({ question }) => {
  return (
    <Link to={`/question/${question.id}`} className="question">
      <div className="question">
        <h5>{"id: " + question.id}</h5>
        <p>{"author: " + question.author}</p>

        <p>Would you rather?</p>
        <div>
          {" "}
          <p>{"option 1 - text: " + question.optionOne.text}</p>
          <ul>
            {question.optionOne.votes.map((v) => {
              return <li key={v}>{v}</li>;
            })}
          </ul>
          <p>{"option 2 - text: " + question.optionTwo.text}</p>
          <ul>
            {question.optionTwo.votes.map((v) => {
              return <li key={v}>{v}</li>;
            })}
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default Question;
