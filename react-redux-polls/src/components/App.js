import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { LoadingBar } from "react-redux-loading-bar";
import { Route, Routes } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import Leaderboard from "./Leaderboard.js";
import LoginPage from "./LoginPage.js";
import Nav from "./Nav";
import NewPoll from "./NewPoll.js";
import PollDetails from "./PollDetails.js";
import PollOverview from "./PollOverview.js";
import UserLoggedIn from "./UserLoggedIn.js";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <Fragment>
      <LoadingBar />
      <div className="container">
        <UserLoggedIn />
        <Nav />
        {props.loading === true ? null : (
          <Routes>
            <Route path="/" exact element={<PollOverview />} />
            <Route path="/questions/:questionId" element={<PollDetails />} />
            <Route path="/add" element={<NewPoll />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
