const Schedule = require('../models/Schedule');
const Member = require('../models/Member');
const validations = require("../helpers/validations");
const moment = require('moment-timezone');

exports.Index = (req, res) => {

    Schedule.find({})
        .populate('memberId')
        .exec((err, data) => {
        if (err) {
            console.log(err)
            res.status(400).json({ status: "fail", error: err })
        }else{
            console.log(data.member)
            res.status(200).json({ status: "success", data: { schedules: data } })
        }
    });
}

exports.Create = (req, res) => {
    let reqBody = req.body;

    const formData = {
        memberId: reqBody['memberId'] || '',
        dayOfWeek: reqBody['dayOfWeek'] || '',
        dateFrom: reqBody['dateFrom'] || '',
        dateTo: reqBody['dateTo'] || '',
        timeFrom: reqBody['timeFrom'] || '',
        timeTo: reqBody['timeTo'] || '',
        status: reqBody['status'] || '',
        createdAt: moment.tz(process.env.TIME_ZONE).format()
    }

    //return res.status(200).json(formData.dateOfWeek)

    const validation = validations.scheduleCreateValidation(formData);
    if (Object.keys(validation).length){
        return res.status(422).json({ status: 'fail', message: 'Validation Error', error: validation })
    }else {

        // Create schedule
        Schedule.create(formData, (err, data) => {
            if (err) {
                res.status(400).json({status: 'fail', error: err})
            } else {
                res.status(201).json({
                    status: 'success',
                    message: 'Schedule created successfully',
                    data: {schedule: data}
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
        Schedule.findOne({_id: id}, (err, idExist) =>{
            if (err){
                return res.status(400).json({ status: 'fail', message: err })
            }else{
                if (idExist === null){
                    return res.status(400).json({ status: 'fail', message: 'Invalid id' })
                }else{
                    // find schedule
                    Schedule.findOne({_id: id})
                        .populate('memberId')
                        .exec((err, data) => {
                            if (err) {
                                return res.status(400).json({status: 'fail', message: err})
                            }else {
                                return res.status(200).json({status: 'success', data: { schedule: data }})
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
        dayOfWeek: reqBody['dayOfWeek'] || '',
        dateFrom: reqBody['dateFrom'] || '',
        dateTo: reqBody['dateTo'] || '',
        timeFrom: reqBody['timeFrom'] || '',
        timeTo: reqBody['timeTo'] || '',
        status: reqBody['status'] || '',
        id: reqBody['id'] || '',
        updatedAt: moment.tz(process.env.TIME_ZONE).format()
    }

    const validation = validations.scheduleUpdateValidation(formData);
    if (Object.keys(validation).length){
        return res.status(422).json({ status: 'fail', message: 'Validation Error', error: validation })
    }else {

        // Id is exist
        Schedule.findOne({_id: formData.id}, (err, existId) => {
            if (err){
                return res.status(400).json({ status: 'fail', message: err })
            }else{
                if (existId === null){
                    return res.status(400).json({ status: 'fail', message: 'Invalid id' })
                }else{

                    // Update schedule
                    Schedule.updateOne({_id: formData.id}, formData, {insert: true}, (err, data) => {
                        if (err) {
                            res.status(400).json({status: 'fail', error: err})
                        } else {
                            Schedule.findOne({_id: formData.id})
                                .populate('memberId')
                                .exec((err, updated) => {
                                if (err){
                                    res.status(400).json({
                                        status: 'fail',
                                        message: err,
                                    })
                                }else {
                                    res.status(200).json({
                                        status: 'success',
                                        message: 'Schedule updated successfully',
                                        data: {schedule: updated}
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
        Schedule.findOne( {_id: id }, (err, findData) => {
            if (err){
                return res.status(400).json({status: 'fail', message: err})
            }else {
                if (findData !== null) {
                    Schedule.remove({_id: id}, (err, data) => {
                        if (err) {
                            return res.status(400).json({status: 'fail', message: err})
                        } else {
                            return res.status(200).json({status: 'success', message: 'Schedule deleted successfully'})
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
        Schedule.findOne({_id: id}, (err, idExist) =>{
            if (err){
                return res.status(400).json({ status: 'fail', message: err })
            }else{
                if (idExist === null){
                    return res.status(400).json({ status: 'fail', message: 'Invalid id' })
                }else{
                    // find schedule
                    Schedule.findOne({_id: id})
                        .populate('memberId')
                        .exec((err, data) => {
                            if (err) {
                                return res.status(400).json({status: 'fail', message: err})
                            }else {
                                return res.status(200).json({status: 'success', data: { schedule: data }})
                            }
                        })
                }
            }
        });
    }
}

exports.ScheduleFormData = (req, res) => {

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
            res.status(200).json({
                status: "success",
                data: {
                    members: members,
                }
            })
        }
    })
}
