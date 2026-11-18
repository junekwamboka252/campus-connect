import { describe, test, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Events from "../pages/Events";

const mockEvents = [
  { id: 1, title: "Hackathon", date: "2026-12-01", venue: "Lab 1", category: "Tech", organizer: "CS Club" },
  { id: 2, title: "Football Finals", date: "2026-12-05", venue: "Main Field", category: "Sports", organizer: "Sports Dept" },
];

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve(mockEvents) })
  ));
});

const setup = () =>
  render(
    <MemoryRouter>
      <Events />
    </MemoryRouter>
  );

describe("Events page", () => {
  test("renders events from the API", async () => {
    setup();
    expect(await screen.findByText("Hackathon")).toBeInTheDocument();
    expect(screen.getByText("Football Finals")).toBeInTheDocument();
  });

  test("search filters events by title", async () => {
    setup();
    await screen.findByText("Hackathon");
    await userEvent.type(screen.getByLabelText(/search events/i), "hack");
    expect(screen.getByText("Hackathon")).toBeInTheDocument();
    expect(screen.queryByText("Football Finals")).not.toBeInTheDocument();
  });

  test("category button filters events", async () => {
    setup();
    await screen.findByText("Hackathon");
    await userEvent.click(screen.getByRole("button", { name: "Sports" }));
    await waitFor(() =>
      expect(screen.queryByText("Hackathon")).not.toBeInTheDocument()
    );
    expect(screen.getByText("Football Finals")).toBeInTheDocument();
  });
});