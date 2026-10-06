import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NavButton from "./NavButton";

function openMenu() {
  const toggle = screen.getByRole("button", { name: "Navigation menu" });
  fireEvent.click(toggle);
  expect(toggle.getAttribute("aria-expanded")).toBe("true");
  return toggle;
}

describe("NavButton", () => {
  it("closes the menu on Escape", () => {
    render(<NavButton />);
    const toggle = openMenu();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(toggle.getAttribute("aria-expanded")).toBe("false");
  });

  it("returns focus to the toggle when Escape closes the menu", () => {
    render(<NavButton />);
    const toggle = openMenu();
    screen.getByRole("button", { name: "Projects" }).focus();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(document.activeElement).toBe(toggle);
  });

  it("closes the menu on a click outside the nav", () => {
    render(<NavButton />);
    const toggle = openMenu();

    fireEvent.pointerDown(document.body);

    expect(toggle.getAttribute("aria-expanded")).toBe("false");
  });

  it("closes the menu as soon as a section is chosen", () => {
    render(<NavButton />);
    const toggle = openMenu();

    fireEvent.click(screen.getByRole("button", { name: "Projects" }));

    expect(toggle.getAttribute("aria-expanded")).toBe("false");
  });

  it("returns focus to the toggle after a section is chosen", () => {
    render(<NavButton />);
    const toggle = openMenu();

    fireEvent.click(screen.getByRole("button", { name: "Projects" }));

    expect(document.activeElement).toBe(toggle);
  });

  it("stays open on a click inside the nav", () => {
    render(<NavButton />);
    const toggle = openMenu();

    fireEvent.pointerDown(screen.getByRole("button", { name: "Projects" }));

    expect(toggle.getAttribute("aria-expanded")).toBe("true");
  });
});
