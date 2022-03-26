const UserModel = require('../models/UserModel');
const jwt = require("jsonwebtoken");

exports.Login = (req, res) => {
    let reqBody = req.body;
    let UserName = reqBody['UserName']
    let Password = reqBody['Password']

    let projection = {Password: 0}

    UserModel.find({ UserName: UserName, Password: Password }, projection, (err, data) => {
        if (err){
            res.status(200).json({status: "fail", message: 'Unauthorized'})
        }

        if (data.length > 0){

            let payload = {
                exp: Math.floor(Date.now() / 1000) + (24*60*60),
                data: data[0]
            }

            let token = jwt.sign(payload, 'secretkey16874497')
            res.status(200).json({status: "success", token: token, data: data})
        }else{
            res.status(200).json({status: "fail", message: 'Unauthorized'});
        }
    })


}

exports.Register = (req, res) => {
    let reqBody = req.body;
    UserModel.create(reqBody, (err, data) => {
        if (err){
            res.status(400).json({ status: 'fail', data: err })
        }else{
            res.status(201).json({ status: 'success', data: data })
        }
    })
}

exports.Logout = (req, res) => {
    res.status(200).json({status: 'success', message: 'Logout Success'})
}
