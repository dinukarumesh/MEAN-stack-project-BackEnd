const express = require('express');
const router = express.Router();
const config = require('../config/database');
const itemallocation = require('../models/itemallocation/itemallocation');
const MiddleTermItem = require('../models/insertItem/middleTermItem');

router.post("", function(req, res) {

    const newallocation = new itemallocation({

        itemId: req.body.itemId,
        itemName: req.body.itemName,
        employeeId: req.body.employeeId,
        userName: req.body.userName,
        allocatedate: new Date
    });

    itemallocation.saveItemAllocation(newallocation, function(err, newallocation) {
        if (err) {
            res.json({ state: false, msg: "data not inserted" });
            console.log(err);
        }
        if (newallocation) {
            res.json({ state: true, msg: "data inserted" });
        }
    });

});

router.post('/allocateiteminfo', function(req, res) {

    var n = parseInt(req.body.itemId);
    console.log(n);
    MiddleTermItem.getItemByItemId(n, (err, item) => {


        if (err) throw err;
        else
            res.json(item);

    });

});




module.exports = router;