import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ThemeContextProvider from "@/providers/ThemeContextProvider";
import Intro from "./Intro";

describe("Intro", () => {
  it("exposes the full typing phrase to screen readers, not the animated text", () => {
    render(
      <ThemeContextProvider>
        <Intro />
      </ThemeContextProvider>,
    );

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "I build production-ready React apps, open-source civic-tech tools, and accessible, data-heavy UIs",
      }),
    ).toBeTruthy();
  });
});
