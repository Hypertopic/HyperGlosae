async (page) => {
    // Go to the url passed to the command line (see below)
    await page.waitForTimeout(1000);
    await page.goto("/02ee00d85cdb11ed834c4fb9e3c972af", {waitUntil: "domcontentloaded"});
    await page.waitForTimeout(1000);
    await page.scrollToEnd();
    await page.waitForTimeout(1000);
    await page.goto("/4745d83eabc111edb4d7a3e38e32ff69", {waitUntil: "domcontentloaded"});
    await page.waitForTimeout(1000);
    await page.scrollToEnd();
    await page.waitForTimeout(1000);
};