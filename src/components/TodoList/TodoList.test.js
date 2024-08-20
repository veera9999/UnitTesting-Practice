import TodoList from "./TodoList";
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

// TODO: Mock the fetch API, and do reset and clean up
beforeEach(() => {
  globalThis.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          { id: 1, title: "delectus aut autem", completed: false },
          {
            id: 2,
            title: "quis ut nam facilis et officia qui",
            completed: false,
          },
        ]),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

// TODO: Test component to render correctly with the fetched data
test("renders fetched todos on mount", async () => {
  render(<TodoList />);
  await waitFor(() =>
    expect(screen.getByText(/delectus aut autem/i)).toBeInTheDocument()
  );
  expect(
    screen.getByText(/quis ut nam facilis et officia qui/i)
  ).toBeInTheDocument();
});

// TODO: Test component to handle API fetch failure and display error message
test("handles API fetch failure", async () => {
  globalThis.fetch.mockImplementationOnce(() =>
    Promise.reject(new Error("Failed to fetch todos"))
  );
  render(<TodoList />);
  await waitFor(() =>
    expect(
      screen.getByText(/Error: Failed to fetch todos/i)
    ).toBeInTheDocument()
  );
});

// TODO: Test adding a new todo
test("adds a new todo item", async () => {
  render(<TodoList />);
  await waitFor(() =>
    expect(screen.getByText(/delectus aut autem/i)).toBeInTheDocument()
  );
  const input = screen.getByPlaceholderText("Enter todo");
  const button = screen.getByText("Add Todo");

  await userEvent.type(input, "New Todo");
  await userEvent.click(button);

  await waitFor(() => expect(screen.getByText("New Todo")).toBeInTheDocument());
});

// TODO: Test removing a todo
test("removes a todo item", async () => {
  render(<TodoList />);
  await waitFor(() =>
    expect(screen.getByText(/delectus aut autem/i)).toBeInTheDocument()
  );
  const removeButtons = screen.getAllByText("Remove");
  await userEvent.click(removeButtons[0]);
  await waitFor(() =>
    expect(screen.queryByText(/delectus aut autem/)).not.toBeInTheDocument()
  );
});
