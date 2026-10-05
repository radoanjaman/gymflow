import { test, expect } from '@playwright/test';

test.describe('Exercise Library Explorer Flows', () => {
  test('Exercise catalog is available without an account', async ({ page }) => {
    await page.goto('/exercises');
    await expect(page.getByRole('heading', { name: 'Complete Exercise Library' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Create Custom Exercise' })).toHaveCount(0);
  });
});
