const mongoose = require('mongoose');

let recordSchema = mongoose.Schema({
    key: {
        type: String
    },
    createdAt: {
        type: Date,
    },
    counts: {
        type: Array,
    },
    value: {
        type: String,
    }
});

export const Record = mongoose.model('records', recordSchema);