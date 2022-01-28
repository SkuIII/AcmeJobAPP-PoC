var express = require('express');
const { startBrowser } = require('../scraping/browser');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    if (typeof req.headers.referer != 'undefined') {

        const data = require('../data.json');
        res.send(data);

    } else {
        res.send('<h1>Unathourized Access</h1>');
    }
});

router.get('/data', function(req, res, next) {
    startBrowser();
    res.send('hej')
});

module.exports = router;