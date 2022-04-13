const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']
    });
  const page = await browser.newPage();

  page.setDefaultTimeout(1000 * 60 * 60 * 24)

  page.waitForSelector()

  // view football matches live
  await page.goto('https://www.bet365.com/#/IP/B1');

  // close statistics popup
    try {
        await (await page.waitForSelector('.iip-IntroductoryPopup_Cross')).click();
    } catch (error) {
        console.log(`Error: ${error}`);
    }

    // accept cookies
    try {
        await (await page.waitForSelector('.ccm-CookieConsentPopup_Accept')).click();
    } catch (error) {
        console.log(`Error: ${error}`);
    }

    // list by time
    try {
        await (await page.waitForSelector(".ovm-StatsModeButton")).click();
        await (await page.waitForSelector(".osm-ControlBar-open > div > div > div:nth-child(2)")).click();
        await (await page.waitForSelector(".osm-DropdownContainer > div > div > div > div:nth-child(6)")).click();
    } catch (error) {
        console.log(`Error: ${error}`);
    }

    // all matches
    const allMatches = await page.evaluate(() => {
        const matchesRaw =  document.querySelectorAll('.ovm-FixtureDetailsTwoWay.ovm-FixtureDetailsTwoWay-1');
        const matchesArray = [...matchesRaw];
        const teamsAndTime = matchesArray
            .map( ({outerText}) => ({ outerText }))
            .map(match => match.outerText.split('\n'));
        
        const resultsRaw = document.querySelectorAll(".ovm-StandardScores_StatsPointsWrapper");
        const resultsArray = [...resultsRaw]

        const resultsList = resultsArray
            .map( ({outerText}) => ({outerText}))
            .map(result => result.split('\n'));

        const statistics = matchesArray;
    });

    console.log(allMatches);


})();