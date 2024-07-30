/**
 * Pupeteer scenario to be used with GreenFrame
 *
 * Note: page.goto default settings are {waitUntil: "load", timeout: 3000}
 */

module.exports = async (page) => {

    await page.addMilestone('Bookshelf');
    await page.goto("");
    await page.waitForSelector('.work');

    await page.addMilestone('Text with a translation side-by-side');
    await page.goto("37b4b9ba5cdb11ed887beb5c373fa643#09c906c6732b11ed89466ba197585f87", {
      waitUntil: 'networkidle0'
    });

    await page.addMilestone('Text with comments side-by-side');
    await page.goto("05b61f5285c711ed97bf6b9b56808c45#6327c5008d1f11ed9aa8e7ae771dee2e", {
      waitUntil: 'networkidle0'
    });

    await page.addMilestone('Picture stored in the backend');
    await page.goto("146e6e8442f0405b721b79357d00f497", {
      waitUntil: 'networkidle0'
    });
};

