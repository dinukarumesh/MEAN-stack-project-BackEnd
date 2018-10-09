const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const MTNotification = require('../models/middleTermNotification');
var middleTermNotification = require('../models/middleTermNotification');


let MiddleTermNotification = require('../models/middleTermNotification');

router.post('/setmiddlenotification', function(request, response) {
	console.log(request.body);
	const middleTermNotification = new MTNotification();
	
	const employeeId = request.body.employeeId;
	const itemId = request.body.itemId;
	const msg = request.body.msg;
	const day = request.body.day;
	
	
	console.log(employeeId + " -> " + msg);
	middleTermNotification.employeeId = employeeId;
	middleTermNotification.itemId = itemId;
	middleTermNotification.msg = msg;
	middleTermNotification.day = day;
	
	

	if(!itemId || !msg) {
		response.json({
			"status": "error",
			"message": "Fields ware not provided"
		});
		}else {
				const newMTNotification = new MTNotification({
					employeeId: employeeId,
					itemId: itemId,
					msg: msg,
					day:day
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
								"umsg": msg
					
						}
					});
				}
			});
		}
});

router.get('/showmiddlenotification', function(request, response){
	console.log('show notifications');
	middleTermNotification.find ({}).sort({day: -1})
	.exec(function(err,middlenotifications){
		if(err){
			console.log("error retriving notifications");

		}else{
			response.json(middlenotifications);
		}
	})

});

module.exports = router;
