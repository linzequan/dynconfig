var express = require('express');
var router = express.Router();
var appversion = require('../database/db').appversion;
var jsonconfig = require('../database/db').jsonconfig;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: '动态配置中心' });
});

// 新建版本
router.post('/saveVersion', function(req, res, next) {
    var platform = ['Android', 'iOS'];
    var version = new appversion({
        version: req.body.version,
        platformList: JSON.stringify(platform)
    });
    version.save(function(err) {
        if(!err) {
            res.json({
                'status': 0,
                'msg': 'success'
            });
        } else {
            res.json({
                'status': -1,
                'msg': 'error'
            });
        }
    });
});

// 查询版本列表
router.get('/version', function(req, res, next) {
    appversion.find({}, function(err, docs) {
        var data = new Array();
        for(var i in docs) {
            data.push({
                version: docs[i]['version'],
                platformList: docs[i]['platformList']
            })
        }
        res.json({
            flag: 1,
            msg: 'success',
            data: data
        })
    });
});

// 删除版本
router.post('/deleteVersion', function(req, res, next) {
    appversion.remove({
        version: req.body.version
    }, function(err) {
        res.json({
            status: 0,
            msg: 'success'
        })
    });
});

// 更新版本
router.post('/updateVersion', function(req, res, next) {
    appversion.update({
        version: req.body.version
    }, {
        version: req.body.newVersion
    }, function(err) {
        res.json({
            status: 0,
            msg: 'success'
        })
    });
});

// 获取某版本某平台所有JSON
router.get('/getAllJson', function(req, res, next) {
    jsonconfig.find({
        version: req.query.version,
        platform: req.query.platform
    }, function(err, docs) {
        var json = new Array();
        for(var i in docs) {
            json.push({
                jsonName: docs[i]['jsonName'],
                jsonValue: docs[i]['jsonValue'],
                jsonKey: docs[i]['_id']
            })
        }
        res.json({
            flag: 1,
            msg: 'success',
            data: json
        })
    });
});

// 保存JSON
router.post('/saveJson', function(req, res, next) {
    var json = new jsonconfig({
        version: req.body.version,
        platform: req.body.platform,
        jsonName: req.body.jsonName,
        jsonValue: req.body.jsonValue
    })
    json.save(function(err) {
        res.json({
            flag: 1,
            msg: 'success',
            data: {
                jsonKey: json._id
            }
        })
    })
});

// 删除JSON
router.post('/deleteJson', function(req, res, next) {
    jsonconfig.remove({
        _id: req.body.jsonKey
    }, function(err) {
        res.json({
            status: 0,
            msg: 'success'
        })
    });
});

// 更新JSON
router.post('/updateJson', function(req, res, next) {
    jsonconfig.update({
        _id: req.body.jsonKey
    }, {
        version: req.body.version,
        platform: req.body.platform,
        jsonName: req.body.jsonName,
        jsonValue: req.body.jsonValue
    }, function(err) {
        res.json({
            status: 0,
            msg: 'success'
        })
    });
});

module.exports = router;
