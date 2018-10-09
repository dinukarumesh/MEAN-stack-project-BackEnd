const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const middleTermNotificationSchema = mongoose.Schema({
    employeeId: {
        type: String
    },
    itemId: {
        type: String
    },
    msg: {
        type: String,

    },
    read_status: {
        type: String,

    },
    day: {
        type: Date,

    }
});

const MiddleTermNotification = module.exports = mongoose.model('MiddleTermNotification', middleTermNotificationSchema);

module.exports.checkItemId = function(guess, done) {
    done(this.itemId === guess);
}