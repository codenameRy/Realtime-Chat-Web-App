const express = require('express')
const router = express.Router();

//Get request to root route
router.get('/', (req, res) => {
    res.send('Server is up and running');
});

module.exports = router;