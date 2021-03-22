import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";

import App from "./App";

const server = setupServer(
  rest.get("https://cat-fact.herokuapp.com/facts/random", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: { text: "Cat fact" } }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("fetch and display random cat fact on mount", async () => {
  render(<App />);

  const loading = screen.getByText(/loading/i);
  await waitForElementToBeRemoved(loading);
});
