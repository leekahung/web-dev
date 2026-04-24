import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import useTypewriter from "./useTypewriter";

type ChangeHandler = (e: MediaQueryListEvent) => void;

function makeMql(matches: boolean) {
  let currentMatches = matches;
  const listeners: ChangeHandler[] = [];

  const mql = {
    get matches() {
      return currentMatches;
    },
    addEventListener(_: "change", handler: ChangeHandler) {
      listeners.push(handler);
    },
    removeEventListener(_: "change", handler: ChangeHandler) {
      const idx = listeners.indexOf(handler);
      if (idx !== -1) listeners.splice(idx, 1);
    },
    fire(newMatches: boolean) {
      currentMatches = newMatches;
      const event = { matches: newMatches } as MediaQueryListEvent;
      listeners.forEach((h) => h(event));
    },
  };

  return mql;
}

function mockMatchMedia(mql: ReturnType<typeof makeMql>) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: vi.fn().mockReturnValue(mql),
  });
}

describe("useTypewriter", () => {
  let mql: ReturnType<typeof makeMql>;

  beforeEach(() => {
    mql = makeMql(false);
    mockMatchMedia(mql);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("returns the full phrase immediately when prefersReducedMotion is true", () => {
    mql = makeMql(true);
    mockMatchMedia(mql);

    const { result } = renderHook(() => useTypewriter("Hello", 0, 60));

    expect(result.current.text).toBe("Hello");
    expect(result.current.isComplete).toBe(true);
  });

  it("starts empty and advances one character per typingSpeed tick", () => {
    vi.useFakeTimers();

    const { result } = renderHook(() => useTypewriter("Hi", 0, 100));

    expect(result.current.text).toBe("");

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.text).toBe("H");

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.text).toBe("Hi");
    expect(result.current.isComplete).toBe(true);
  });

  it("immediately returns the full phrase when prefersReducedMotion toggles true mid-animation", () => {
    vi.useFakeTimers();

    const { result } = renderHook(() => useTypewriter("Hello", 0, 100));

    expect(result.current.text).toBe("");

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.text).toBe("H");

    act(() => {
      mql.fire(true);
    });

    expect(result.current.text).toBe("Hello");
    expect(result.current.isComplete).toBe(true);
  });

  it("resets text when loopKey changes", () => {
    vi.useFakeTimers();

    let loopKey = 0;
    const { result, rerender } = renderHook(() =>
      useTypewriter("Hi", loopKey, 100),
    );

    act(() => {
      vi.advanceTimersByTime(100);
    });
    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.text).toBe("Hi");

    loopKey = 1;
    rerender();

    expect(result.current.text).toBe("");
    expect(result.current.isComplete).toBe(false);
  });
});
