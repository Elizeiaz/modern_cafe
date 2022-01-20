var booking = require('../models/booking')

exports.book_table = function (res, req){
    var detail = {
        client_name: req.body.name,
        client_phone: req.body.phone,
        client_email: req.body.email,
        start: new Date(req.body.datetime),
        end: new Date(req.body.datetime).setTime(this.getTime() + (req.body.hours * 60 * 60 * 1000)),
        table: 123
    }
}

