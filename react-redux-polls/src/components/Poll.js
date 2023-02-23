import { Link } from "react-router-dom";
import { formatDate } from "../utils/helper";

const Poll = ({ question }) => {
  return (
    <Link to={`/question/${question.id}`} className="question">
      <div>
        <span>{question.author}</span>
        <br></br>
        <span>{"@" + formatDate(question.timestamp)}</span>
        <br></br>
        <button>Show</button>
      </div>
    </Link>
  );
};

export default Poll;
