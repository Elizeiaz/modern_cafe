var table = require('../models/table')

exports.all_tables = function (req, res, next) {
    table.find()
        .exec(function (err, tables) {
            if (err) {
                return next(err);
            }
            res.render('booking', {tables: tables});
        })
};