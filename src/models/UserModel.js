const mongoose = require('mongoose');


const DataSchema = mongoose.Schema({

    FirstName:      { type: String },
    LastName:       { type: String },
    Email:          { type: String },
    Mobile:         { type: String },
    City:           { type: String },
    UserName:       { type: String, unique: true },
    Password:       { type: String }

}, {versionKey: false, autoIndex: true});



const UserModel = mongoose.model('User', DataSchema)
module.exports = UserModel;
