import { useState } from "react";
import { connect } from "react-redux";
import { handleSaveQuestion } from "../actions/questions";

const NewPoll = ({ dispatch, authedUser }) => {
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");

  const handleChangeOption1 = (e) => {
    setOption1(e.target.value);
  };

  const handleChangeOption2 = (e) => {
    setOption2(e.target.value);
  };

  const handleOnClick = (e) => {
    let question = {
      optionOneText: option1,
      optionTwoText: option2,
      author: authedUser,
    };
    console.log("question: ", question);
    dispatch(handleSaveQuestion(question));
    setOption1("");
    setOption2("");
  };

  return (
    <div>
      <h4>Would you rather?</h4>
      <input
        id="text-input-option1"
        type="text"
        value={option1}
        onChange={handleChangeOption1}
      />
      <input
        id="text-input-option2"
        type="text"
        value={option2}
        onChange={handleChangeOption2}
      />
      <button onClick={handleOnClick}>Create new poll</button>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};

export default connect(mapStateToProps)(NewPoll);
