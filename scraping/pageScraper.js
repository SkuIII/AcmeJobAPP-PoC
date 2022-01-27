let arrayAllData = [];

const scraperObject = {
    url: 'https://arbetsformedlingen.se/platsbanken/annonser?q=devops&l=2:CifL_Rzy_Mku',
    async scraper(browser) {
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        // Navigate to the selected page
        await page.goto(this.url);
        // Wait for the required DOM to be rendered
        await page.waitForSelector('.result-container');
        // Get the link to all the required books
        let urls = await page.$$eval('.header-container > h3 > a', links => {
            return links.map(link => link.href);
        });

        // console.log(urls);

        // Loop through each of those links, open a new page instance and get the relevant data from them
        let pagePromise = (link) => new Promise(async(resolve, reject) => {
            let dataObj = {};
            let newPage = await browser.newPage();
            await newPage.goto(link);
            await newPage.waitForSelector('.jobb-container');

            dataObj['jobTitle'] = await newPage.$eval('h1.spacing.break-title', text => text.textContent);
            dataObj['companyName'] = await newPage.$eval('#pb-company-name', text => text.textContent);
            dataObj['companyName'] = await newPage.$eval('#pb-company-name', text => text.textContent);
            dataObj['companyLocation'] = await newPage.$eval('#pb-job-location', text => text.textContent);
            //dataObj['jobDescription'] = await newPage.$eval('.job-description', text => text.textContent);
            dataObj['jobPublished'] = await newPage.$eval('[translate="section-jobb-about.published"]', text => text.textContent);

            // KOM TILLBAKA TILL DETTA SENARE!!!!!
            // let test = await page.$eval('.extra-info-section', el => el);
            // console.log(test);
            // dataObj['jobPublished'] = await page.$eval('.extra-info-section', el => el.textContent)
            //
            //dataObj['jobAdress'] = await newPage.$eval('.postal-code-heading', text => text.textContent);
            // dataObj['jobTerms'] = await newPage.$eval('.pre-wrap', text => text.textContent);

            resolve(dataObj);

            await newPage.close();
        });

        for (link in urls) {
            let currentPageData = await pagePromise(urls[link]);
            // scrapedData.push(currentPageData);
            console.log(currentPageData);
            arrayAllData.push(currentPageData);
        }
    }
}

module.exports = scraperObject;