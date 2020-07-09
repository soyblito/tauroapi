const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: String,
    pass: String,
    level: Number,
    state: Number, 
});

const model = mongoose.model('User', mySchema);
module.exports = model;