var express = require('express');
var router = express.Router();

staff_manager = require('../manager/staff_manager');

router.get('/', staff_manager.all_staffs);

module.exports = router;
