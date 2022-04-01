const User = require('../models/User');
const jwt = require("jsonwebtoken");
const validations = require('../helpers/validations');
const bcrypt = require("bcrypt");

exports.Login = (req, res) => {
    let reqBody = req.body;

    const formData = {
        username:           reqBody['username'] || '',
        password:           reqBody['password'] || '',
    }

    // Validation
    const validation = validations.loginValidation(formData);
    if (Object.keys(validation).length){
        return res.status(422).json({ status: 'fail', message: 'Validation Error', error: validation })
    }

    User.findOne( { username: formData.username }, (err, data) => {
        if (err){
            return res.status(401).json({status: "fail", message: 'Incorrect Credentials'})
        }else {

            if (data !== null) {
                if (! bcrypt.compareSync(formData.password, data.password)) {
                    return res.status(401).json({status: "fail", message: 'Incorrect Credentials'})
                } else {
                    let userData = data;
                    userData.password = undefined;

                    let payload = {
                        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
                        data: userData
                    }
                    let token = jwt.sign(payload, process.env.JWT_SECRET);

                    return res.status(200).json({status: "success", token: token, data: userData});
                }
            } else {
                res.status(401).json({status: "fail", message: 'Incorrect Credentials'});
            }
        }
    })

}

exports.Register = (req, res) => {
    let reqBody = req.body;

    const formData = {
        firstName:         reqBody['firstName'] || '',
        lastName:          reqBody['lastName'] || '',
        email:              reqBody['email'] || '',
        username:           reqBody['username'] || '',
        password:           reqBody['password'] || '',
        confirmPassword:   reqBody['confirmPassword'] || '',
        role:               reqBody['role'] || ''
    }

    // Validation
    const validation = validations.registerValidation(formData);
    if (Object.keys(validation).length){
        return res.status(422).json({ status: 'fail', message: 'Validation Error', error: validation })
    }

    // Make hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(formData.confirmPassword, salt);

    const data = {
        firstName: formData.firstName,
        lastName:  formData.lastName,
        email:      formData.email,
        username:   formData.username,
        password:   hashedPassword,
        role:       formData.role,
    }

    User.create(data, (err, data) => {
        if (err){
            res.status(400).json({ status: 'fail', error: err })
        }else{
            res.status(201).json({ status: 'success', message: 'Account created successfully' })
        }
    })
}
