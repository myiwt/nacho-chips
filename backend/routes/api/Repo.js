const express = require('express');
const router = express.Router();

// db models
const Evidence = require('../../models/Evidence');

// @route GET api/repo
// @description get all articles
router.get('/', (req, res) => {
    Evidence.find()
        .then(function(articles){ 
            if(articles == null)
            {
                throw new Error("No Articles found");
                
            }
            const result = { success: 1 , result: articles };
            res.json(result)
        })
        .catch(err => res.status(404).json({ suceess: 0, msg: err.message }));
});

// @route GET api/repo/:article_id
// @description get single article
router.get('/:article_id', (req, res) => {
    Evidence.findById(req.params.article_id)
        .then(function(article){ 
            if(article == null)
            {
                throw new Error("Article does not exist");
            }
            const result = { success: 1 , result: article };
            res.json(result)
        })
        .catch(err => res.status(404).json({ success: 0, msg: err.message }));
});

// @route POST api/repo/create
// @description adds a new article to the database 
// (no verification / no validation)
router.post('/create', (req, res) => {
    Evidence.create(req.body)
      .then(article => res.json({ success: 1, msg: 'Article added successfully' }))
      .catch(err => res.status(400).json({ success: 0, msg: 'Unable to add this Article' }));
});

module.exports = router;
