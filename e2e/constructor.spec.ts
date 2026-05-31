import { test, expect } from '@playwright/test';

const API_URL = '*://new-stellarburgers.education-services.ru/api';

test.describe('Страница Конструктор', () => {
  test.beforeEach(async ({ page, context }) => {
    await page.routeFromHAR('e2e/har/api.har', {
      url: `${API_URL}/**`,
      update: false,
    });

    await context.addCookies([
      {
        name: 'accessToken',
        value: 'mock-access-token',
        domain: 'localhost',
        path: '/',
      },
    ]);

    await page.addInitScript(() => {
      window.localStorage.setItem('refreshToken', 'mock-refresh-token');
    });

    await page.goto('/');
  });

  test('Полный путь пользователя -> сборка бургера, просмотр ингредиента и оформление заказа', async ({ page }) => {
    const modal = page.locator('#modals > div').first();
    const constructorSection = page.locator('section[class*="burger_constructor"]');

    const bunIngredient = page.getByText('Краторная булка N-200i').first();
    const sauceIngredient = page.getByText('Соус с шипами Антарианского плоскоходца').first();

    const bunTarget = page.getByText('Пожалуйста, перенесите сюда булку').first();
    const sauceTarget = page.getByText('Здесь расположите начинки и соусы').first();

    await bunIngredient.click();

    await expect(modal).toBeVisible();
    await expect(modal.getByText('Детали ингредиента')).toBeVisible();
    await expect(modal.getByText('Краторная булка N-200i')).toBeVisible();
    await expect(modal.getByText('420')).toBeVisible();

    await modal.locator('button').first().click();
    await expect(modal).not.toBeVisible();

    await bunIngredient.dragTo(bunTarget);
    await sauceIngredient.dragTo(sauceTarget);

    await expect(constructorSection.getByText('Краторная булка N-200i (верх)')).toBeVisible();
    await expect(constructorSection.getByText('Соус с шипами Антарианского плоскоходца')).toBeVisible();

    await page.getByRole('button', { name: /оформить заказ/i }).click();

    await expect(modal).toBeVisible();
    await expect(modal.getByText('Детали заказа')).toBeVisible();

    await modal.locator('button').first().click();
    await expect(modal).not.toBeVisible();
  });
});
