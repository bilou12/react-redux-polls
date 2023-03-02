import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Nav from "./Nav";

test("Nav component renders correctly", () => {
  const { container } = render(
    <Router>
      <Nav />
    </Router>
  );
  expect(container).toMatchSnapshot();
});
