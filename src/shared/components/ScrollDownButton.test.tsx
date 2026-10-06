import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import ScrollDownButton from "./ScrollDownButton";

describe("ScrollDownButton", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    Element.prototype.scrollIntoView = vi.fn();
  });

  it("renders the label and aria-label", () => {
    render(
      <ScrollDownButton
        targetId="projects"
        label="Projects"
        ariaLabel="Scroll to projects"
        reveal={{}}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Scroll to projects" }),
    ).toBeTruthy();
    expect(screen.getByText("Projects")).toBeTruthy();
  });

  it("scrolls the target element into view on click", () => {
    const target = document.createElement("div");
    target.id = "projects";
    document.body.appendChild(target);

    render(
      <ScrollDownButton
        targetId="projects"
        label="Projects"
        ariaLabel="Scroll to projects"
        reveal={{}}
      />,
    );

    fireEvent.click(screen.getByRole("button"));

    expect(target.scrollIntoView).toHaveBeenCalled();
  });

  it("does not throw when the target element is missing", () => {
    render(
      <ScrollDownButton
        targetId="missing"
        label="Projects"
        ariaLabel="Scroll to projects"
        reveal={{}}
      />,
    );

    expect(() => fireEvent.click(screen.getByRole("button"))).not.toThrow();
  });
});
