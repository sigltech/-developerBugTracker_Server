const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: String,
    name: String,
    description: String,
    steps: String,
    version: String,
    assigned: String,
    creator: String,
    priority: String,
    time: String,
});

const model = mongoose.model('Ticket', schema);

module.exports = model;
