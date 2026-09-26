import { describe, it, expect } from "vitest";
import { buildArticleSlug } from "@/modules/core/utils/string";

describe("buildArticleSlug", () => {
  it("normalise accents et espaces", () => {
    const slug = buildArticleSlug("Été à l'Escalade !");
    expect(slug).toMatch(/^ete-a-l-escalade-\d+$/);
  });

  it("fallback si titre vide après nettoyage", () => {
    const slug = buildArticleSlug("!!!");
    expect(slug).toMatch(/^article-\d+$/);
  });
});
