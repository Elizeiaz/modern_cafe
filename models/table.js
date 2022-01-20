var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tableSchema = new Schema({
    number: Number,
    max_person: {type: Number, max: 6}
});

module.exports = mongoose.model('Table', tableSchema);