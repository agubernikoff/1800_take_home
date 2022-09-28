import { render as rtlRender, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";
import App from "./App";

const render = (component) =>
  rtlRender(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );

test("renders app", () => {
  render(<App />);
  const app = screen.getByTestId("App");
  expect(app).toBeTruthy();
});
