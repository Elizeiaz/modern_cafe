#! /usr/bin/env node

var userArgs = process.argv.slice(2);

var async = require('async')
var Table = require('./models/table')
var Staff = require('./models/staff')
var Booking = require('./models/booking')


var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://admin:admin@cafe.hjatw.mongodb.net/test\n';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var tables = []
var staffs = []
var bookings = []

function tableCreate(table_id, max_person, cb) {
    var detail = {
        id: table_id,
        max_person: max_person
    }

    var newTable = new Table(detail);

    newTable.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Table: ' + newTable);
        tables.push(newTable)
        cb(null, newTable)
    });
}

function staffCreate(name, post, image, cb) {
    var detail = {
        name: name,
        post: post,
        image: image
    }

    var newStaff = new Staff(detail);

    newStaff.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New staff: ' + newStaff);
        staffs.push(newStaff)
        cb(null, newStaff)
    });
}

function bookingCreate(client_name, client_phone, client_email, start, end, table_id, cb) {
    var detail = {
        client_name: client_name,
        client_phone: client_phone,
        client_email: client_email,
        start: new Date("2021-01-18T16:00"),
        end: new Date("2021-01-18T19:30"),
        table_id: table_id
    }

    var newBooking = new Booking(detail);

    newBooking.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New booking: ' + newBooking);
        bookings.push(newBooking)
        cb(null, newBooking)
    });
}


function createTables(cb) {
    async.series([
            function (callback) {
                tableCreate(1, 6, callback);
            },
            function (callback) {
                tableCreate(2, 2, callback);
            },
            function (callback) {
                tableCreate(3, 2, callback);
            },
            function (callback) {
                tableCreate(4, 4, callback);
            }
        ],
        cb);
}


function createStaffs(cb) {
    async.series([
            function (callback) {
                staffCreate('So6aka', 'dogs lover', 'https://klopik.com/uploads/posts/2015-08/1441022602_fun_anim-28.jpg', callback);
            },
            function (callback) {
                staffCreate('mr.coffee', 'barista', 'https://www.abc.net.au/news/image/8272598-3x2-940x627.jpg', callback);
            },
            function (callback) {
                staffCreate('owner', 'owner', 'https://it88.ru/wp-content/uploads/2016/07/%D1%81%D0%B8%D1%81%D0%B0%D0%B4%D0%BC%D0%B8%D0%BD.jpg', callback);
            },
        ],
        cb);
}


function createBookings(cb) {
    async.series([
            function (callback) {
                bookingCreate(
                    'customer#1', '89126066400', 'customer@gmail.com',
                    null, null, tables[2].id, callback
                )
            },
        ],
        cb);
}


async.series([
        createTables,
        createStaffs,
        createBookings
    ],
// Optional callback
    function (err, results) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        }
        // All done, disconnect from database
        mongoose.connection.close();
    });



