const Trainer = require('../models/Trainer');
const validations = require("../helpers/validations");
const moment = require('moment-timezone');

exports.Index = (req, res) => {

    Trainer.find({}, (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", error: err })
        }else{
            res.status(200).json({ status: "success", data: { trainers: data } })
        }
    })
}

exports.Create = (req, res) => {
    let reqBody = req.body;

    const formData = {
        trainerId: reqBody['trainerId'] || '',
        firstName: reqBody['firstName'] || '',
        lastName: reqBody['lastName'] || '',
        middleName: reqBody['middleName'] || '',
        email: reqBody['email'] || '',
        mobile: reqBody['mobile'] || '',
        gender: reqBody['gender'] || '',
        address: reqBody['address'] || '',
        createdAt: moment.tz(process.env.TIME_ZONE).format()
    }

    const validation = validations.trainerCreateValidation(formData);
    if (Object.keys(validation).length){
        return res.status(422).json({ status: 'fail', message: 'Validation Error', error: validation })
    }else {

        // Check exist email
        Trainer.findOne({email: formData.email}, (err, existEmail) => {
            if (err) {
                return res.status(400).json({status: 'fail', message: err})
            }else {

                if (existEmail !== null) {
                    return res.status(422).json({
                        status: 'fail',
                        message: 'Validation Error',
                        error: {email: "The email has already been taken."}
                    })
                } else {
                    // Check exist trainer ID
                    Trainer.findOne({trainerId: formData.trainerId}, (err, ExistTrainerId) => {
                        if (err) {
                            return res.status(400).json({status: 'fail', message: err})
                        } else {

                            if (ExistTrainerId !== null) {
                                return res.status(422).json({
                                    status: 'fail',
                                    message: 'Validation Error',
                                    error: {username: "Trainer ID has already been taken."}
                                })
                            } else {

                                // Check exist mobile
                                Trainer.findOne({mobile: formData.mobile}, (err, ExistMobile) => {
                                    if (err) {
                                        return res.status(400).json({status: 'fail', message: err})
                                    } else {

                                        if (ExistMobile !== null) {
                                            return res.status(422).json({
                                                status: 'fail',
                                                message: 'Validation Error',
                                                error: {username: "Mobile has already been taken."}
                                            })
                                        } else {

                                            // Create Trainer
                                            Trainer.create(formData, (err, data) => {
                                                if (err) {
                                                    res.status(400).json({status: 'fail', error: err})
                                                } else {
                                                    res.status(201).json({
                                                        status: 'success',
                                                        message: 'Trainer created successfully',
                                                        data: {trainer: data}
                                                    })
                                                }
                                            })


                                        }
                                    }
                                })

                            }
                        }
                    })
                }
            }
        })
    }
}

exports.Edit = (req, res) => {
    const id =  req.body['id'] || '';

    if (!id){
        return res.status(422).json({ status: 'fail', message: 'Validation Error', error: {id: "id is required"} })
    }else{
        Trainer.findOne({_id: id}, (err, idExist) =>{
            if (err){
                return res.status(400).json({ status: 'fail', message: err })
            }else{
                if (idExist === null){
                    return res.status(400).json({ status: 'fail', message: 'Invalid id' })
                }else{
                    // find trainer
                    Trainer.findOne({_id: id}, (err, data) => {
                        if (err) {
                            return res.status(400).json({status: 'fail', message: err})
                        }else {
                            return res.status(200).json({status: 'success', data: { trainer: data }})
                        }
                    })
                }
            }
        });
    }
}

exports.Update = (req, res) => {
    let reqBody = req.body;

    const formData = {
        trainerId:  reqBody['trainerId'] || '',
        firstName:  reqBody['firstName'] || '',
        lastName:   reqBody['lastName'] || '',
        middleName: reqBody['middleName'] || '',
        email:      reqBody['email'] || '',
        mobile:     reqBody['mobile'] || '',
        gender:     reqBody['gender'] || '',
        address:    reqBody['address'] || '',
        id:         reqBody['id'] || '',
        updatedAt:  moment.tz(process.env.TIME_ZONE).format()
    }

    const validation = validations.trainerUpdateValidation(formData);
    if (Object.keys(validation).length){
        return res.status(422).json({ status: 'fail', message: 'Validation Error', error: validation })
    }else {

        // Id is exist
        Trainer.findOne({_id: formData.id}, (err, existId) => {
            if (err){
                return res.status(400).json({ status: 'fail', message: err })
            }else{
                if (existId === null){
                    return res.status(400).json({ status: 'fail', message: 'Invalid id' })
                }else{

                    // Check exist email
                    Trainer.findOne({email: formData.email, _id: {$ne: formData.id}}, (err, existEmail) => {
                        if (err) {
                            return res.status(400).json({status: 'fail', message: err})
                        }else {

                            if (existEmail !== null) {
                                return res.status(422).json({
                                    status: 'fail',
                                    message: 'Validation Error',
                                    error: {email: "The email has already been taken."}
                                })
                            } else {
                                // Check exist trainer ID
                                Trainer.findOne({trainerId: formData.trainerId, _id: {$ne: formData.id}}, (err, ExistTrainerId) => {
                                    if (err) {
                                        return res.status(400).json({status: 'fail', message: err})
                                    } else {

                                        if (ExistTrainerId !== null) {
                                            return res.status(422).json({
                                                status: 'fail',
                                                message: 'Validation Error',
                                                error: {username: "Trainer ID has already been taken."}
                                            })
                                        } else {

                                            // Check exist mobile
                                            Trainer.findOne({mobile: formData.mobile, _id: {$ne: formData.id}}, (err, ExistMobile) => {
                                                if (err) {
                                                    return res.status(400).json({status: 'fail', message: err})
                                                } else {

                                                    if (ExistMobile !== null) {
                                                        return res.status(422).json({
                                                            status: 'fail',
                                                            message: 'Validation Error',
                                                            error: {username: "Mobile has already been taken."}
                                                        })
                                                    } else {

                                                        // Update trainer
                                                        Trainer.updateOne({_id: formData.id}, formData, {insert: true}, (err, data) => {
                                                            if (err) {
                                                                res.status(400).json({status: 'fail', error: err})
                                                            } else {
                                                                Trainer.findOne({_id: formData.id}, (err, updated) => {
                                                                    if (err){
                                                                        res.status(400).json({
                                                                            status: 'fail',
                                                                            message: err,
                                                                        })
                                                                    }else {
                                                                        res.status(200).json({
                                                                            status: 'success',
                                                                            message: 'Trainer updated successfully',
                                                                            data: {trainer: updated}
                                                                        })
                                                                    }
                                                                });
                                                            }
                                                        })
                                                    }
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    }
}

exports.Delete = (req, res) => {
    let reqBody = req.body;

    let id = reqBody['id'];

    if (!id){
        return res.status(422).json({ status: 'fail', message: 'Validation Error', error: { id: "id is required"} })
    }else{
        Trainer.findOne( {_id: id }, (err, findData) => {
            if (err){
                return res.status(400).json({status: 'fail', message: err})
            }else {
                if (findData !== null) {
                    Trainer.remove({_id: id}, (err, data) => {
                        if (err) {
                            return res.status(400).json({status: 'fail', message: err})
                        } else {
                            return res.status(200).json({status: 'success', message: 'Trainer deleted successfully'})
                        }
                    });
                }else{
                    return res.status(400).json({status: 'fail', message: "Invalid id"})
                }
            }
        });
    }
}

exports.View = (req, res) => {
    const id =  req.body['id'] || '';

    if (!id){
        return res.status(422).json({ status: 'fail', message: 'Validation Error', error: {id: "id is required"} })
    }else{
        Trainer.findOne({_id: id}, (err, idExist) =>{
            if (err){
                return res.status(400).json({ status: 'fail', message: err })
            }else{
                if (idExist === null){
                    return res.status(400).json({ status: 'fail', message: 'Invalid id' })
                }else{
                    // find trainer
                    Trainer.findOne({_id: id}, (err, data) => {
                        if (err) {
                            return res.status(400).json({status: 'fail', message: err})
                        }else {
                            return res.status(200).json({status: 'success', data: { trainer: data }})
                        }
                    })
                }
            }
        });
    }
}
