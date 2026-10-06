import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import ThemeContextProvider from "@/providers/ThemeContextProvider";
import Layout from "./Layout";

describe("Layout", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("smooth-scrolls to the top when the logo is clicked", () => {
    // jsdom has no matchMedia; BackgroundBlob reads it on mount
    vi.stubGlobal("matchMedia", () => ({ matches: false }));
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(
      <ThemeContextProvider>
        <Layout>content</Layout>
      </ThemeContextProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Back to top" }));
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
