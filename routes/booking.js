var express = require('express');
var router = express.Router();

tables_manager = require('../manager/tables_manager');

router.get('/', tables_manager.all_tables);

module.exports = router;
