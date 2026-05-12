/**
 * Playwright scenario to be used with GreenFrame
 */

module.exports = async (page) => {

  await page.goto("37b4b9ba5cdb11ed887beb5c373fa643#09c906c6732b11ed89466ba197585f87", {
    waitUntil: 'load'
  });
  await page.waitForTimeout(10000);
  await page.scrollToEnd();
  await page.waitForNetworkIdle({ concurrency: 2 });
  await page.waitForTimeout(7000);

};

