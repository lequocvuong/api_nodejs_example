const express = require('express');
const app = express();
const cron = require("cron");
const bodyParser = require('body-parser');
const vccService = require("./api/services/VccService");

require('dotenv').load();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


let routes = require('./api/routes'); //importing route
routes(app);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'});
});

app.listen(port);
console.log('RESTful API server started on: ' + port);

const jobSyncVcc = new cron.CronJob({
    // run every 2 minute
    cronTime: "0 */2 * * * *",
    // run every 10 second
    // cronTime: "*/10 * * * * *",
    onTick: function () {
        vccService.getDataList();
    },
    start: true,
    timeZone: "Asia/Ho_Chi_Minh",
});
jobSyncVcc.start();

const jobSyncMissVcc = new cron.CronJob({
    // run every 5 minute
    cronTime: "0 */5 * * * *",
    // run every 10 second
    // cronTime: "*/10 * * * * *",
    onTick: function () {
        vccService.getDataMissList();
    },
    start: true,
    timeZone: "Asia/Ho_Chi_Minh",
});
jobSyncMissVcc.start();
