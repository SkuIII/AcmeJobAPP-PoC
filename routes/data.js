var express = require('express');
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
    if (typeof req.headers.referer != 'undefined') {

        const data = require('../data.json');
        res.send(data);

    } else {
        res.send('<h1>Unathourized Access</h1>');
    }
});

module.exports = router;