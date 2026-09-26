export const getCapitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getIdFromSlug = (slug: string) => {
  return slug.split("-").pop()!;
};

/** Génère un slug unique pour un article à partir du titre. */
export function buildArticleSlug(title: string): string {
  const base = title
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${base || "article"}-${Date.now()}`;
}
