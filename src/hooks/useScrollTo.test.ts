import { renderHook } from "@testing-library/react";
import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import { animate } from "motion/react";
import useScrollTo from "./useScrollTo";

vi.mock("motion/react", async (importOriginal) => ({
  ...(await importOriginal<typeof import("motion/react")>()),
  animate: vi.fn(),
}));

const animateMock = vi.mocked(animate);

function stubReducedMotion(matches: boolean) {
  vi.stubGlobal("matchMedia", () => ({
    matches,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
}

/** An element whose top sits `top` px below the viewport, with a scroll margin. */
function elementAt(top: number, scrollMarginTop = "0px") {
  const el = document.createElement("div");
  el.getBoundingClientRect = () => ({ top }) as DOMRect;
  vi.spyOn(window, "getComputedStyle").mockReturnValue({
    scrollMarginTop,
  } as CSSStyleDeclaration);
  return el;
}

describe("useScrollTo", () => {
  let stops: ReturnType<typeof vi.fn>[];

  beforeEach(() => {
    stops = [];
    animateMock.mockImplementation((() => {
      const stop = vi.fn();
      stops.push(stop);
      return { stop };
    }) as unknown as typeof animate);
    // 3000px page in jsdom's 768px-tall window, so the furthest scroll is 2232
    Object.defineProperty(document.documentElement, "scrollHeight", {
      configurable: true,
      value: 3000,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    animateMock.mockReset();
  });

  it("uses native scrolling when reduced motion is off", () => {
    stubReducedMotion(false);
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    const el = document.createElement("div");
    el.scrollIntoView = vi.fn();
    const { result } = renderHook(() => useScrollTo());

    result.current(0);
    result.current(el);

    expect(scrollTo).toHaveBeenCalledWith({ top: 0 });
    expect(el.scrollIntoView).toHaveBeenCalled();
    expect(animateMock).not.toHaveBeenCalled();
  });

  it("animates to the element, minus its scroll margin, when reduced motion is on", () => {
    stubReducedMotion(true);
    const { result } = renderHook(() => useScrollTo());

    result.current(elementAt(500, "80px"));

    expect(animateMock).toHaveBeenCalledWith(
      0,
      420,
      expect.objectContaining({ duration: 0.9, ease: [0.3, 0, 0.2, 1] }),
    );
  });

  it("clamps the animation to the scrollable range", () => {
    stubReducedMotion(true);
    const { result } = renderHook(() => useScrollTo());

    result.current(elementAt(5000));
    result.current(-100);

    expect(animateMock.mock.calls[0][1]).toBe(2232);
    expect(animateMock.mock.calls[1][1]).toBe(0);
  });

  it.each(["wheel", "touchstart", "keydown", "pointerdown"])(
    "stops when the user interacts mid-scroll (%s)",
    (type) => {
      stubReducedMotion(true);
      const { result } = renderHook(() => useScrollTo());

      result.current(0);
      window.dispatchEvent(new Event(type));
      window.dispatchEvent(new Event(type));

      // The second event finds no listener left behind
      expect(stops[0]).toHaveBeenCalledTimes(1);
    },
  );

  it("stops a running scroll when a new one starts", () => {
    stubReducedMotion(true);
    const { result } = renderHook(() => useScrollTo());

    result.current(0);
    result.current(100);

    expect(stops[0]).toHaveBeenCalledTimes(1);
    expect(stops[1]).not.toHaveBeenCalled();
  });

  it("removes its listeners once the scroll completes", () => {
    stubReducedMotion(true);
    const { result } = renderHook(() => useScrollTo());

    result.current(0);
    const options = animateMock.mock.calls[0][2] as { onComplete: () => void };
    options.onComplete();
    window.dispatchEvent(new Event("wheel"));

    expect(stops[0]).not.toHaveBeenCalled();
  });
});
