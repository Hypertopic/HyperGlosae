/**
 * Playwright scenario to be used with GreenFrame
 */

module.exports = async (page) => {

  await page.goto("", {
    waitUntil: 'domcontentloaded'
  });
  await page.waitForTimeout(10000);
  await page.scrollToEnd();
  await page.waitForNetworkIdle({ concurrency: 2 });
  await page.waitForTimeout(7000);

};

