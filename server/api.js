const express = require('express');
const newsRouter = require('./news/index.js');
const router = express.Router();

module.exports = router;

router.use('/news', newsRouter);
