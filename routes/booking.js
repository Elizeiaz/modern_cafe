var express = require('express');
var router = express.Router();

tables_manager = require('../manager/tables_manager');

router.get('/', tables_manager.all_tables);
router.post('/book', tables_manager.book_post);
router.get('/success', tables_manager.success);

module.exports = router;
