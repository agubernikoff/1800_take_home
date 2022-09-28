import { render, screen, act, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";
import { postsActions } from "./store/posts-slice";
import EditForm from "./EditForm";
import Post from "./Post";

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

test("render EditForm", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <EditForm />
      </BrowserRouter>
    </Provider>
  );
  const form = screen.getByTestId("editForm");
  expect(form).toBeTruthy();
});

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

test("calls handleCancel onClick of cancel button", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <EditForm />
      </BrowserRouter>
    </Provider>
  );
  const cancelBtn = screen.getByText(/CANCEL/);
  cancelBtn.click();
  expect(mockedUsedNavigate).toHaveBeenCalled();
});

test("calls nav inside handleSubmit onClick of submit button when title input matches a post's title", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <EditForm />
      </BrowserRouter>
    </Provider>
  );

  const titleInput = screen.getByPlaceholderText(
    /Enter a complete title or choose from the autcomplete list to select a post to edit/
  );

  const submitBtn = screen.getByText(/SUBMIT/);

  act(() => {
    store.dispatch(postsActions.setSearchResults(fakePosts[0].title));
  });

  fireEvent.change(titleInput, {
    target: { value: fakePosts[0].title },
  });

  act(() => {
    submitBtn.click();
  });

  expect(mockedUsedNavigate).toHaveBeenCalled();
});

test("doesn't call nav inside handleSubmit onClick of submit button when title input matches a post's title", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <EditForm />
      </BrowserRouter>
    </Provider>
  );

  const titleInput = screen.getByPlaceholderText(
    /Enter a complete title or choose from the autcomplete list to select a post to edit/
  );

  const submitBtn = screen.getByText(/SUBMIT/);

  act(() => {
    store.dispatch(postsActions.setSearchResults(fakePosts[0].title));
  });

  fireEvent.change(titleInput, {
    target: { value: "" },
  });

  act(() => {
    submitBtn.click();
  });

  expect(mockedUsedNavigate).not.toHaveBeenCalled();
});

test("the input fields act as controlled inputs", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <EditForm />
      </BrowserRouter>
    </Provider>
  );
  const titleInput = screen.getByPlaceholderText(
    /Enter a complete title or choose from the autcomplete list to select a post to edit/
  );
  const bodyInput = screen.getByTestId(/body/);

  fireEvent.change(titleInput, {
    target: { value: "title" },
  });
  fireEvent.change(bodyInput, {
    target: { value: "body" },
  });

  expect(titleInput.value).toBe("title");
  expect(bodyInput.value).toBe("body");
});

test("the edit form should render with blank inputs if there is no clicked post", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <EditForm />
      </BrowserRouter>
    </Provider>
  );
  const titleInput = screen.getByPlaceholderText(
    /Enter a complete title or choose from the autcomplete list to select a post to edit/
  );
  const bodyInput = screen.getByTestId(/body/);

  expect(titleInput.value).toEqual("");
  expect(bodyInput.value).toEqual("");
});

test("if a post is clicked the edit form should render with the post's information", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Post post={fakePosts[0]} />
      </BrowserRouter>
    </Provider>
  );

  const post = screen.getByTestId(/post/);
  const editAPost = post.childNodes[post.childNodes.length - 1];
  act(() => {
    editAPost.click();
  });

  render(
    <Provider store={store}>
      <BrowserRouter>
        <EditForm />
      </BrowserRouter>
    </Provider>
  );
  const titleInput = screen.getByPlaceholderText(
    /Enter a complete title or choose from the autcomplete list to select a post to edit/
  );
  const bodyInput = screen.getByTestId(/body/);

  expect(mockedUsedNavigate).toHaveBeenCalled();
  expect(store.getState().posts.clickedPost).toEqual(fakePosts[0]);
  expect(titleInput.value).toEqual(fakePosts[0].title);
  expect(bodyInput.value).toEqual(fakePosts[0].body);
});
