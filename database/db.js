var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/dynconfig');
var Schema = mongoose.Schema;

// 平台、版本信息
var versionSchema = new Schema({
    version: String,
    platformList: String
});
exports.appversion = db.model('appversion', versionSchema);

// JSON信息
var jsonconfigSchema = new Schema({
    version: String,
    platform: String,
    jsonValue: String,
    jsonName: String
});
exports.jsonconfig = db.model('jsonconfig', jsonconfigSchema);
