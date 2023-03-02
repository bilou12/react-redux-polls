import React from "react";
import PollList from "./PollList";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({
  questions: {
    question1: {
      id: "question1",
      author: "user1",
      optionOne: {
        votes: ["user2"],
        text: "Option One",
      },
      optionTwo: {
        votes: ["user1"],
        text: "Option Two",
      },
      timestamp: 123456789,
    },
    question2: {
      id: "question2",
      author: "user2",
      optionOne: {
        votes: ["user2", "user3"],
        text: "Option One",
      },
      optionTwo: {
        votes: ["user1"],
        text: "Option Two",
      },
      timestamp: 987654321,
    },
  },
  authedUser: "user1",
});

describe("PollList component", () => {
  it("should render correctly with questions to do", () => {
    const { container } = render(
      <Provider store={store}>
        <PollList />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
