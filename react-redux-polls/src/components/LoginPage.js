import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

const LoginPage = ({ userValues, dispatch, authedUser }) => {
  const handleOnClickUser = (e) => {
    let username = e.target.value;
    dispatch(setAuthedUser(username));
  };

  return (
    <div>
      <h3 className="center">Login Page</h3>
      <select onChange={handleOnClickUser} value={authedUser}>
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
