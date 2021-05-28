const express = require('express');
const router = express.Router();

// db models
const Evidence = require('../../models/Evidence');

// @route POST api/repo
// @description search for articles using multiple queries
router.post('/', (req, res) => {
    console.log(req.body);

    const body = req.body;
    if (body.method != null && body.method != "") {
        console.log(body.method);
        //res.status(200).json({success: 1});

        /*
        Example query - all parameters are optional except method
        {
        "method": "query",
        "yearStart": "2010",
        "yearEnd": "2020",
        "software_dev_practice": "TDD",
        "claim": "codeQuality",
        "claim_strength": "mostlyAgree",
        "author": "",
        "title": "",
        "doi": ""
        }
        */
        if (body.method == "query") {
            var query = {}; 
            if (body.claim != null) {
                query.claim = { $regex: body.claim, $options: 'i'};
            }
            if (body.claim_strength != null) {
                query.claim_strength = { $regex: body.claim_strength, $options: 'i'};
            }
            if (body.software_dev_practice != null) {
                query.software_dev_practice = { $regex: body.software_dev_practice, $options: 'i'};
            }
            
            // making sure only approved articles are retrieved
            query.status = { $regex: "approved", $options: 'i'};

            // TODO: yearStart & yearEnd

            console.log(query);

            Evidence.find(query)
            .then(function(articles) {
                if (articles == null || articles.length == 0)
                {
                    throw new Error("No Articles found");
                }
                const result = { success: 1, length: articles.length, result: articles };
                res.json(result);
                return;
            })
            .catch(err => res.status(404).json({ success: 0, msg: err.message }));
        }

        if (body.method == "checkSubmission") 
        {
            const query = {}; 
            if(body.id != null)
            {
                query._id = { $eq: body.id};
                query.status = { $regex: "pending", $options: 'i'};                
            }

            Evidence.findOne(query)
            .then(function(article){ 
                if(article == null || article.length == 0)
                {
                    throw new Error("Article does not exist");
                }
                const result = { success: 1 , result: article };
                res.json(result)
            })
            .catch(err => res.status(404).json({ success: 0, msg: err.message }));
        }

        if (body.method == "approveSubmission") {
            const query = {};
            const status_update = { status: "approved" };

            if(body.id != null)
            {
                query._id = { $eq: body.id};
                query.status = { $regex: "pending", $options: 'i'};                
            }

            Evidence.findOneAndUpdate(query, status_update, {
                new: true,
                useFindAndModify: false,
            })
            .then(function(article){ 
                if(article == null || article.length == 0)
                {
                    throw new Error("Article does not exist");
                }
                const result = { success: 1 , result: article };
                res.json(result)
            })
            .catch(err => res.status(404).json({ success: 0, msg: err.message }));
        }

        if (body.method == "declineSubmission") {
            const query = {};
            const status_update = { status: "declined" };

            if(body.id != null)
            {
                query._id = { $eq: body.id};
                query.status = { $regex: "pending", $options: 'i'};                
            }

            Evidence.findOneAndUpdate(query, status_update, {
                new: true,
                useFindAndModify: false,
            })
            .then(function(article){ 
                if(article == null || article.length == 0)
                {
                    throw new Error("Article does not exist");
                }
                const result = { success: 1 , result: article };
                res.json(result)
            })
            .catch(err => res.status(404).json({ success: 0, msg: err.message }));
        }

    } else {
        res.status(404).json({success: 0, msg: "No method set!"});
    }    
});

// @route GET api/repo
// @description get all articles
router.get('/', (req, res) => {
    Evidence.find({status: { $regex: "approved", $options: 'i'}})
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

router.get('/claim_strength/:search', (req, res) => {
    const query = { "claim_strength" : { $regex: req.params.search, $options: 'i'} };

    Evidence.find(query)
        .then(function(articles) {
            if (articles == null || articles.length == 0)
            {
                throw new Error("No Articles found");
            }
            const result = { success: 1, result: articles };
            res.json(result)
        })
        .catch(err => res.status(404).json({ success: 0, msg: err.message }));
});

router.get('/claim/:search', (req, res) => {
    const query = { "claim" : { $regex: req.params.search, $options: 'i'} };

    Evidence.find(query)
        .then(function(articles) {
            if (articles == null || articles.length == 0)
            {
                throw new Error("No Articles found");
            }
            const result = { success: 1, result: articles };
            res.json(result)
        })
        .catch(err => res.status(404).json({ success: 0, msg: err.message }));
})

module.exports = router;
