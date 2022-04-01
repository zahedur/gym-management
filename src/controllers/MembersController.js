const Member = require('../models/Member');
const validations = require("../helpers/validations");
const moment = require('moment-timezone');

exports.Index = (req, res) => {

    Member.find({}, (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", error: err })
        }else{
            res.status(200).json({ status: "success", data: { members: data } })
        }
    })
}

exports.Create = (req, res) => {
    let reqBody = req.body;

    const formData = {
        memberId: reqBody['memberId'] || '',
        firstName: reqBody['firstName'] || '',
        lastName: reqBody['lastName'] || '',
        middleName: reqBody['middleName'] || '',
        email: reqBody['email'] || '',
        mobile: reqBody['mobile'] || '',
        gender: reqBody['gender'] || '',
        address: reqBody['address'] || '',
        createdAt:  moment.tz(process.env.TIME_ZONE).format()
    }

    const validation = validations.memberCreateValidation(formData);
    if (Object.keys(validation).length){
        return res.status(422).json({ status: 'fail', message: 'Validation Error', error: validation })
    }else {

        // Check exist email
        Member.findOne({email: formData.email}, (err, existEmail) => {
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
                    // Check exist member ID
                    Member.findOne({memberId: formData.memberId}, (err, ExistMemberId) => {
                        if (err) {
                            return res.status(400).json({status: 'fail', message: err})
                        } else {

                            if (ExistMemberId !== null) {
                                return res.status(422).json({
                                    status: 'fail',
                                    message: 'Validation Error',
                                    error: {username: "Member ID has already been taken."}
                                })
                            } else {

                                // Check exist mobile
                                Member.findOne({mobile: formData.mobile}, (err, ExistMobile) => {
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

                                            // Create Member
                                            Member.create(formData, (err, data) => {
                                                if (err) {
                                                    res.status(400).json({status: 'fail', error: err})
                                                } else {
                                                    res.status(201).json({
                                                        status: 'success',
                                                        message: 'Member created successfully',
                                                        data: {member: data}
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
        Member.findOne({_id: id}, (err, idExist) =>{
            if (err){
                return res.status(400).json({ status: 'fail', message: err })
            }else{
                if (idExist === null){
                    return res.status(400).json({ status: 'fail', message: 'Invalid id' })
                }else{
                    // find member
                    Member.findOne({_id: id}, (err, data) => {
                        if (err) {
                            return res.status(400).json({status: 'fail', message: err})
                        }else {
                            return res.status(200).json({status: 'success', data: { member: data }})
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
        firstName: reqBody['firstName'] || '',
        lastName: reqBody['lastName'] || '',
        middleName: reqBody['middleName'] || '',
        email: reqBody['email'] || '',
        mobile: reqBody['mobile'] || '',
        gender: reqBody['gender'] || '',
        address: reqBody['address'] || '',
        id: reqBody['id'] || '',
        updatedAt: moment.tz(process.env.TIME_ZONE).format()
    }

    const validation = validations.memberUpdateValidation(formData);
    if (Object.keys(validation).length){
        return res.status(422).json({ status: 'fail', message: 'Validation Error', error: validation })
    }else {

        // Id is exist
        Member.findOne({_id: formData.id}, (err, existId) => {
            if (err){
                return res.status(400).json({ status: 'fail', message: err })
            }else{
                if (existId === null){
                    return res.status(400).json({ status: 'fail', message: 'Invalid id' })
                }else{

                    // Check exist email
                    Member.findOne({email: formData.email, _id: {$ne: formData.id}}, (err, existEmail) => {
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
                                // Check exist member ID
                                Member.findOne({memberId: formData.memberId, _id: {$ne: formData.id}}, (err, ExistMemberId) => {
                                    if (err) {
                                        return res.status(400).json({status: 'fail', message: err})
                                    } else {

                                        if (ExistMemberId !== null) {
                                            return res.status(422).json({
                                                status: 'fail',
                                                message: 'Validation Error',
                                                error: {username: "Member ID has already been taken."}
                                            })
                                        } else {

                                            // Check exist mobile
                                            Member.findOne({mobile: formData.mobile, _id: {$ne: formData.id}}, (err, ExistMobile) => {
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

                                                        // Update Member
                                                        Member.updateOne({_id: formData.id}, formData, {insert: true}, (err, data) => {
                                                            if (err) {
                                                                res.status(400).json({status: 'fail', error: err})
                                                            } else {
                                                                Member.findOne({_id: formData.id}, (err, updatedMember) => {
                                                                    if (err){
                                                                        res.status(400).json({
                                                                            status: 'fail',
                                                                            message: err,
                                                                        })
                                                                    }else {
                                                                        res.status(200).json({
                                                                            status: 'success',
                                                                            message: 'Member updated successfully',
                                                                            data: {member: updatedMember}
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
        Member.findOne( {_id: id }, (err, findData) => {
            if (err){
                return res.status(400).json({status: 'fail', message: err})
            }else {
                if (findData !== null) {
                    Member.remove({_id: id}, (err, data) => {
                        if (err) {
                            return res.status(400).json({status: 'fail', message: err})
                        } else {
                            return res.status(200).json({status: 'success', message: 'Member deleted successfully'})
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
        Member.findOne({_id: id}, (err, idExist) =>{
            if (err){
                return res.status(400).json({ status: 'fail', message: err })
            }else{
                if (idExist === null){
                    return res.status(400).json({ status: 'fail', message: 'Invalid id' })
                }else{
                    // find member
                    Member.findOne({_id: id}, (err, data) => {
                        if (err) {
                            return res.status(400).json({status: 'fail', message: err})
                        }else {
                            return res.status(200).json({status: 'success', data: { member: data }})
                        }
                    })
                }
            }
        });
    }
}
