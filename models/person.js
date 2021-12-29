const mongoose = require('mongoose');
const Schema = mongoose.Schema

const P_schema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    favouriteFoods: [String]
});

module.exports = mongoose.model('Person', P_schema);