'use strict';

const puppeteer = require('puppeteer');

async function startBrowser() {
    let browser;
    try {
        console.log("Opening the browser......");
        browser = await puppeteer.launch({
            headless: true,
            args: ["--disable-setuid-sandbox"],
            'ignoreHTTPSErrors': true
        });
    } catch (err) {
        console.log("Could not create a browser instance => : ", err);
    }
    return browser;
}



//Start the browser and create a browser instance
let browserInstance = startBrowser();

// Pass the browser instance to the scraper controller
scrapeAll(browserInstance)



async function scrapeAll(browserInstance) {
    let browser;
    try {
        browser = await browserInstance;
        await scraperObject.scraper(browser);

    } catch (err) {
        console.log("Could not resolve the browser instance => ", err);
    }
}



const scraperObject = {
    url: 'https://arbetsformedlingen.se/platsbanken/annonser?ot=6YE1_gAC_R2G&q=devops&l=2:CifL_Rzy_Mku',
    async scraper(browser) {
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        // Navigate to the selected page
        await page.goto(this.url);
        let scrapedData = [];
        // Wait for the required DOM to be rendered
        async function scrapeCurrentPage() {
            await page.waitForSelector('.result-container');
            // Get the link to all the required books
            let urls = await page.$$eval('.header-container > h3 > a', links => {
                return links.map(link => link.href);
            });
            console.log(urls);
            // Loop through each of those links, open a new page instance and get the relevant data from them
            let pagePromise = (link) => new Promise(async(resolve, reject) => {
                let dataObj = {};
                let newPage = await browser.newPage();
                await newPage.goto(link);
                await newPage.waitForSelector('.jobb-container');

                // dataObj['jobTitle'] = await newPage.$eval('h1.spacing.break-title', text => text.textContent);
                // dataObj['companyName'] = await newPage.$eval('#pb-company-name', text => text.textContent);
                // dataObj['companyLocation'] = await newPage.$eval('#pb-job-location', text => text.textContent);
                // dataObj['jobDescription'] = await newPage.$eval('.job-description', text => text.textContent);
                // dataObj['jobTerms'] = await newPage.$eval('[translate="section-jobb-main-content.extent"]', text => text.nextElementSibling.textContent);
                // dataObj['jobPublished'] = await newPage.$eval('[translate="section-jobb-about.published"]', text => text.textContent);

                // const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                // const monthsSwedish = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'];

                // const publishedDateSplit = dataObj['jobPublished'].split(' ');
                // const publishedYearSplit = publishedDateSplit[3].split(',');
                // const publishedTimeSplit = publishedDateSplit[5].split('.');

                // monthsSwedish.forEach((element, counter) => {
                //     if (publishedDateSplit[2] == element) {
                //         publishedDateSplit[2] = months[counter];
                //     }
                // });

                // const publishedDate = `${publishedDateSplit[1]} ${publishedDateSplit[2]} ${publishedYearSplit[0]} ${publishedTimeSplit[0]}:${publishedTimeSplit[1]}`;

                // dataObj['jobPublishedDate'] = Date.parse(publishedDate);

                dataObj['jobLink'] = link;

                resolve(dataObj);
                await newPage.close();
            });

            // for (let link = 0; link < urls.length; link++) {
            //     let currentPageData = await pagePromise(urls[link]);
            //     scrapedData.push(currentPageData);
            //     console.log(currentPageData);
            // }

            // scrapedData.sort((element1, element2) => element2.jobPublishedDate - element1.jobPublishedDate)

            // fs.writeFile("data.json", JSON.stringify(scrapedData), (err) => {
            //     if (err)
            //         console.log(err);
            //     else {
            //         console.log("File written successfully\n");
            //     }
            // });

            // When all the data on this page is done, click the next button and start the scraping of the next page
            // You are going to check if this button exist first, so you know if there really is a next page.
            let nextButtonExist = true;
            try {
                const nextButtonExist = await page.$eval('digi-button.digi-navigation-pagination__button.digi-navigation-pagination__button--next.digi-navigation-pagination__button--hidden.sc-digi-navigation-pagination.sc-digi-button-h.sc-digi-button-s.hydrated');
                nextButtonExist = false;

            } catch (err) {
                console.log(err);
                nextButtonExist = true;
            }
            if (nextButtonExist) {

                await page.waitForSelector('.sc-digi-button-h .digi-button--icon-secondary.sc-digi-button');

                await page.click('.sc-digi-button-h .digi-button--icon-secondary.sc-digi-button');

                await page.waitForSelector('.sc-digi-button-h .digi-button--icon-secondary.sc-digi-button');
                await page.waitForSelector('.result-container');


                return scrapeCurrentPage(); // Call this function recursively
            }
            await page.close();
            console.log('scrapedData');
            return scrapedData;
        }
        let data = await scrapeCurrentPage();
        console.log('data');
        return data;
    }
}

startBrowser();

// .digi-navigation-pagination__button--hidden.sc-digi-navigation-pagination
// .digi-navigation-pagination__button.digi-navigation-pagination__button--previous.digi-navigation-pagination__button--hidden.sc-digi-navigation-pagination.sc-digi-button-h.sc-digi-button-s hydrated
// .digi-navigation-pagination__button.digi-navigation-pagination__button--next.digi-navigation-pagination__button--hidden.sc-digi-navigation-pagination.sc-digi-button-h.sc-digi-button-s.hydrated