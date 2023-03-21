const { Schema, model } = require('mongoose');

const skillSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    }
});

module.exports = skillSchema;