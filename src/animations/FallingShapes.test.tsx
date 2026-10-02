import { render, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import FallingShapes from "./FallingShapes";

type ResizeCallback = (entries: { contentRect: DOMRectReadOnly }[]) => void;

let observerCallback: ResizeCallback;

class MockResizeObserver {
  constructor(cb: ResizeCallback) {
    observerCallback = cb;
  }
  observe() {}
  disconnect() {}
}

/** Fire the observed ResizeObserver with a given container width. */
function fireResize(width: number) {
  act(() => {
    observerCallback([
      { contentRect: { width, height: 500 } as DOMRectReadOnly },
    ]);
  });
}

function renderShapes() {
  return render(<FallingShapes />);
}

describe("FallingShapes", () => {
  beforeEach(() => {
    vi.stubGlobal("ResizeObserver", MockResizeObserver);
  });

  it("renders the minimum of 8 shapes before any resize", () => {
    const { container } = renderShapes();
    expect(container.querySelectorAll(".border-2").length).toBe(8);
  });

  it("scales shape count to one per 100px of width", () => {
    const { container } = renderShapes();
    fireResize(1200);
    expect(container.querySelectorAll(".border-2").length).toBe(12);
  });

  it("never drops below the 8-shape floor for narrow containers", () => {
    const { container } = renderShapes();
    fireResize(300);
    expect(container.querySelectorAll(".border-2").length).toBe(8);
  });
});
