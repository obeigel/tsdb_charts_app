const express = require('express');
const router = express.Router();
var shell = require('shelljs');
var Metrics = require('./model/Metrics');

router.get('/', function(req, res) {
    console.log('Got main route')
    res.json({ message: 'API Initialized!'});
});

router.route('/metrics')
.get(function(req, res) {
    const { stdout, stderr, code } = shell.exec('cd /home/oleg/projects/tsdb_project/tsdb_src/; python tspy.py RUNTSDB 60 4');
    if (stderr) {
        console.log(stderr);
        res.send(stderr);
    }
    let dataArr = stdout.split(',');
    dataArr.map((e,i) => {
        dataArr[i] = e.replace(/\W/g, '');
    });
    res.json(dataArr);
});

router.route('/metrics/:name')
.get(function(req, res) {
    const metric_name = req.params.name;
    const { stdout, stderr, code } = shell.exec('cd /home/oleg/projects/tsdb_project/tsdb_src/; python tspy.py RUNTSDB 60 3 ' + metric_name);
    if (stderr) {
        console.log(stderr);
        res.send(stderr);
    }

    let dataArr = stdout.split(',');
    
    data = {}
    console.log("DATA:");
    dataArr.map((e,i) => {
        dataArr[i] = e.replace(/\s/g, '');
        dataArr[i] = dataArr[i].replace(/\]|\[|\{|\}/g, '');
        //dataArr[i] = dataArr[i].replace(/\[/g, '');
        console.log(dataArr[i]);
        [ts,val] = dataArr[i].split(':');
        data[ts] = parseInt(val); 
    });
    console.log("DATA:", data);
    //dataArr[0] = dataArr[0].substr(1);
    
    res.json(data);
});

module.exports = router;