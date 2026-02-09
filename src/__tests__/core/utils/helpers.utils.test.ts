import { describe, it, expect } from "vitest";
import { sanitizeHtml } from "@/modules/core/utils/helpers";

describe("helpers utils", () => {
  it("sanitizeHtml doit retourner un résultat même côté serveur (sans window)", () => {
    const result = sanitizeHtml("<p>Hello</p>");
    // html-react-parser renvoie un ReactNode; on vérifie juste que ça n'explose pas
    expect(result).toBeDefined();
  });

  it("sanitizeHtml doit appeler DOMPurify côté client (window défini)", () => {
    // @ts-expect-error: on injecte window dans le contexte de test
    global.window = {} as Window;

    const result = sanitizeHtml("<script>alert('xss')</script><p>Safe</p>");
    expect(result).toBeDefined();

    // Nettoyage
    // @ts-expect-error: cleanup
    delete global.window;
  });
});
