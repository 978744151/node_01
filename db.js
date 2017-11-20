var mongodb = require('mongodb');
var config = require('./config');
const DB_url = 'mongodb://127.0.0.1:27017/sms';
// 查询全部

module.exports.findAll = function (collection, callback) {
    // 1、连接对象
    var mc = mongodb.MongoClient;
    // 2、连接字符串
    var url = DB_url;
    // 2.3开始连接
    mc.connect(url, function (err, db) {
        if (err) {
            throw err;
        }
        db.collection(collection).find().toArray(function (err, docs) {
            // if(err){
            //     throw err;
            // }
            // 关闭数据
            db.close();
            callback(err, docs)

        })
    })
}

// 封装单个查询
module.exports.findOne = function (collection, _id, callback) {

    var mc = mongodb.MongoClient;
    // 2、连接字符串
    var url = DB_url;
    // 2.3开始连接
    mc.connect(url, function (err, db) {
        if (err) {
            throw err;
        }
        db.collection(collection).findOne({ _id: _id }, function (err, doc) {
            // if(err){
            //     throw err
            // }
            db.close();
            callback(err, doc)
        })
    })
}
module.exports.insertOne = function (collection, obj, callback) {


    //1. 获取对象
    //   console.log(req.body);

    var mc = mongodb.MongoClient;
    //2.2 连接字符串
    var url = DB_url;
    //2.3 开始连接
    mc.connect(url, function (err, db) {
        if (err) {
            throw err;
        }
        //2.4 操作
        db.collection(collection).insertOne(obj, function (err) {
            if (err) {
                throw err;
            }

            //2.5 关闭数据库
            db.close();
            callback()
        })
    })
}
module.exports.updateOne=function (collection,_id,obj,callback){
    // console.log(req.body)
 
     
       //1. 连接对象
  var mc = mongodb.MongoClient;
  //2. 连接字符串
  var url = DB_url;
  //3. 开始连接
  mc.connect(url,function (err,db) {
    if (err) {
      throw err;
    }   
    db.collection(collection).updateOne({_id:_id},obj,function(err){
        if(err){
            throw err
        }
        db.close()
        callback()
    })
})
}
module.exports.deleteOne=function(collection,_id,callback){
    var mc = mongodb.MongoClient;
    //2. 连接字符串
    var url = DB_url;
    //3. 开始连接
    mc.connect(url,function (err,db) {
      if (err) {
        throw err;
      }   
    db.collection(collection).deleteOne({_id:_id},function(err){
        if(err){
            throw err;
        }
        db.close()
        callback()
    })
})
}