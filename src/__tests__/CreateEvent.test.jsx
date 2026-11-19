
import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateEvent from "../pages/CreateEvent";

describe("Create Event page", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ id: "3" }),
        })
      )
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("renders all event form fields", () => {
    render(<CreateEvent />);

    expect(screen.getByLabelText(/event title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/event date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/venue/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/organizer/i)).toBeInTheDocument();
  });

  test("does not submit when fields contain only spaces", async () => {
    const user = userEvent.setup();
    render(<CreateEvent />);

    await user.type(screen.getByLabelText(/event title/i), "   ");
    await user.type(screen.getByLabelText(/description/i), "Test event");
    await user.type(screen.getByLabelText(/category/i), "Technology");
    await user.type(screen.getByLabelText(/event date/i), "2026-12-20");
    await user.type(screen.getByLabelText(/venue/i), "Main Hall");
    await user.type(screen.getByLabelText(/organizer/i), "Coding Club");

    await user.click(screen.getByRole("button", { name: /create event/i }));

    expect(
      await screen.findByText("Please fill in all fields.")
    ).toBeInTheDocument();

    expect(fetch).not.toHaveBeenCalled();
  });

  test("does not submit an event with a past date", async () => {
    const user = userEvent.setup();
    render(<CreateEvent />);

    await user.type(screen.getByLabelText(/event title/i), "Test Event");
    await user.type(screen.getByLabelText(/description/i), "Test description");
    await user.type(screen.getByLabelText(/category/i), "Technology");
    await user.type(screen.getByLabelText(/event date/i), "2020-01-01");
    await user.type(screen.getByLabelText(/venue/i), "Main Hall");
    await user.type(screen.getByLabelText(/organizer/i), "Coding Club");

    await user.click(screen.getByRole("button", { name: /create event/i }));

    expect(
      await screen.findByText("Event date cannot be in the past.")
    ).toBeInTheDocument();

    expect(fetch).not.toHaveBeenCalled();
  });

  test("submits a valid event successfully", async () => {
    const user = userEvent.setup();
    render(<CreateEvent />);

    await user.type(screen.getByLabelText(/event title/i), "Tech Meetup");
    await user.type(screen.getByLabelText(/description/i), "A student tech meetup");
    await user.type(screen.getByLabelText(/category/i), "Technology");
    await user.type(screen.getByLabelText(/event date/i), "2026-12-20");
    await user.type(screen.getByLabelText(/venue/i), "Main Hall");
    await user.type(screen.getByLabelText(/organizer/i), "Coding Club");

    await user.click(screen.getByRole("button", { name: /create event/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:5000/events",
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
      );
    });

    expect(
      await screen.findByText("Your event has been created successfully!")
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/event title/i)).toHaveValue("");
  });

  test("displays an error when the server request fails", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    const user = userEvent.setup();
    render(<CreateEvent />);

    await user.type(screen.getByLabelText(/event title/i), "Tech Meetup");
    await user.type(screen.getByLabelText(/description/i), "A student tech meetup");
    await user.type(screen.getByLabelText(/category/i), "Technology");
    await user.type(screen.getByLabelText(/event date/i), "2026-12-20");
    await user.type(screen.getByLabelText(/venue/i), "Main Hall");
    await user.type(screen.getByLabelText(/organizer/i), "Coding Club");

    await user.click(screen.getByRole("button", { name: /create event/i }));

    expect(await screen.findByText("Network error")).toBeInTheDocument();
  });
});
