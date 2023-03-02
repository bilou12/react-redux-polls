import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Question from "./Question";

const mockStore = configureMockStore();
const store = mockStore({
  users: {
    user1: {
      id: "user1",
      name: "User 1",
      avatarURL: "avatar1.png",
    },
    user2: {
      id: "user2",
      name: "User 2",
      avatarURL: "avatar2.png",
    },
  },
  authedUser: "user1",
});

describe("Question component", () => {
  it("should match snapshot", () => {
    const question = {
      id: "question1",
      author: "user1",
      optionOne: {
        text: "Option 1",
        votes: ["user1"],
      },
      optionTwo: {
        text: "Option 2",
        votes: [],
      },
    };

    const { container } = render(
      <Provider store={store}>
        <Question question={question} />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
