var table = require('../models/table')
var booking = require('../models/booking')

class Booked {
    constructor(table_id, start, end) {
        this.table_id = table_id;
        this.start = start;
        this.end = end;
    }

}

exports.all_tables = function (req, res, next) {
    table.find()
        .exec(function (err, tables) {
            if (err) {
                return next(err);
            }
            booking.find()
                .exec(function (err, bookings) {
                    if (err) {
                        return next(err);
                    }

                    res.render('booking', {tables: tables, bookings: bookings});
                })
        })
};

exports.book_post = function (req, res, next) {
    var startDateTime = new Date(req.body.datetime);
    var endDateTime = new Date(startDateTime);

    endDateTime.setHours(Number(endDateTime.getHours().toString()) + Number(req.body.hours))

    booking_create(
        req.body.name, req.body.phone, req.body.email,
        startDateTime, endDateTime, req.body.tables
    )

    res.render('success');
};

exports.success = function (req, res, next) {
}

function booked_tables(date) {
    return 1
    var booked = [];
    for (var book in booking) {
        if (book.start <= date && date <= book.end) {
            booked.push(date.table_id);
        }
    }

}

function booking_create(client_name, client_phone, client_email, start, end, table_id) {
    var detail = {
        client_name: client_name,
        client_phone: client_phone,
        client_email: client_email,
        start: start,
        end: end,
        table_id: table_id
    }

    var newBooking = new booking(detail);

    newBooking.save();
}