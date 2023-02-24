import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ userValues, dispatch, authedUser }) => {
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
        {userValues.map((user) => (
          <option key={user.id} value={user.id}>
            {user.id}
          </option>
        ))}
      </select>
    </div>
  );
};

const mapStateToProps = ({ users, authedUser }) => ({
  userValues: Object.values(users),
  authedUser: authedUser,
});

export default connect(mapStateToProps)(LoginPage);
