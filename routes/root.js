const express = require('express');
const router = express();
const path = require('path');

router.get('^/$|/index.(html)?', (req, res) => {
    res.sendFile(path.join(__dirname, "../View", "index.html"));
});



router.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "../View", "404.html"));
});

module.exports = router;