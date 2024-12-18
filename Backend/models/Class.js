const mongoose = require('mongoose');


const ClassSchema = new mongoose.Schema({
    promo: {
        type: String,
        required: true
    },
    prof: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eleves: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }
    ]
});

const Class = mongoose.model('Class', ClassSchema);

module.exports = Class;