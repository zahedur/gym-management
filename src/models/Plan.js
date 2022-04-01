const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({

    month: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: String,
        default: null
    },
    updatedAt: {
        type: String,
        default: null
    }

}, {versionKey: false});



const Plan = mongoose.model('Plan', DataSchema)
module.exports = Plan;
