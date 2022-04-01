const Membership = require('../models/Membership');
const Member = require('../models/Member');
const Plan = require('../models/Plan');
const Package = require('../models/Package');
const Trainer = require('../models/Trainer');
const validations = require("../helpers/validations");
const moment = require('moment-timezone');

exports.Index = (req, res) => {

    Membership.find({})
        .populate('memberId')
        .populate('planId')
        .populate('packageId')
        .populate('trainerId')
        .exec((err, data) => {
        if (err) {
            console.log(err)
            res.status(400).json({ status: "fail", error: err })
        }else{
            console.log(data.member)
            res.status(200).json({ status: "success", data: { memberships: data } })
        }
    });
}

exports.Create = (req, res) => {
    let reqBody = req.body;

    const formData = {
        memberId: reqBody['memberId'] || '',
        planId: reqBody['planId'] || '',
        packageId: reqBody['packageId'] || '',
        trainerId: reqBody['trainerId'] || '',
        startDate: reqBody['startDate'] || '',
        endDate: reqBody['endDate'] || '',
        status: reqBody['status'] || '',
        createdAt: moment.tz(process.env.TIME_ZONE).format()
    }

    const validation = validations.membershipCreateValidation(formData);
    if (Object.keys(validation).length){
        return res.status(422).json({ status: 'fail', message: 'Validation Error', error: validation })
    }else {

        // Create Package
        Membership.create(formData, (err, data) => {
            if (err) {
                res.status(400).json({status: 'fail', error: err})
            } else {
                res.status(201).json({
                    status: 'success',
                    message: 'Membership created successfully',
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
        Membership.findOne({_id: id}, (err, idExist) =>{
            if (err){
                return res.status(400).json({ status: 'fail', message: err })
            }else{
                if (idExist === null){
                    return res.status(400).json({ status: 'fail', message: 'Invalid id' })
                }else{
                    // find trainer
                    Membership.findOne({_id: id})
                        .populate('memberId')
                        .populate('planId')
                        .populate('packageId')
                        .populate('trainerId')
                        .exec( (err, data) => {
                            if (err) {
                                return res.status(400).json({status: 'fail', message: err})
                            }else {
                                return res.status(200).json({status: 'success', data: { membership: data }})
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
        memberId: reqBody['memberId'] || '',
        planId: reqBody['planId'] || '',
        packageId: reqBody['packageId'] || '',
        startDate: reqBody['startDate'] || '',
        endDate: reqBody['endDate'] || '',
        trainerId: reqBody['trainerId'] || '',
        status: reqBody['status'] || '',
        id: reqBody['id'] || '',
        updatedAt:  moment.tz(process.env.TIME_ZONE).format()
    }

    const validation = validations.membershipUpdateValidation(formData);
    if (Object.keys(validation).length){
        return res.status(422).json({ status: 'fail', message: 'Validation Error', error: validation })
    }else {

        // Id is exist
        Membership.findOne({_id: formData.id}, (err, existId) => {
            if (err){
                return res.status(400).json({ status: 'fail', message: err })
            }else{
                if (existId === null){
                    return res.status(400).json({ status: 'fail', message: 'Invalid id' })
                }else{

                    // Update package
                    Membership.updateOne({_id: formData.id}, formData, {insert: true}, (err, data) => {
                        if (err) {
                            res.status(400).json({status: 'fail', error: err})
                        } else {
                            Membership.findOne({_id: formData.id})
                                .populate('memberId')
                                .populate('planId')
                                .populate('packageId')
                                .populate('trainerId')
                                .exec((err, updated) => {
                                    if (err){
                                        res.status(400).json({
                                            status: 'fail',
                                            message: err,
                                        })
                                    }else {
                                        res.status(200).json({
                                            status: 'success',
                                            message: 'Membership updated successfully',
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
        Membership.findOne( {_id: id }, (err, findData) => {
            if (err){
                return res.status(400).json({status: 'fail', message: err})
            }else {
                if (findData !== null) {
                    Membership.remove({_id: id}, (err, data) => {
                        if (err) {
                            return res.status(400).json({status: 'fail', message: err})
                        } else {
                            return res.status(200).json({status: 'success', message: 'Membership deleted successfully'})
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
        Membership.findOne({_id: id}, (err, idExist) =>{
            if (err){
                return res.status(400).json({ status: 'fail', message: err })
            }else{
                if (idExist === null){
                    return res.status(400).json({ status: 'fail', message: 'Invalid id' })
                }else{
                    // find trainer
                    Membership.findOne({_id: id})
                        .populate('memberId')
                        .populate('planId')
                        .populate('packageId')
                        .populate('trainerId')
                        .exec((err, data) => {
                            if (err) {
                                return res.status(400).json({status: 'fail', message: err})
                            }else {
                                return res.status(200).json({status: 'success', data: { membership: data }})
                            }
                        })
                }
            }
        });
    }
}

exports.MembershipFormData = (req, res) => {

    const memberProjection = {
        memberId: 0,
        email: 0,
        mobile: 0,
        gender: 0,
        address: 0,
        createdAt: 0,
        updatedAt: 0
    }

    Member.find({}, memberProjection, (err, members) => {
        if (err) {
            res.status(400).json({ status: "fail", error: err })
        }else{
            //res.status(200).json({ status: "success", data: { members: data } })

            const planProjection = {
                createdAt: 0,
                updatedAt: 0
            }
            Plan.find({}, planProjection, (err, plans) => {
                if (err) {
                    res.status(400).json({ status: "fail", error: err })
                }else{
                    //res.status(200).json({ status: "success", data: { plans: data } })

                    const packagesProjection = {
                        createdAt: 0,
                        updatedAt: 0,
                        description: 0
                    }
                    Package.find({}, packagesProjection, (err, packages) => {
                        if (err) {
                            res.status(400).json({ status: "fail", error: err })
                        }else{
                            //res.status(200).json({ status: "success", data: { packages: data } })

                            const trainersProjection = {
                                trainerId: 0,
                                email: 0,
                                mobile: 0,
                                gender: 0,
                                address: 0,
                                createdAt: 0,
                                updatedAt: 0
                            }
                            Trainer.find({}, trainersProjection, (err, trainers) => {
                                if (err) {
                                    res.status(400).json({ status: "fail", error: err })
                                }else{
                                    res.status(200).json({
                                        status: "success",
                                        data: {
                                            members: members,
                                            plans: plans,
                                            packages: packages,
                                            trainers: trainers
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}
