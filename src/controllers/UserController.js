const UserModel = require('../models/UserModel')

exports.User = (req, res) => {
    let UserName = req.headers['username'];
    let projection = {Password: 0}

    UserModel.find({ UserName: UserName}, projection, (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err })
        }else{
            res.status(200).json({ status: "success", data: data })
        }
    })
}

exports.UpdateUser = (req, res) => {
    let UserName = req.headers['username'];

    let reqBody = req.body;
    //return res.status(400).json(reqBody)
    UserModel.updateOne({ UserName: UserName}, {$set: reqBody}, {upsert: true}, (err, data) => {
        if (err){
            res.status(400).json({ status: 'fail', data: err })
        }else{
            res.status(201).json({
                status: 'success',
                message: 'Update Success',
                data: data
            })
        }
    })
}
