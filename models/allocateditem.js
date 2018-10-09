const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const allocateditemSchema = mongoose.Schema({
              itemId: {
    type: String
  },
itemName: {
    type: String
  },
 employeeId: {
    type: String
    
 }, 
 employeeName: {
    type: String
    
 }
      
       
        
         
  }
);


const AllocatedItem = module.exports = mongoose.model('AllocatedItem',allocateditemSchema);

module.exports.checkEmployeeId = function(guess, done) {
  done(this.employeeId === guess);
}




