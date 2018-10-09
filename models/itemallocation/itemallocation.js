const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../../config/database');

const schema = mongoose.Schema;

const itemallocationSchema = new schema({

    itemId: { type: Number },
    itemName: { type: String },
    employeeId: { type: Number },
    userName: { type: String },
    allocatedate: { type: Date }
});

module.exports = mongoose.model("ItemAllocation", itemallocationSchema);
module.exports.saveItemAllocation = function(newallocation, callback) {
    console.log(newallocation);

    newallocation.save(callback);
};