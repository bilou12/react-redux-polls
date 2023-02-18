import { connect } from "react-redux";

const UserLoggedIn = ({ authedUser }) => {
  return (
    <div>
      <h5>{authedUser}</h5>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser: authedUser,
});

export default connect(mapStateToProps)(UserLoggedIn);
