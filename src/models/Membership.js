const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({

    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        required: true,
    },
    planId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan",
        required: true
    },
    packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package",
        required: true
    },
    trainerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trainer",
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: Number,
        required: true,
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



const Membership = mongoose.model('Membership', DataSchema)
module.exports = Membership;
