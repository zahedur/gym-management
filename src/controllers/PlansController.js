const Plan = require('../models/Plan');
const validations = require("../helpers/validations");
const moment = require('moment-timezone');

exports.Index = (req, res) => {

    Plan.find({}, (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", error: err })
        }else{
            res.status(200).json({ status: "success", data: { plans: data } })
        }
    })
}

exports.Create = (req, res) => {
    let reqBody = req.body;

    const formData = {
        month: reqBody['month'] || '',
        amount: reqBody['amount'] || '',
        createdAt: moment.tz(process.env.TIME_ZONE).format()
    }

    const validation = validations.planCreateValidation(formData);
    if (Object.keys(validation).length){
        return res.status(422).json({ status: 'fail', message: 'Validation Error', error: validation })
    }else {

        // Create Package
        Plan.create(formData, (err, data) => {
            if (err) {
                res.status(400).json({status: 'fail', error: err})
            } else {
                res.status(201).json({
                    status: 'success',
                    message: 'Plan created successfully',
                    data: {plan: data}
                })
            }
        })
    }
}

exports.Edit = (req, res) => {
    const id =  req.body['id'] || '';

    if (!id){
        return res.status(422).json({ status: 'fail', message: 'Validation Error', error: {id: "id is required"} })
    }else{
        Plan.findOne({_id: id}, (err, idExist) =>{
            if (err){
                return res.status(400).json({ status: 'fail', message: err })
            }else{
                if (idExist === null){
                    return res.status(400).json({ status: 'fail', message: 'Invalid id' })
                }else{
                    // find trainer
                    Plan.findOne({_id: id}, (err, data) => {
                        if (err) {
                            return res.status(400).json({status: 'fail', message: err})
                        }else {
                            return res.status(200).json({status: 'success', data: { plan: data }})
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
        month: reqBody['month'] || '',
        amount: reqBody['amount'] || '',
        id: reqBody['id'] || '',
        updatedAt:  moment.tz(process.env.TIME_ZONE).format()
    }

    const validation = validations.planUpdateValidation(formData);
    if (Object.keys(validation).length){
        return res.status(422).json({ status: 'fail', message: 'Validation Error', error: validation })
    }else {

        // Id is exist
        Plan.findOne({_id: formData.id}, (err, existId) => {
            if (err){
                return res.status(400).json({ status: 'fail', message: err })
            }else{
                if (existId === null){
                    return res.status(400).json({ status: 'fail', message: 'Invalid id' })
                }else{

                    // Update package
                    Plan.updateOne({_id: formData.id}, formData, {insert: true}, (err, data) => {
                        if (err) {
                            res.status(400).json({status: 'fail', error: err})
                        } else {
                            Plan.findOne({_id: formData.id}, (err, updated) => {
                                if (err){
                                    res.status(400).json({
                                        status: 'fail',
                                        message: err,
                                    })
                                }else {
                                    res.status(200).json({
                                        status: 'success',
                                        message: 'Plan updated successfully',
                                        data: {plan: updated}
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

exports.Delete = (req, res) => {
    let reqBody = req.body;

    let id = reqBody['id'];

    if (!id){
        return res.status(422).json({ status: 'fail', message: 'Validation Error', error: { id: "id is required"} })
    }else{
        Plan.findOne( {_id: id }, (err, findData) => {
            if (err){
                return res.status(400).json({status: 'fail', message: err})
            }else {
                if (findData !== null) {
                    Plan.remove({_id: id}, (err, data) => {
                        if (err) {
                            return res.status(400).json({status: 'fail', message: err})
                        } else {
                            return res.status(200).json({status: 'success', message: 'Plan deleted successfully'})
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
        Plan.findOne({_id: id}, (err, idExist) =>{
            if (err){
                return res.status(400).json({ status: 'fail', message: err })
            }else{
                if (idExist === null){
                    return res.status(400).json({ status: 'fail', message: 'Invalid id' })
                }else{
                    // find trainer
                    Plan.findOne({_id: id}, (err, data) => {
                        if (err) {
                            return res.status(400).json({status: 'fail', message: err})
                        }else {
                            return res.status(200).json({status: 'success', data: { plan: data }})
                        }
                    })
                }
            }
        });
    }
}

