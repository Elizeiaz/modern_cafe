var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bookingSchema = new Schema({
    client_name: String,
    client_phone: String,
    client_email: String,
    start: Date,
    end: Date,
    table: { type: Schema.Types.ObjectId, ref: 'Table'}
});

module.exports = mongoose.model('Booking', bookingSchema);