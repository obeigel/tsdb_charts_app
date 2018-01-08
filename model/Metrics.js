'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var Metrics = new Schema({
    end:Number,
    interval:Number,
    pid:Number,
    metrics:Array,
    start:Number
});

module.exports = mongoose.model('tsdb_meta', Metrics);
