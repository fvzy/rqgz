__path = process.cwd()

var express = require('express');
var router = express.Router();

router.get('/docs', (req, res) => {
    res.redirect('https://api.ditzzsenpai.wtf');

})
router.get('/', (req, res) => {
    res.redirect('https://api.ditzzsenpai.wtf');

})



module.exports = router
