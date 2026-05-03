import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import useTypewriter from "./useTypewriter";

describe("useTypewriter", () => {
  afterEach(() => {
    vi.useRealTimers();
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
