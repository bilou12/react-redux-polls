import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ userIds, dispatch, authedUser }) => {
  const navigate = useNavigate();

  const handleOnChangeUser = (e) => {
    e.preventDefault();
    let username = e.target.value;
    dispatch(setAuthedUser(username));
    navigate("/");
  };

  return (
    <div>
      <h3 className="center">Login Page</h3>
      <select onChange={handleOnChangeUser} value={authedUser}>
        {userIds.map((userId) => (
          <option key={userId} value={userId}>
            {userId}
          </option>
        ))}
      </select>
    </div>
  );
};

const mapStateToProps = ({ users, authedUser }) => ({
  userIds: [""].concat(Object.values(users).map((user) => user.id)),
  authedUser: authedUser,
});

export default connect(mapStateToProps)(LoginPage);
