import { render as rtlRender, screen, mount } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";
import Post from "./Post";

const render = (component) =>
  rtlRender(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

const fakePost = {
  title: "Title",
  body: "Body Ody Ody Ody Ody Ody Ody Ody Ody Ody Ody Ody",
  id: 1,
  userId: 1,
};

test("renders Post", () => {
  render(<Post post={fakePost} />);
  const post = screen.getByTestId("post");
  expect(post).toBeTruthy();
});

test("calls handleClick onClick", () => {
  render(<Post post={fakePost} />);
  const editBtn = screen.getByText(/Edit/);
  editBtn.click();
  expect(mockedUsedNavigate).toHaveBeenCalled();
});
