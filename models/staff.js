var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var staffSchema = new Schema({
    name: String,
    post: String,
    image: String
});

module.exports = mongoose.model('Staff', staffSchema);