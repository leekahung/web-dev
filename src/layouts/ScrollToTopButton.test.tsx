import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import ScrollToTopButton from "./ScrollToTopButton";

const root = document.documentElement;

/** Fake the page's scroll geometry; jsdom has no layout. */
function setScroll(
  scrollTop: number,
  scrollHeight: number,
  clientHeight = 900,
) {
  Object.defineProperty(root, "scrollTop", {
    value: scrollTop,
    configurable: true,
  });
  Object.defineProperty(root, "scrollHeight", {
    value: scrollHeight,
    configurable: true,
  });
  Object.defineProperty(root, "clientHeight", {
    value: clientHeight,
    configurable: true,
  });
}

function progressValue() {
  return screen.getByRole("progressbar").getAttribute("aria-valuenow");
}

describe("ScrollToTopButton progress bar", () => {
  afterEach(() => {
    for (const prop of ["scrollTop", "scrollHeight", "clientHeight"]) {
      Reflect.deleteProperty(root, prop);
    }
  });

  it("sets aria-valuenow on mount and on scroll", () => {
    setScroll(0, 2980);
    render(<ScrollToTopButton />);
    expect(progressValue()).toBe("0");

    setScroll(1000, 2980);
    fireEvent.scroll(window);
    expect(progressValue()).toBe("50");
  });

  it("caps progress at 100 past the end of the page", () => {
    setScroll(2080, 2980);
    render(<ScrollToTopButton />);
    expect(progressValue()).toBe("100");
  });

  it("clamps negative overscroll to 0", () => {
    setScroll(-40, 2980);
    render(<ScrollToTopButton />);
    expect(progressValue()).toBe("0");
  });

  it("reports full progress when the page is too short to scroll", () => {
    setScroll(0, 900);
    render(<ScrollToTopButton />);
    expect(progressValue()).toBe("100");
  });
});
