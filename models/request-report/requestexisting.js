const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../../config/database');
const schema = mongoose.Schema;

const existingrequestSchema = new schema({

    itemid: { type: Number },
    itemType: { type: String },
    itemName: { type: String },
    itemId: { type: String },
    availability: { type: String },
    quantity: { type: String },
    userName: { type: String },
    date: { type: Date }


});

module.exports = mongoose.model("RequestExistingItem", existingrequestSchema);
module.exports.saveExistingRequestItem = function(existingrequest, callback) {
    console.log(existingrequest);

    existingrequest.save(callback);

};