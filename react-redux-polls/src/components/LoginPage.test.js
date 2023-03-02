import { getByRole } from "@testing-library/dom"; // Add this line
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import LoginPage from "../components/LoginPage";
import reducers from "../reducers";

let store;

beforeEach(() => {
  store = createStore(reducers, { users: {}, authedUser: "" });
});

describe("LoginPage", () => {
  test("renders login page with users to select", () => {
    var component = render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );

    let user = "";
    const selectElement = component.getByTestId("user-select");
    expect(selectElement).toBeInTheDocument();
    fireEvent.change(selectElement, { target: { value: user } });
    expect(selectElement.value).toBe(user);
  });
});
