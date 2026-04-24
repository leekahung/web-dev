import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import React from "react";
import ThemeContextProvider from "./ThemeContextProvider";
import useTheme from "@/hooks/useTheme";

function wrapper({ children }: { children: React.ReactNode }) {
  return <ThemeContextProvider>{children}</ThemeContextProvider>;
}

describe("ThemeContextProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
    document.head
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((el) => el.remove());
  });

  it("initializes darkMode=true and adds 'dark' class by default", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.darkMode).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("initializes darkMode=false when localStorage has 'light'", () => {
    localStorage.setItem("theme", "light");

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.darkMode).toBe(false);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("toggleDarkMode flips state and updates localStorage + classList", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.darkMode).toBe(true);

    act(() => {
      result.current.toggleDarkMode();
    });

    expect(result.current.darkMode).toBe(false);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");

    act(() => {
      result.current.toggleDarkMode();
    });

    expect(result.current.darkMode).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("toggleDarkMode updates theme-color meta content", () => {
    const meta = document.createElement("meta");
    meta.setAttribute("name", "theme-color");
    document.head.appendChild(meta);

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(meta.getAttribute("content")).toBe("#1e293b");

    act(() => {
      result.current.toggleDarkMode();
    });

    expect(meta.getAttribute("content")).toBe("#e2e8f0");
  });
});

describe("useTheme", () => {
  it("throws when used outside ThemeContextProvider", () => {
    expect(() => renderHook(() => useTheme())).toThrow(
      "useTheme can only be used within ThemeContextProvider",
    );
  });
});
