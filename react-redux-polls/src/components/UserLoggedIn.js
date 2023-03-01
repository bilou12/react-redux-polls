import { connect } from "react-redux";

const UserLoggedIn = ({ authedUser, usersValues }) => {
  let authedUserDetails = usersValues.filter((user) => user.id === authedUser);

  if (authedUserDetails.length === 0) {
    return <h5>Please login</h5>;
  } else {
    authedUserDetails = authedUserDetails[0];
    return (
      <div>
        <img
          src={authedUserDetails.avatarURL}
          alt={`Avatar of ${authedUserDetails.name}`}
          className="avatar"
        />
        <h5>{authedUserDetails.name}</h5>
      </div>
    );
  }
};

const mapStateToProps = ({ authedUser, users }) => ({
  authedUser: authedUser,
  usersValues: Object.values(users),
});

export default connect(mapStateToProps)(UserLoggedIn);
