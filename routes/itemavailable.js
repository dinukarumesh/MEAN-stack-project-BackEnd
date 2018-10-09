const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Availability = require('../models/availableitem');
const availableitem = require('../models/availableitem');
const Allocation = require('../models/allocateditem');
const allocateditem = require('../models/allocateditem');
const MTNotification = require('../models/middleTermNotification');
const middleTermNotification = require('../models/middleTermNotification');

let AvailableItem = require('../models/availableitem');
let AllocatedItem = require('../models/allocateditem');
let MiddleTermNotification = require('../models/middleTermNotification');



router.get('/availablie',function(request, response){
	const itemName = request.body.itemName;
	Availability.aggregate([
        { $match: {
        }},
        { $group: {
            _id: "$itemName",
            quantity: { $sum: 1 }
        }},
		{
      $sort : {
        _id: 1
        }
    }
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
       response.json(result);
    });
});

router.post('/insertavailability', function(request, response) {
	console.log(request.body);
	var availableitem = new Availability();
	
	var itemId = request.body.itemId;
	var itemName = request.body.itemName;
	var employeeId = request.body.employeeId;

	availableitem.itemId = itemId;
	availableitem.itemName = itemName;
	availableitem.employeeId = employeeId;
		
		if(!itemId) {
		response.json({
			"status": "error",
			"message": "Field was not provided"
		});
		}else {
				var newAvailability = new Availability({
					itemId: itemId,
					itemName:itemName,
					employeeId: employeeId
			});
				newAvailability.save(function(err) {
					if(err) {
						response.statusCode = 500;
						 response.json({
							"status": "error",
							"message": "500 Internal Server Error"
						});
	
					} else {
				 
			Allocation.findOneAndRemove({itemId: itemId}, function(err, user) {
			if(err) {
				response.statusCode = 500;
			 response.json({
					"status": "error",
					"message": "500 Internal Server Error"
				});
			} else if(!user) {
				response.statusCode = 404;
				 response.json({
					"status": "error",
					"message": "404 Not Found"
				});
			} else {
				AllocatedItem.checkEmployeeId(employeeId, function(isMatch) {
					/*if(!isMatch) {
						response.statusCode = 401;
						 response.json({
							"status": "error",
							"message": "401 Not Authorized"
						});
					} else {
						 response.json({
							"status": "success",
							"message": "successfully deleted from allocation and insert into Available",
							"data": {
								"username": user.itemName
							}
						});*/
	var middleTermNotification = new MTNotification();
	
	var employeeId = request.body.employeeId;
	var itemId = request.body.itemId;
	var msg = "you returned one item";
	
	
	middleTermNotification.employeeId = employeeId;
	middleTermNotification.itemId = itemId;
	middleTermNotification.msg = msg;
	
	


				var newMTNotification = new MTNotification({
					employeeId: employeeId,
					itemId: itemId,
					msg: msg,
				});
				newMTNotification.save(function(err) {
					if(err) {
						response.statusCode = 500;
						response.json({
							"status": "error",
							"message": "500 Internal Server Error"
						});
	
					} else {
					response.json({
							"status": "success",
							"message": "msg successfully created",
							"data": {
								"msg": msg
					
						}
					});
				}
			});
				
					//}
				});
			}
		});
 						}
					});

					}
});

router.get('/showallocateditems', function(request, response){
	console.log('show allocated items');
	allocateditem.find ({}).sort({itemName: 1})
	.exec(function(err,allocateditems){
		if(err){
			console.log("error retriving allocated items");

		}else{
			response.json(allocateditems);
		}
	})

});


module.exports = router;
