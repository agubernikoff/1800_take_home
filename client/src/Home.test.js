import { render as rtlRender, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { postsActions } from "./store/posts-slice";
import store from "./store/store";
import Home from "./Home";

const fakePosts = [
  {
    title: "Title",
    body: "Body Ody Ody Ody Ody Ody Ody Ody Ody Ody Ody Ody",
    id: 1,
    userId: 1,
  },
  { title: "Post", body: "and Toast", id: 2, userId: 1 },
];

store.dispatch(postsActions.setPosts(fakePosts));

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

test("renders Home", () => {
  render(<Home />);
  const home = screen.getByTestId("home");
  expect(home).toBeTruthy();
});

test("renders a post if there are searchResults", () => {
  render(<Home />);

  act(() => {
    store.dispatch(postsActions.setSearchResults(fakePosts[0].title));
  });

  const post = screen.getByTestId("post");
  expect(post).toBeTruthy();
});

test('clicking "Edit A Post" button navigates to /edit', () => {
  render(<Home />);
  const editBtn = screen.getByText(/Edit A Post/);
  editBtn.click();
  expect(mockedUsedNavigate).toHaveBeenCalled();
});
