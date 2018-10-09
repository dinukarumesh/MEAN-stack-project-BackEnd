const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const ShortTermItem = require('../models/insertItem/shortTermItem');
const MiddleTermItem = require('../models/insertItem/middleTermItem');
const LongTermItem = require('../models/insertItem/longTermItem');

// Register
router.post('/shortTermInsert', (req, res, next) => {
    let newShortTermItem = new ShortTermItem({
        itemName: req.body.itemName,
        itemType: req.body.itemType,
        itemQuntity: req.body.itemQuntity,
        itemWarehouse: req.body.itemWarehouse,
        itemDescription: req.body.itemDescription
    });

    ShortTermItem.addShortTermItem(newShortTermItem, (err, shortTermItem) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to insert item' });
            console.log(err);
        } else {
            res.json({ success: true, msg: 'Item inserted' });
        }
    });
});


router.post('/middleTermInsert', (req, res, next) => {
    let newMiddleTermItem = new MiddleTermItem({
        itemName: req.body.itemName,
        itemType: req.body.itemType,
        itemBrand: req.body.itemBrand,
        itemQuantity: req.body.itemQuantity,
        invoiceNumber: req.body.invoiceNumber,
        warrantyType: req.body.warrantyType,
        warrantyQuantity: req.body.warrantyQuantity,
        referenceId: req.body.referenceId,
        itemWarehouse: req.body.itemWarehouse,
        itemDescription: req.body.itemDescription
    });

    MiddleTermItem.addMiddleTermItem(newMiddleTermItem, (err, middleTermItem) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to insert item' });
        } else {
            res.json({ success: true, msg: 'Item inserted' });
        }
    });
});

router.post('/longTermInsert', (req, res, next) => {
    let newLongTermItem = new LongTermItem({
        itemName: req.body.itemName,
        itemType: req.body.itemType,
        itemBrand: req.body.itemBrand,
        itemQuantity: req.body.itemQuantity,
        invoiceNumber: req.body.invoiceNumber,
        warrantyType: req.body.warrantyType,
        warrantyQuantity: req.body.warrantyQuantity,
        itemWarehouse: req.body.itemWarehouse,
        itemDescription: req.body.itemDescription
    });

    LongTermItem.addLongTermItem(newLongTermItem, (err, longTermItem) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to insert item' });
        } else {
            res.json({ success: true, msg: 'Item inserted' });
        }
    });
});


router.get('/showMiddleTermItems', function(request, response) {
    console.log('show middle term items');
    MiddleTermItem.find({})
        .exec(function(err, middleTermItems) {
            if (err) {
                console.log("error retriving middle term items");

            } else {
                response.json(middleTermItems);
            }
        })


});

//middle term deletion
router.post('/deleteMiddle', function(request, response) {
	
	
	var itemName = request.body.itemName;
	var itemType = request.body.itemType;
    var itemBrand= req.body.itemBrand;
    var itemQuantity= req.body.itemQuantity;
    var invoiceNumber= req.body.invoiceNumber;
    var warrantyType= req.body.warrantyType;
    var warrantyQuantity= req.body.warrantyQuantity;
    var referenceId= req.body.referenceId;
    var itemWarehouse= req.body.itemWarehouse;
    var itemDescription=req.body.itemDescription;

	 console.log(itemId );
	if(!itemId ) {
		response.statusCode = 401;
		response.json({
			"status": "error",
			"message": "itemId was not provided"
		});
	} else {
		MiddleTermItem.findOneAndRemove({itemId: itemId}, function(err, user) {
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
						response.json({
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


//middle term update
router.post('/updateMiddle',function(request, response){
	
	
	console.log('Update value');
	MiddleTermItem.findOneAndUpdate(request.params.itemId,
	{
        $set:{itemName:request.body.itemName,itemType:request.body.itemType,itemBrand:request.body.itemBrand,itemQuantity:request.body.itemQuantity,
            invoiceNumber:request.body.invoiceNumber,warrantyType:request.body.warrantyType,warrantyQuantity:request.body.warrantyQuantity,referenceId:request.body.referenceId,itemWarehouse:request.body.itemWarehouse,itemDescription:request.body.itemDescription }
	},
	{
		new: true
	},
	function(err,user){
		if(err){
			response.send("Error updating");

		}else{
			response.json(user);
		}
	});
});       

// long term deletion
router.post('/deleteLong', function(request, response) {
	
	var itemName = request.body.itemName;
	var itemType = request.body.itemType;
    var itemBrand= req.body.itemBrand;
    var itemQuantity= req.body.itemQuantity;
    var invoiceNumber= req.body.invoiceNumber;
    var warrantyType= req.body.warrantyType;
    var warrantyQuantity= req.body.warrantyQuantity;
    var itemWarehouse= req.body.itemWarehouse;
    var itemDescription=req.body.itemDescription;


	 console.log(itemId );
	if(!itemId ) {
		response.statusCode = 401;
		response.json({
			"status": "error",
			"message": "itemId was not provided"
		});
	} else {
		LongTermItem.findOneAndRemove({itemId: itemId}, function(err, user) {
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
						response.json({
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

//short term deletion
router.post('/deleteShort', function(request, response) {
	
	var itemName = request.body.itemName;
	var itemType = request.body.itemType;
    var itemQuntity= request.body.itemQuntity;
    var itemWarehouse= request.body.itemWarehouse;
    var itemDescription= request.body.itemDescription;

	 console.log(itemId );
	if(!itemId ) {
		response.statusCode = 401;
		response.json({
			"status": "error",
			"message": "itemId was not provided"
		});
	} else {
		ShortTermItem.findOneAndRemove({itemId: itemId}, function(err, user) {
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
						response.json({
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






module.exports = router;