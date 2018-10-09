const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const supplierDetailSchema = mongoose.Schema({
    supplierId: {type: String},
    supplierName: {type: String},
    companyPhoneNumber: {type: String},
    contactPersonName: {type: String},
    contactNumber: {type: String},
    supplierItemTypes: {type: String}
});

module.exports = mongoose.model('SupplierDetail',supplierDetailSchema); 

module.exports.saveSupplierDetail = function(newsupplierDetail, callback) {
    console.log(newsupplierDetail);

    newsupplierDetail.save(callback);
};
