const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({

    trainerId: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    createdAt: {
        type: String,
        default: null
    },
    updatedAt: {
        type: String,
        default: null
    }

}, {versionKey: false, autoIndex: true});



const Trainer = mongoose.model('Trainer', DataSchema)
module.exports = Trainer;
