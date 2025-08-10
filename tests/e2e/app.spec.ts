// tests/e2e/app.spec.ts
import { test, expect } from '@playwright/test';

// Este test es solo un paso inicial para validar que la configuración de Playwright funciona.
// No se está implementando aún el flow completo E2E por falta de tiempo.

test('simple test - carga la app y muestra texto base', async ({ page }) => {
  await page.goto('http://localhost:5174');

  // Por ejemplo, espera que el título o un texto clave esté visible en la página
  await expect(page.locator('text=Currency Converter')).toBeVisible();
});
