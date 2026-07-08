import { test, expect } from '@playwright/test'

test.describe('ClariForm', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('homepage loads with ClariForm title', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('ClariForm')
  })

  test('language switcher changes language', async ({ page }) => {
    const switcher = page.locator('select[aria-label="Select language"]')
    await expect(switcher).toBeVisible()
    
    await switcher.selectOption('ar')
    await expect(page.locator('h1')).toContainText('ClariForm')
  })

  test('form selector is visible', async ({ page }) => {
    const selector = page.locator('#form-select')
    await expect(selector).toBeVisible()
  })

  test('can select a form', async ({ page }) => {
    const selector = page.locator('#form-select')
    await selector.selectOption('individual-profile')
    await expect(page.getByRole('heading', { name: 'Individual Profile' })).toBeVisible()
  })

  test('form fields render after selection', async ({ page }) => {
    const selector = page.locator('#form-select')
    await selector.selectOption('individual-profile')
    
    await expect(page.getByLabel('Full Name (English)')).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Emirates ID*' })).toBeVisible()
  })

  test('can fill in form fields', async ({ page }) => {
    const selector = page.locator('#form-select')
    await selector.selectOption('individual-profile')
    
    const nameInput = page.locator('#full-name-en')
    await nameInput.fill('John Smith')
    await expect(nameInput).toHaveValue('John Smith')
  })

  test('footer shows privacy message', async ({ page }) => {
    await expect(page.locator('footer')).toContainText('Your data stays in your browser')
  })
})
