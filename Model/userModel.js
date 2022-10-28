const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: { type: String, unique: true },
    password: String,
    role: String,
});

const model = mongoose.model('User', schema);

module.exports = model;
