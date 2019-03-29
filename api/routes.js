const express       = require('express');
const router        = express.Router();
const exempleRoute   = require('./routes/route.exemple');

router.use('/document', exempleRoute);

module.exports = router;
