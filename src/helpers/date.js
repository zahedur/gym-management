const moment = require('moment-timezone');
const dateBangladesh = moment.tz("Asia/Dhaka").format();

exports.getDate = () => dateBangladesh;
