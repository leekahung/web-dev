import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import usePrefersReducedMotion from "./usePrefersReducedMotion";

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

describe("usePrefersReducedMotion", () => {
  let originalMatchMedia: typeof window.matchMedia;

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: originalMatchMedia,
    });
  });

  it("returns true when matchMedia.matches is true on mount", () => {
    const mql = makeMql(true);
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: vi.fn().mockReturnValue(mql),
    });

    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(true);
  });

  it("returns false when matchMedia.matches is false on mount", () => {
    const mql = makeMql(false);
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: vi.fn().mockReturnValue(mql),
    });

    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(false);
  });

  it("updates when the change event fires on the MediaQueryList", () => {
    const mql = makeMql(false);
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: vi.fn().mockReturnValue(mql),
    });

    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(false);

    act(() => {
      mql.fire(true);
    });

    expect(result.current).toBe(true);
  });
});
