const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../../config/database');


// Item Schema
const LongTermItemSchema = mongoose.Schema({
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
  itemWarehouse: {
    type: String,
  },
  itemDescription: {
    type: String,
  },
  itemDate:{
    type: Date
  }
});

const LongTermItem = module.exports = mongoose.model('LongTermItem', LongTermItemSchema);

module.exports.getUserByItemName = function(itemName, callback){
    LongTermItem.findById(itemName, callback);
}

// module.exports.getUserByEmail = function(email, callback){
//   const query = {email: email}
//   User.findOne(query, callback);
// }

module.exports.addLongTermItem = function(newLongTermItem, callback){
   newLongTermItem.save(callback);
}

