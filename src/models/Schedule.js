const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({

    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        required: true,
    },
    dayOfWeek: {
        type: [String],
        required: true,
        default: []
    },
    dateFrom: {
        type: Date,
        required: true
    },
    dateTo: {
        type: Date,
        required: true
    },
    timeFrom: {
        type: String,
        required: true
    },
    timeTo: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 1
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



const Schedule = mongoose.model('Schedule', DataSchema)
module.exports = Schedule;
