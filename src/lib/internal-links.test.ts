import { describe, expect, it } from "vitest";
import {
  buildRouteRegistry,
  checkInternalLinks,
  formatIssue,
  validateInternalPath,
} from "./internal-links";

/**
 * Build-time guarantee: no blog post may contain a link to a URL that does not
 * exist on the live site. Runs automatically via `npm run prebuild` (and on
 * `npm test`). When this fails, read the printed list: each entry says which
 * post/file, which section & block, the broken link, and the closest live
 * replacements. Update the link to the current real URL — never ship broken
 * links.
 */
describe("internal link integrity", () => {
  it("every internal link in every blog post resolves to a live page", () => {
    const issues = checkInternalLinks();

    const summary = issues.length
      ? `\n${issues.map((issue, i) => `${i + 1}. ${formatIssue(issue)}`).join("\n\n")}\n`
      : "";

    expect(
      summary,
      `Broken internal links found. Replace each one with its current live URL (or remove the link).`,
    ).toEqual("");
  });

  it("rejects old/renamed blog slugs (the guard actually works)", () => {
    const registry = buildRouteRegistry();

    // These URLs were once real posts, then slugs changed. They must FAIL
    // validation so anyone re-adding them gets a build error, not a 404.
    const deadSlugs = [
      "/blog/ai-chip-market-trends-2026",
      "/blog/mi300x-vs-h100-buyer-guide",
      "/blog/ai-inference-architecture-guide-2026",
      "/blog/nvidia-blackwell-architecture-explained",
      "/blog/cuda-vs-rocm-2026-comparison",
      "/blog/gpu-cooling-requirements-ai-clusters",
    ];
    for (const slug of deadSlugs) {
      expect(
        validateInternalPath(slug, registry).ok,
        `${slug} must not resolve`,
      ).toBe(false);
    }

    // Their current successors must resolve.
    const liveSlugs = [
      "/blog/ai-chip-market-trends-2026-nvidia-amd-intel",
      "/blog/nvidia-h100-vs-amd-mi300x",
      "/blog/how-many-gpus-for-llm-training",
      "/blog/nvidia-b300-tensor-core-gpu-overview",
      "/blog/rocm-vs-cuda-amd-nvidia-ai-stack-2026",
    ];
    for (const slug of liveSlugs) {
      expect(
        validateInternalPath(slug, registry).ok,
        `${slug} must resolve`,
      ).toBe(true);
    }
  });

  it("validates the main route families and image files", () => {
    const registry = buildRouteRegistry();

    const valid = [
      "/",
      "/blog",
      "/blog/amd-instinct-mi350x-gpu",
      "/products/amd-instinct-mi350x",
      "/categories/amd-instinct-accelerators",
      "/brands/nvidia",
      "/solutions/ai-infrastructure",
      "/images/products/amd-mi350x.webp",
      "/ae/blog/how-many-gpus-for-llm-training",
      "/rfq",
      "/comparison",
      "/contact",
    ];
    for (const url of valid) {
      const r = validateInternalPath(url, registry);
      expect(
        r.ok,
        `${url} should be valid — ${r.ok ? "" : (r as { reason: string }).reason}`,
      ).toBe(true);
    }

    const invalid = [
      "/products/no-such-product",
      "/categories/no-such-category",
      "/brands/no-such-brand",
      "/solutions/no-such-solution",
      "/blog/someone-else-entirely",
      "/images/products/missing-file.webp",
      "/totally/unknown/page",
      "/blog/nvidia-grace-blackwell-superchip", // draft, not published
    ];
    for (const url of invalid) {
      const r = validateInternalPath(url, registry);
      expect(r.ok, `${url} must be rejected`).toBe(false);
    }
  });
});
