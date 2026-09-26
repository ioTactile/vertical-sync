import { test, expect } from '@playwright/test';

test.describe("Page d'accueil", () => {
  test('affiche le titre du site et charge la page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Vertical Sync/);
  });

  test('contient un lien vers la navigation principale', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /Vertical Sync/i })).toBeVisible();
  });
});
