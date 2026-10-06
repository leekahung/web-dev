import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import usePrefersReducedMotion from "./usePrefersReducedMotion";

/** Stub matchMedia with a reduced-motion setting that can be flipped mid-test. */
function stubReducedMotion(initial: boolean) {
  let matches = initial;
  const listeners = new Set<() => void>();
  vi.stubGlobal("matchMedia", () => ({
    get matches() {
      return matches;
    },
    addEventListener: (_type: string, listener: () => void) =>
      listeners.add(listener),
    removeEventListener: (_type: string, listener: () => void) =>
      listeners.delete(listener),
  }));
  return (value: boolean) => {
    matches = value;
    listeners.forEach((listener) => listener());
  };
}

describe("usePrefersReducedMotion", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("reads the current setting", () => {
    stubReducedMotion(true);
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(true);
  });

  it("updates when the setting changes mid-visit", () => {
    const setReducedMotion = stubReducedMotion(false);
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);

    act(() => setReducedMotion(true));
    expect(result.current).toBe(true);

    act(() => setReducedMotion(false));
    expect(result.current).toBe(false);
  });
});
