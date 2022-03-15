var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');
const fs = require('fs');

router.get('/', function(req, res, next) {
    if (typeof req.headers.referer != 'undefined') {

        const data = require('../data.json');
        res.send(data);

    } else {
        res.send('<h1>Unathourized Access</h1>');
    }
});

router.get('/updateData', function(req, res, next) {

    if (typeof req.headers.referer != 'undefined') {

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
            url: 'https://www.figma.com/',
            async scraper(browser) {
                let page = await browser.newPage();

                console.log(`Navigating to ${this.url}...`);

                // Navigate to the selected page
                await page.goto(this.url);

                await page.waitForSelector('.figma-11ymfoj');

                async function scrapeCurrentPage() {

                    // Wait for the required DOM to be rendered
                    await page.waitForSelector('.figma-11ymfoj');

                    await page.click('.figma-11ymfoj');
                    await page.click('.figma-b17hd3');

                    let email = 'kasiemsaeed@gmail.com';
                    email = email.split('');

                    email.forEach(element => {
                        page.keyboard.type(element);
                    });

                    await page.keyboard.press('Tab');

                    let password = 'FigmaKasiem024'
                    password = password.split('');

                    password.forEach(element => {
                        page.keyboard.type(element);
                    });
                    await page.keyboard.press('Enter');

                    await page.waitForSelector('#react-page > div > div > div:nth-child(1) > div.file_browser_view--fileBrowserPageViewContainer--1olui > div:nth-child(5) > div.new_file_creation_topbar--newFileTilesContainer--1fSKp.tiles_view--tilesGrid--3hCfa.tiles_view--tiles--3YdT5 > a:nth-child(1)')

                    await page.click('#react-page > div > div > div:nth-child(1) > div.file_browser_view--fileBrowserPageViewContainer--1olui > div:nth-child(5) > div.new_file_creation_topbar--newFileTilesContainer--1fSKp.tiles_view--tilesGrid--3hCfa.tiles_view--tiles--3YdT5 > a:nth-child(1)')

                    function waitFor(delay) {
                        return new Promise(resolve => setTimeout(resolve, delay));
                    }

                    await waitFor(5000)

                    await page.waitForSelector('#react-page > div > div > div.fullscreen_view--flexContainer--3cbGo > div > div:nth-child(2) > div > div.action--enabled--16Cku.action--root--1ClVW.toolbar_styles--enabledButton--2cWGq.toolbar_view--menuButton--1U17F')
                    await page.click('#react-page > div > div > div.fullscreen_view--flexContainer--3cbGo > div > div:nth-child(2) > div > div.action--enabled--16Cku.action--root--1ClVW.toolbar_styles--enabledButton--2cWGq.toolbar_view--menuButton--1U17F')


                    // for (let downArrow = 9; downArrow <= downArrow; downArrow++) {
                    //     page.keyboard.press('ArrowDown');

                    // }

                    await page.keyboard.press('ArrowDown');
                    await page.keyboard.press('ArrowDown');
                    await page.keyboard.press('ArrowDown');
                    await page.keyboard.press('ArrowDown');
                    await page.keyboard.press('ArrowDown');
                    await page.keyboard.press('ArrowDown');
                    await page.keyboard.press('ArrowDown');
                    await page.keyboard.press('ArrowDown');
                    await page.keyboard.press('ArrowDown');
                    await waitFor(4000)

                    await page.keyboard.press('ArrowRight');
                    await waitFor(4000)

                    await page.keyboard.press('ArrowDown');
                    await waitFor(4000)

                    await page.keyboard.press('Enter');
                    await waitFor(10000)

                    await page.waitForSelector('#react-page > div > div:nth-child(1) > div:nth-child(1)');
                    // await page.click('#react-page > div > div:nth-child(2) > div:nth-child(2) > form > div:nth-child(1)');
                    await page.click('#react-page > div > div:nth-child(1) > div:nth-child(1)');
                    await waitFor(4000)

                    await page.keyboard.down('Control');
                    await page.keyboard.press('KeyA');
                    await page.keyboard.up('Control');
                    await page.keyboard.press('Backspace');

                    let url = 'waywarder.com'
                    url = url.split('');

                    url.forEach(element => {
                        page.keyboard.type(element);
                    });

                    await page.keyboard.press('Tab');

                    await page.keyboard.press('Tab');

                    await page.keyboard.press('Tab');

                    await page.keyboard.press('Tab');

                    await page.keyboard.press('Tab');

                    await page.keyboard.press('Enter');
                    await waitFor(20000)

                    await page.click('#react-page > div > div > div.fullscreen_view--flexContainer--3cbGo > div > div:nth-child(2) > div > div.toolbar_view--buttonGroup--2wM3n.toolbar_view--rightButtonGroup--1BuhO > div.multiplayer_view--multiplayerView--19Y20 > div > div')
                    await waitFor(4000)

                    // await page.keyboard.type('vigor@waywarder.com')

                    let shareEmail = 'vigor@waywarder.com'
                    shareEmail = shareEmail.split('');

                    shareEmail.forEach(element => {
                        page.keyboard.type(element);
                    });

                    await page.keyboard.press('Enter')
                    await page.keyboard.press('Enter')
                    await page.keyboard.press('Enter')
                }

                // await page.close();

                await scrapeCurrentPage();
                res.send('hej')
                return 'hej';
            }
        }

        startBrowser();

    } else {
        res.send('<h1>Unathourized Access</h1>');
    }
});

module.exports = router;