// const scraperObject = {
//     url: 'https://arbetsformedlingen.se/platsbanken/annonser?q=devops&l=2:CifL_Rzy_Mku',
//     async scraper(browser) {
//         let page = await browser.newPage();
//         console.log(`Navigating to ${this.url}...`);
//         // Navigate to the selected page
//         await page.goto(this.url);
//         // Wait for the required DOM to be rendered
//         await page.waitForSelector('.result-container');
//         // Get the link to all the required books
//         let urls = await page.$$eval('.header-container > h3 > a', links => {
//             return links.map(link => link.href);
//         });

//         // Loop through each of those links, open a new page instance and get the relevant data from them
//         let pagePromise = (link) => new Promise(async(resolve, reject) => {
//             let dataObj = {};
//             let newPage = await browser.newPage();
//             await newPage.goto(link);
//             await newPage.waitForSelector('.jobb-container');

//             dataObj['jobTitle'] = await newPage.$eval('h1.spacing.break-title', text => text.textContent);
//             dataObj['companyName'] = await newPage.$eval('#pb-company-name', text => text.textContent);
//             dataObj['companyLocation'] = await newPage.$eval('#pb-job-location', text => text.textContent);
//             dataObj['jobDescription'] = await newPage.$eval('.job-description', text => text.textContent);
//             dataObj['jobPublished'] = await newPage.$eval('[translate="section-jobb-about.published"]', text => text.textContent);

//             dataObj['jobTerms'] = await newPage.$eval('[translate="section-jobb-main-content.extent"]', text => text.nextElementSibling.textContent);

//             resolve(dataObj);

//             await newPage.close();
//         });

//         for (link in urls) {
//             let currentPageData = await pagePromise(urls[link]);
//             console.log(currentPageData);
//         }
//     }
// }

const scraperObject = {
    url: 'https://arbetsformedlingen.se/platsbanken/annonser?q=devops&l=2:CifL_Rzy_Mku',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        // Navigate to the selected page
        await page.goto(this.url);
        let scrapedData = [];
        // Wait for the required DOM to be rendered
        async function scrapeCurrentPage(){
            await page.waitForSelector('.result-container');
            // Get the link to all the required books
            let urls = await page.$$eval('.header-container > h3 > a', links => {
                console.log(links.map(link => link.href));
                return links.map(link => link.href);
            });
            // Loop through each of those links, open a new page instance and get the relevant data from them
            let pagePromise = (link) => new Promise(async(resolve, reject) => {
                let dataObj = {};
                let newPage = await browser.newPage();
                await newPage.goto(link);
                await newPage.waitForSelector('.jobb-container');

                dataObj['jobTitle'] = await newPage.$eval('h1.spacing.break-title', text => text.textContent);
                dataObj['companyName'] = await newPage.$eval('#pb-company-name', text => text.textContent);
                dataObj['companyLocation'] = await newPage.$eval('#pb-job-location', text => text.textContent);
                dataObj['jobDescription'] = await newPage.$eval('.job-description', text => text.textContent);
                dataObj['jobPublished'] = await newPage.$eval('[translate="section-jobb-about.published"]', text => text.textContent);
                dataObj['jobTerms'] = await newPage.$eval('[translate="section-jobb-main-content.extent"]', text => text.nextElementSibling.textContent);

                resolve(dataObj);
                await newPage.close();
            });

            for(link in urls){
                let currentPageData = await pagePromise(urls[link]);
                scrapedData.push(currentPageData);
                console.log(currentPageData);
            }

            // When all the data on this page is done, click the next button and start the scraping of the next page
            // You are going to check if this button exist first, so you know if there really is a next page.
            let nextButtonExist = false;
            try{
                // const nextButtonExist = await page.$eval('.digi-button__text.sc-digi-button.sc-digi-button-s > .sc-digi-navigation-pagination', a => a.textContent === 'Nästa');
                nextButtonExist = true;
            }
            catch(err){
                nextButtonExist = false;
            }
            if(nextButtonExist){
                console.log('THIS IS BEFORE THE CLICK');

                await page.click('.digi-button.digi-button--secondary.digi-button--m.digi-button--icon-secondary.sc-digi-button');

                console.log('THIS IS AFTER THE CLICK');

                return scrapeCurrentPage(); // Call this function recursively
            }
            await page.close();
            return scrapedData;
        }
        let data = await scrapeCurrentPage();
        console.log(data);
        return data;
    }
}

module.exports = scraperObject;