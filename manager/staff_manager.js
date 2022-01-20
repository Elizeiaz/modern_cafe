var staff = require('../models/staff')

exports.all_staffs = function (req, res, next) {
    staff.find()
        .exec(function (err, staffs) {
            if (err) {
                return next(err);
            }
            res.render('staff', {staffs: staffs});
        })
};