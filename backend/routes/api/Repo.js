const express = require('express');
const router = express.Router();

// need Evidence model

// @route GET api/repo
// @description get all articles
router.get('/', (req, res) => {
    res.send({
        token: '{}',
    });
});

// @route GET api/repo/:article_id
// @description get single article
router.get('/:article_id', (req, res) => {
    res.send({
        token: req.params.article_id,
    });

    // Evidence find by ID here.
});

module.exports = router;
