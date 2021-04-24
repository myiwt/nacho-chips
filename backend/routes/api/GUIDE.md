## A basic JS file must be created e.g. Auth.js

Inside the structure must be as follows:
```
const express = require('express');
const router = express.Router();

//
//
//
//  CODE GOES HERE
// 
//
//

module.exports = router;
```

### Example code for handling api/auth/login route:
```
// @route POST api/auth/login
// @description login
router.get('/login', (req, res) => {
    res.send({
        token: 'test123',
    });
});
```

### A full example:
```
const express = require('express');
const router = express.Router();

// @route POST api/auth/login
// @description login
router.get('/login', (req, res) => {
    res.send({
        token: 'test123',
    });
});

module.exports = router;
```

Guide made with ❤️ by Waldo

Credit Megan for the login request response