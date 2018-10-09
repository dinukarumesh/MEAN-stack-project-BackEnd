const express = require('express');
const router = express.Router();
const config = require('../config/database');
const itemallocation = require('../models/supplier/supplier');

//Insertion
router.post('/setsupplier', function(req, res) {
	console.log(req.body);
	var supplierDetail = new Supplier();
	
	
	var supplierId = req.body.supplierId;
	var supplierName = req.body.supplierName;
	var companyPhoneNumber = req.body.companyPhoneNumber;
	var contactPersonName= req.body.contactPersonName;
	var contactNumber= req.body.contactNumber;
	var supplierItemTypes= req.body.supplierItemTypes;
	
	
	console.log(supplierId + " -> " + supplierName);
	supplierDetail.supplierId = supplierId;
	supplierDetail.supplierName = supplierName;
	supplierDetail.companyPhoneNumber = companyPhoneNumber;
	supplierDetail.contactPersonName = contactPersonName;
	supplierDetail.contactNumber = contactNumber;
	supplierDetail.supplierItemTypes = supplierItemTypes;

	
	

	if(!supplierId || !supplierName) {
		res.json({
			"status": "error",
			"message": "Fields ware not provided"
		});
		}else {
				var newSupplier = new Supplier({
					supplierId: supplierId,
					supplierName: supplierName,
					companyPhoneNumber: companyPhoneNumber,
					contactPersonName:contactPersonName,
					contactNumber:contactNumber,
					supplierItemTypes: supplierItemTypes,
				});
				newSupplier.save(function(err) {
					if(err) {
						res.statusCode = 500;
						res.json({
							"status": "error",
							"message": "500 Internal Server Error"
						});
	
					} else {
					res.json({
							"status": "success",
							"message": "msg successfully created",
							"data": {
								"supplierName": supplierName
					
						}
					});
				}
			});
		}
});


//Deletion
router.post('/deletesupplier', function(req, res) {
	
	
	var supplierId = req.body.supplierId;
	var supplierName = req.body.supplierName;
	var companyPhoneNumber = req.body.companyPhoneNumber;
	var contactPersonName= req.body.contactPersonName;
	var contactNumber= req.body.contactNumber;
	var supplierItemTypes= req.body.supplierItemTypes;
	
	
	console.log(supplierId);
	
	if(!supplierId ) {
		res.statusCode = 401;
		res.json({
			"status": "error",
			"message": "supplierId was not provided"
		});
	} else {
		Supplier.findOneAndRemove({supplierId: supplierId}, function(err, user) {
			if(err) {
				res.statusCode = 500;
				res.json({
					"status": "error",
					"message": "500 Internal Server Error"
				});
			} else if(!user) {
				res.statusCode = 404;
				res.json({
					"status": "error",
					"message": "404 Not Found"
				});
			} else {
						res.json({
							"status": "success",
							"message": "successfully deleted in",
							"data": {
								"itemId": user.itemId
							}
					});
				}
			});
		}
});

//Update
router.post('/updateSupplier',function(req, res){
	
	
	console.log('Update value');
	Supplier.findOneAndUpdate(req.params.itemId,
	{
		$set:{supplierId:req.body.supplierId,supplierName:req.body.supplierName,companyPhoneNumber:req.body.companyPhoneNumber,contactPersonName:req.body.contactPersonName,contactNumber:req.body.contactNumber,supplierItemTypes:req.body.supplierItemTypes}
	},
	{
		new: true
	},
	function(err,user){
		if(err){
			res.send("Error updating");

		}else{
			res.json(user);
		}
	});
});



module.exports = router;