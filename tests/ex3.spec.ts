import {test, expect} from '@playwright/test';
const ex_to_test = './ex3/ex3.html';

test('ex3_all', async ({page}) => {
    await page.goto(ex_to_test, {waitUntil: "domcontentloaded"});
    await expect(page.locator("select#selectCategory option")).toHaveCount(6);
    await page.locator("select#selectCategory").selectOption({value: 'all'});
    await page.waitForResponse("**/items*"); // wait for the table to be updated
    await expect(page.locator("#itemsList .card")).toHaveCount(12);
    await expect(page.locator("#itemsList .card").first()).toContainText("Apple");
});

test('ex3_fruit', async ({page}) => {
    await page.goto(ex_to_test, {waitUntil: "domcontentloaded"});
    await expect(page.locator("select#selectCategory option")).toHaveCount(6);
    await page.locator("select#selectCategory").selectOption({value: 'Fruit'});
    await page.waitForResponse("**/items*"); // wait for the table to be updated
    await expect(page.locator("#itemsList .card")).toHaveCount(3);
    await expect(page.locator("#itemsList .card").first()).toContainText("Apple");
});

test('ex3_vegetable', async ({page}) => {
    await page.goto(ex_to_test, {waitUntil: "domcontentloaded"});
    await expect(page.locator("select#selectCategory option")).toHaveCount(6);
    await page.locator("select#selectCategory").selectOption({value: 'Vegetable'});
    await page.waitForResponse("**/items*"); // wait for the table to be updated
    await expect(page.locator("#itemsList .card")).toHaveCount(3);
    await expect(page.locator("#itemsList .card").first()).toContainText("Broccoli");
});