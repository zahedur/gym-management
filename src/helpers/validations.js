
// Authentication
exports.registerValidation = (data) => {
    let error = {};

    if (!data.firstName) {
        error.firstName = 'First name field is required'
    } else {
        let checkNameError = nameValidation(data.firstName, 'First');
        if (checkNameError){
            error.firstName = checkNameError;
        }
    }

    if (!data.lastName) {
        error.lastName = 'Last name field is required'
    }else{
        let checkNameError = nameValidation(data.lastName, 'Last');
        if (checkNameError){
            error.lastName = checkNameError;
        }
    }

    if (!data.email) {
        error.email = 'Email field is required'
    } else {
        if (!isEmail(data.email)) {
            error.email = 'Invalid Email'
        }
    }

    if (!data.username) {
        error.username = 'Username field is required'
    }

    if (!data.password) {
        error.password = 'Password field is required'
    } else {
        if (!passwordValidation(data.password)) {
            error.password = "Password is minimum 8 character, with at least a symbol, upper and lower case letters and a number"
        }
    }

    if (!data.confirmPassword) {
        error.confirmPassword = 'Confirm password field is required'
    } else {
        if (data.password !== data.confirmPassword) {
            error.confirmPassword = "Password doesn't match"
        }
    }

    if (!data.role) {
        error.role = 'Role field is required'
    }

    return error;
}

exports.loginValidation = (data) => {
    let error = {};

    if (!data.username) {
        error.username = 'Username field is required'
    }

    if (!data.password) {
        error.password = 'Password field is required'
    } else {
        if (!passwordValidation(data.password)) {
            error.password = "Password is minimum 8 character, with at least a symbol, upper and lower case letters and a number"
        }
    }

    return error;
}

exports.updateProfileValidation = (data) => {
    let error = {};

    if (!data.firstName) {
        error.firstName = 'First name field is required'
    } else {
        let checkNameError = nameValidation(data.firstName, 'First');
        if (checkNameError){
            error.firstName = checkNameError;
        }
    }

    if (!data.lastName) {
        error.lastName = 'Last name field is required'
    }else{
        let checkNameError = nameValidation(data.lastName, 'Last');
        if (checkNameError){
            error.lastName = checkNameError;
        }
    }

    if (!data.email) {
        error.email = 'Email field is required'
    } else {
        if (!isEmail(data.email)) {
            error.email = 'Invalid Email'
        }
    }

    if (!data.username) {
        error.username = 'Username field is required'
    } else {
        if (data.username.length < 3) {
            error.username = 'Username minimum 3 character.'
        }
    }

    return error;
}

exports.changePasswordValidation = (data) => {
    let error = {};

    if (!data.oldPassword) {
        error.oldPassword = 'Old Password field is required'
    }

    if (!data.newPassword) {
        error.newPassword = 'New Password field is required'
    } else {
        if (!passwordValidation(data.newPassword)) {
            error.newPassword = "Password is minimum 8 character, with at least a symbol, upper and lower case letters and a number"
        }
    }

    if (!data.confirmPassword) {
        error.confirmPassword = 'Confirm password field is required'
    } else {
        if (data.newPassword !== data.confirmPassword) {
            error.confirmPassword = "Password doesn't match"
        }
    }

    return error;
}



//User
exports.userCreateValidation = (data) => {
    let error = {};

    if (!data.firstName) {
        error.firstName = 'First name field is required'
    } else {
        let checkNameError = nameValidation(data.firstName, 'First');
        if (checkNameError){
            error.firstName = checkNameError;
        }
    }

    if (!data.lastName) {
        error.lastName = 'Last name field is required'
    }else{
        let checkNameError = nameValidation(data.lastName, 'Last');
        if (checkNameError){
            error.lastName = checkNameError;
        }
    }

    if (!data.email) {
        error.email = 'Email field is required'
    } else {
        if (!isEmail(data.email)) {
            error.email = 'Invalid Email'
        }
    }

    if (!data.username) {
        error.username = 'Username field is required'
    }

    if (!data.password) {
        error.password = 'Password field is required'
    } else {
        if (!passwordValidation(data.password)) {
            error.password = "Password is minimum 8 character, with at least a symbol, upper and lower case letters and a number"
        }
    }

    if (!data.confirmPassword) {
        error.confirmPassword = 'Confirm password field is required'
    } else {
        if (data.password !== data.confirmPassword) {
            error.confirmPassword = "Password doesn't match"
        }
    }

    if (!data.role) {
        error.role = 'Role field is required'
    }

    return error;
}

exports.userUpdateValidation = (data, reqBody) => {
    let error = {};

    if (!data.firstName) {
        error.firstName = 'First name field is required'
    } else {
        let checkNameError = nameValidation(data.firstName, 'First');
        if (checkNameError){
            error.firstName = checkNameError;
        }
    }

    if (!data.lastName) {
        error.lastName = 'Last name field is required'
    }else{
        let checkNameError = nameValidation(data.lastName, 'Last');
        if (checkNameError){
            error.lastName = checkNameError;
        }
    }

    if (!data.email) {
        error.email = 'Email field is required'
    } else {
        if (!isEmail(data.email)) {
            error.email = 'Invalid Email'
        }
    }

    if (!data.username) {
        error.username = 'Username field is required'
    }

    if (reqBody.hasOwnProperty('password')){
        if (!data.password) {
            error.password = 'Password field is required'
        } else {
            if (!passwordValidation(data.password)) {
                error.password = "Password is minimum 8 character, with at least a symbol, upper and lower case letters and a number"
            }
        }
    }



    if (!data.role) {
        error.role = 'Role field is required'
    }

    if (!data.id) {
        error.id = 'id is required'
    }

    return error;
}


// Member
exports.memberCreateValidation = (data) => {
    let error = {};


    if (!data.memberId) {
        error.memberId = 'Member ID field is required'
    }

    if (!data.firstName) {
        error.firstName = 'First name field is required'
    } else {
        let checkNameError = nameValidation(data.firstName, 'First');
        if (checkNameError){
            error.firstName = checkNameError;
        }
    }

    if (!data.lastName) {
        error.lastName = 'Last name field is required'
    }else{
        let checkNameError = nameValidation(data.lastName, 'Last');
        if (checkNameError){
            error.lastName = checkNameError;
        }
    }

    if (!data.email) {
        error.email = 'Email field is required'
    } else {
        if (!isEmail(data.email)) {
            error.email = 'Invalid Email'
        }
    }

    if (!data.mobile) {
        error.mobile = 'Mobile number field is required'
    } else {
        if (! /(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/.test(data.mobile)) {
            error.mobile = 'Invalid mobile'
        }
    }

    if (!data.gender) {
        error.gender = 'Gender field is required'
    }

    return error;
}

exports.memberUpdateValidation = (data) => {
    let error = {};


    if (!data.memberId) {
        error.memberId = 'Member ID field is required'
    }

    if (!data.firstName) {
        error.firstName = 'First name field is required'
    } else {
        let checkNameError = nameValidation(data.firstName, 'First');
        if (checkNameError){
            error.firstName = checkNameError;
        }
    }

    if (!data.lastName) {
        error.lastName = 'Last name field is required'
    }else{
        let checkNameError = nameValidation(data.lastName, 'Last');
        if (checkNameError){
            error.lastName = checkNameError;
        }
    }

    if (!data.email) {
        error.email = 'Email field is required'
    } else {
        if (!isEmail(data.email)) {
            error.email = 'Invalid Email'
        }
    }

    if (!data.mobile) {
        error.mobile = 'Mobile number field is required'
    } else {
        if (! /(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/.test(data.mobile)) {
            error.mobile = 'Invalid mobile'
        }
    }

    if (!data.gender) {
        error.gender = 'Gender field is required'
    }

    if (!data.id) {
        error.id = 'id is required'
    }

    return error;
}


// Trainer
exports.trainerCreateValidation = (data) => {
    let error = {};


    if (!data.trainerId) {
        error.trainerId = 'Trainer ID field is required'
    }

    if (!data.firstName) {
        error.firstName = 'First name field is required'
    } else {
        let checkNameError = nameValidation(data.firstName, 'First');
        if (checkNameError){
            error.firstName = checkNameError;
        }
    }

    if (!data.lastName) {
        error.lastName = 'Last name field is required'
    }else{
        let checkNameError = nameValidation(data.lastName, 'Last');
        if (checkNameError){
            error.lastName = checkNameError;
        }
    }

    if (!data.email) {
        error.email = 'Email field is required'
    } else {
        if (!isEmail(data.email)) {
            error.email = 'Invalid Email'
        }
    }

    if (!data.mobile) {
        error.mobile = 'Mobile number field is required'
    } else {
        if (! /(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/.test(data.mobile)) {
            error.mobile = 'Invalid mobile'
        }
    }

    if (!data.gender) {
        error.gender = 'Gender field is required'
    }

    return error;
}

exports.trainerUpdateValidation = (data) => {
    let error = {};


    if (!data.trainerId) {
        error.trainerId = 'Trainer ID field is required'
    }

    if (!data.firstName) {
        error.firstName = 'First name field is required'
    } else {
        let checkNameError = nameValidation(data.firstName, 'First');
        if (checkNameError){
            error.firstName = checkNameError;
        }
    }

    if (!data.lastName) {
        error.lastName = 'Last name field is required'
    }else{
        let checkNameError = nameValidation(data.lastName, 'Last');
        if (checkNameError){
            error.lastName = checkNameError;
        }
    }

    if (!data.email) {
        error.email = 'Email field is required'
    } else {
        if (!isEmail(data.email)) {
            error.email = 'Invalid Email'
        }
    }

    if (!data.mobile) {
        error.mobile = 'Mobile number field is required'
    } else {
        if (! /(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/.test(data.mobile)) {
            error.mobile = 'Invalid mobile'
        }
    }

    if (!data.gender) {
        error.gender = 'Gender field is required'
    }

    if (!data.id) {
        error.id = 'id is required'
    }

    return error;
}



// Package
exports.packageCreateValidation = (data) => {
    let error = {};

    if (!data.name) {
        error.name = 'Name field is required'
    }

    if (!data.description) {
        error.description = 'Description name field is required'
    }

    if (!data.amount) {
        error.amount = 'Amount field is required'
    }else{
        if(isNaN(data.amount)){
            error.amount = 'Amount field is must be number'
        }
    }

    return error;
}

exports.packageUpdateValidation = (data) => {
    let error = {};

    if (!data.name) {
        error.name = 'Name field is required'
    }

    if (!data.description) {
        error.description = 'Description name field is required'
    }

    if (!data.amount) {
        error.amount = 'Amount field is required'
    }else{
        if(isNaN(data.amount)){
            error.amount = 'Amount field is must be number'
        }
    }

    if (!data.id) {
        error.id = 'id is required'
    }

    return error;
}


// Plans
exports.planCreateValidation = (data) => {
    let error = {};

    if (!data.month) {
        error.month = 'Month field is required'
    }
    if (!data.amount) {
        error.amount = 'Amount field is required'
    }else{
        if(isNaN(data.amount)){
            error.amount = 'Amount field is must be number'
        }
    }

    return error;
}

exports.planUpdateValidation = (data) => {
    let error = {};

    if (!data.month) {
        error.month = 'Month field is required'
    }

    if (!data.amount) {
        error.amount = 'Amount field is required'
    }else{
        if(isNaN(data.amount)){
            error.amount = 'Amount field is must be number'
        }
    }

    if (!data.id) {
        error.id = 'id is required'
    }

    return error;
}


// Memberships
exports.membershipCreateValidation = (data) => {
    let error = {};

    if (!data.memberId) {
        error.memberId = 'Member ID field is required'
    }

    if (!data.planId) {
        error.planId = 'Plan ID field is required'
    }

    if (!data.packageId) {
        error.packageId = 'Package ID field is required'
    }

    if (!data.startDate) {
        error.startDate = 'Start date field is required'
    }

    if (!data.endDate) {
        error.endDate = 'End Date field is required'
    }

    if (!data.trainerId) {
        error.trainerId = 'Trainer ID name field is required'
    }

    if (!data.status) {
        error.status = 'Status field is required'
    }

    return error;
}

exports.membershipUpdateValidation = (data) => {
    let error = {};

    if (!data.memberId) {
        error.memberId = 'Member ID field is required'
    }

    if (!data.planId) {
        error.planId = 'Plan ID field is required'
    }

    if (!data.packageId) {
        error.packageId = 'Package ID field is required'
    }

    if (!data.startDate) {
        error.startDate = 'Start date field is required'
    }

    if (!data.endDate) {
        error.endDate = 'End Date field is required'
    }

    if (!data.trainerId) {
        error.trainerId = 'Trainer ID name field is required'
    }

    if (!data.status) {
        error.status = 'Status field is required'
    }

    if (!data.id) {
        error.id = 'id is required'
    }

    return error;
}



// Schedules
exports.scheduleCreateValidation = (data) => {
    let error = {};

    if (!data.memberId) {
        error.memberId = 'Member ID field is required'
    }

    if (!data.dayOfWeek) {
        error.dayOfWeek = 'Day of week field is required'
    }

    if (!data.dateFrom) {
        error.dateFrom = 'Date from field is required'
    }

    if (!data.dateTo) {
        error.dateTo = 'Date to field is required'
    }

    if (!data.timeFrom) {
        error.timeFrom = 'Time from field is required'
    }

    if (!data.timeTo) {
        error.timeTo = 'Time to field is required'
    }

    if (!data.status) {
        error.status = 'Status field is required'
    }

    return error;
}

exports.scheduleUpdateValidation = (data) => {
    let error = {};

    if (!data.memberId) {
        error.memberId = 'Member ID field is required'
    }

    if (!data.dayOfWeek) {
        error.dayOfWeek = 'Day of week field is required'
    }

    if (!data.dateFrom) {
        error.dateFrom = 'Date from field is required'
    }

    if (!data.dateTo) {
        error.dateTo = 'Date to field is required'
    }

    if (!data.timeFrom) {
        error.timeFrom = 'Time from field is required'
    }

    if (!data.timeTo) {
        error.timeTo = 'Time to field is required'
    }

    if (!data.status) {
        error.status = 'Status field is required'
    }

    if (!data.id) {
        error.id = 'id is required'
    }

    return error;
}





const nameValidation = (data, type) => {
    let error = '';
    if(!data.length) {
        error = type + 'Name field is required.'
    }

    let regex = /^(?:((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-.\s])){1,}(['’,\-\.]){0,1}){2,}(([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-. ]))*(([ ]+){0,1}(((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){1,})(['’\-,\.]){0,1}){2,}((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){2,})?)*)$/;
    let check = regex.test(data);

    if(!check || data.includes('^')) {
        error = 'Invalid name. Please enter a valid name'
    }else{
        if(type === 'First' && data.length < 3){
            error = 'First name minimum 3 character.'
        }
    }
    return error;
}

const passwordValidation = (str) => {
    let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str);
}

const isEmail = (email) => {
    return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(email);
}
