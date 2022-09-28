import { render as rtlRender, screen, mount } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";
import { postsActions } from "./store/posts-slice";
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

// test("calls setPosts", () => {
//   const spy = jest.spyOn(App.prototype, "useEffect");
//   const wrapper = mount(<App />);
//   wrapper.instance().useEffect();
//   expect(spy).toHaveBeenCalled();
// });
