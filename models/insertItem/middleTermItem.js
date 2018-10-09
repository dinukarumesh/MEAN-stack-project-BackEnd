const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../../config/database');


// Item Schema
const MiddleTermItemSchema = mongoose.Schema({
    itemName: {
        type: String
    },
    itemType: {
        type: String
    },
    itemBrand: {
        type: String
    },
    itemQuantity: {
        type: String
    },
    invoiceNumber: {
        type: String
    },
    warrantyType: {
        type: String
    },
    warrantyQuantity: {
        type: String
    },
    referenceId: {
        type: String,
    },
    itemWarehouse: {
        type: String,
    },
    itemDescription: {
        type: String,
    },
    itemDate: {
        type: Date
    }
});

const MiddleTermItem = module.exports = mongoose.model('MiddleTermItem', MiddleTermItemSchema);

module.exports.getUserByItemName = function(itemName, callback) {
    MiddleTermItem.findById(itemName, callback);
}

//Functions to get data for the Report Item
module.exports.getItemByItemId = function(itemId, callback) {
    MiddleTermItem.find({ "itemId": itemId }, callback)

}
module.exports.getItemByFirstLetter = function(itemName, callback) {
    MiddleTermItem.find({
        "itemName": new RegExp(itemName, "ig")
    }, callback)
}

// module.exports.getUserByEmail = function(email, callback){
//   const query = {email: email}
//   User.findOne(query, callback);
// }

module.exports.addMiddleTermItem = function(newMiddleTermItem, callback) {
    newMiddleTermItem.save(callback);
}