import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./store/store";
import { postsActions } from "./store/posts-slice";
import AutocompleteOptions from "./AutocompleteOptions";

const fakePosts = [
  {
    title: "Title",
    body: "Body Ody Ody Ody Ody Ody Ody Ody Ody Ody Ody Ody",
    id: 1,
    userId: 1,
  },
  { title: "Post", body: "and Toast", id: 2, userId: 1 },
];

test("render AutocompleteOptions", () => {
  store.dispatch(postsActions.setPosts(fakePosts));
  render(
    <Provider store={store}>
      <AutocompleteOptions />
    </Provider>
  );
  const ao = screen.getByTestId("datalist");
  const option = screen.getAllByTestId("option");
  expect(ao).toBeTruthy();
  expect(option.length).toBe(2);
});
