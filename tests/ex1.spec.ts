import {test, expect} from '@playwright/test';
const ex_to_test = './ex1/search.html';
test('ex1_a', async ({page}) => {
    await page.goto(ex_to_test, {waitUntil: "domcontentloaded"});
    await page.locator("input#nameInput").focus();
    await page.keyboard.press("a")
    await page.waitForResponse("**/suggest*"); // wait for the suggestions to be updated
    //await page.waitForTimeout(1000);
    await expect(page.locator("#suggestions")).toHaveText("Anna, Amanda");
});

test('ex1_b', async ({page}) => {
    await page.goto(ex_to_test, {waitUntil: "domcontentloaded"});
    await page.locator("input#nameInput").focus();
    await page.keyboard.press("b")
    await page.waitForResponse("**/suggest*"); // wait for the suggestions to be updated
    //await page.waitForTimeout(1000);
    await expect(page.locator("#suggestions")).toHaveText("Brittany");
});

// test('ex1_v', async ({page}) => {
//     await page.goto(ex_to_test, {waitUntil: "domcontentloaded"});
//     await page.locator("input#nameInput").focus();
//     await page.keyboard.press("v")
//     await page.waitForResponse("**/suggest*"); // wait for the suggestions to be updated
//     await expect(page.locator("#suggestions")).toHaveText("Violet, Vicky");
// });