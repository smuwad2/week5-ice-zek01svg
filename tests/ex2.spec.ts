import {test, expect} from '@playwright/test';
const ex_to_test = './ex2/info.html';
test('ex2_limit1_customer', async ({page}) => {
    await page.goto(ex_to_test, {waitUntil: "domcontentloaded"});
    await page.locator("#limit").fill("1");
    await page.locator("select#type").selectOption({value: 'customers'});
    await page.waitForResponse("**/data*"); // wait for the table to be updated
    await expect(page.locator("#result>h2")).toHaveText("customers");
    const table = page.locator("#result>table tbody")
    const rowCount = await table.locator('tr').count();
    expect(rowCount).toBe(2)
    const cell = table.locator('tr:nth-child(2) td:nth-child(1)');
    expect(cell).toHaveText("Jack", {timeout: 2000});
});

test('ex2_limit3_customer', async ({page}) => {
    await page.goto(ex_to_test, {waitUntil: "domcontentloaded"});
    await page.locator("#limit").fill("3");
    await page.locator("select#type").selectOption({value: 'customers'});
    await page.waitForResponse("**/data*"); // wait for the table to be updated
    await expect(page.locator("#result>h2")).toHaveText("customers");
    const table = page.locator("#result>table tbody")
    const rowCount = await table.locator('tr').count();
    expect(rowCount).toBe(4)
    const cell1 = table.locator('tr:nth-child(2) td:nth-child(1)');
    await expect(cell1).toHaveText('Jack', {timeout: 2000});
    const cell2 = table.locator('tr:nth-child(3) td:nth-child(1)');
    await expect(cell2).toHaveText("Mary", {timeout: 2000});
});

test('ex2_limit3_product', async ({page}) => {
    await page.goto(ex_to_test, {waitUntil: "domcontentloaded"});
    await page.locator("#limit").fill("3");
    await page.locator("select#type").selectOption({value: 'products'});
    await page.waitForResponse("**/data*"); // wait for the table to be updated    
    await expect(page.locator("#result>h2")).toHaveText("products");
    const table = page.locator("#result>table tbody")
    const rowCount = await table.locator('tr').count();
    expect(rowCount).toBe(4)
    const cell1 = table.locator('tr:nth-child(2) td:nth-child(1)');
    await expect(cell1).toHaveText("iPhone", {timeout: 2000});
    const cell2 = table.locator('tr:nth-child(3) td:nth-child(1)');
    await expect(cell2).toHaveText("Samsung", {timeout: 2000});
});
