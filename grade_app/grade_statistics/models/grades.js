const mongoose = require('mongoose');

const gradesSchema = new mongoose.Schema({
    date: {
        type: Date,
        trim: true
    },
    module: {
        type: String,
        trim: true
    },
    grade: {
        type: Number,
        trim: true,
        min: 1,
        max: 6
    }
})

module.exports = mongoose.model('Grade', gradesSchema);