import { test, expect } from '@playwright/test'

test('Charites Live Preview with mapbox', async ({ page }) => {
  // collect errors on the page
  const pageErrors: Error[] = []
  page.on('pageerror', (exception) => pageErrors.push(exception))

  await page.goto('http://localhost:8888/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(1000)
  const title = await page.title()
  expect(title).toBe('Charites Live Preview')
  expect(pageErrors).toMatchObject([])
})
