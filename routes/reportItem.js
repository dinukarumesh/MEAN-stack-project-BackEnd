const express = require('express');
const router = express.Router();
const config = require('../config/database');
const ReportItem = require('../models/request-report/report');
const MiddleTermItem = require('../models/insertItem/middleTermItem');

router.post("", function(req, res) {

    const newreport = new ReportItem({

        itemId: req.body.itemId,
        itemName: req.body.itemName,
        reportDescription: req.body.reportDescription,
        itemType:req.body.itemType,
        date: new Date
    });

    ReportItem.saveReportItem(newreport, function(err, report) {
        if (err) {
            res.json({ state: false, msg: "data not inserted" });
            console.log(err);
        }
        if (report) {
            res.json({ state: true, msg: "data inserted" });
        }
    });

});




router.post('/showReportItem', function(req, res) {

    var n = parseInt(req.body.itemId);
    console.log(n);
    MiddleTermItem.getItemByItemId(n, (err, item) => {


        if (err) throw err;
        else
            res.json(item);

    });

});




module.exports = router;