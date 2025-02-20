/**
 * Playwright scenario to be used with GreenFrame
 */

module.exports = async (page) => {

  await page.goto("", {
    waitUntil: 'networkidle0'
  });
  await page.waitForTimeout(10000);
  await page.scrollToEnd();
  await page.waitForNetworkIdle();
  await page.waitForTimeout(7000);

};

