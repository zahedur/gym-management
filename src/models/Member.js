const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({

    memberId: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
        // validate: {
        //     validator: (value) => {
        //         if (value.length < 3){
        //             return false
        //         }else {
        //             return true
        //         }
        //     },
        //     message: "First name must be 3 characters"
        // }
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



const Member = mongoose.model('Member', DataSchema)
module.exports = Member;
