import { test, expect } from '@playwright/test';

test.describe('GymFlow Smoke Tests', () => {
  test('Root opens the public Discover page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/.*discover/);
    await expect(page.getByRole('heading', { name: 'Discover' })).toBeVisible();
  });

  test('Health check API returns ok status', async ({ request }) => {
    const response = await request.get('/api/health');
    expect(response.ok()).toBeTruthy();
    const json = await response.json();
    expect(json.status).toBe('ok');
    expect(json.app).toBe('GymFlow');
  });
});
