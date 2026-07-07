import { cn, formatSpecs, slugify } from "@/lib/utils";
import { describe, it, expect } from "vitest";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("handles tailwind conflicts", () => {
    expect(cn("px-4", "px-6")).toBe("px-6");
  });

  it("handles empty inputs", () => {
    expect(cn()).toBe("");
  });
});

describe("slugify", () => {
  it("converts text to slug", () => {
    expect(slugify("NVIDIA H100 GPU")).toBe("nvidia-h100-gpu");
  });

  it("handles special characters", () => {
    expect(slugify("Hello World! @#$")).toBe("hello-world-");
  });
});

describe("formatSpecs", () => {
  it("formats memory specs", () => {
    expect(formatSpecs("80GB", "HBM3")).toBe("80GB HBM3");
  });

  it("handles empty first arg", () => {
    expect(formatSpecs("", "HBM3")).toBe("—");
  });
});
