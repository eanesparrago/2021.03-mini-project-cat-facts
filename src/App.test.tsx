import {
  render,
  screen,
  waitForElementToBeRemoved,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";

import App from "./App";

const server = setupServer(
  rest.get("https://cat-fact.herokuapp.com/facts/random", (req, res, ctx) => {
    return res(ctx.json({ text: "Cat fact" })); // Have to pass the data object!
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("fetch and display random cat fact on mount", async () => {
  render(<App />);

  expect(await screen.findByText("Cat fact")).toBeInTheDocument();
});

test("refetch click fetches and displays new cat fact", async () => {
  render(<App />);

  const refetchButton = await screen.findByTestId("refetch-cat-fact-button");
  act(() => {
    userEvent.click(refetchButton);
  });

  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();
  await waitForElementToBeRemoved(loading);

  expect(await screen.findByText("Cat fact")).toBeInTheDocument();
});
