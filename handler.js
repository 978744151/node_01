// 业务模块,所需要的功能业务
var db = require('./db')
var mongodb = require('mongodb')
const STUDENTS = 'students'
// 常量字符串
const DB_url = 'mongodb://127.0.0.1:27017/sms';
module.exports.index = function (req, res) {
    res.render('index')
}

// students 
module.exports.students = function (req, res) {

    // 封装student
    db.findAll('students', function (err, docs) {
        res.render('students', {
            list: docs
        })
    })
}
// 1、连接对象
// var mc = mongodb.MongoClient;
// // 2、连接字符串
// var url = DB_url;
// // 2.3开始连接
// mc.connect(url,function(err,db){
//     if(err){
//         throw err;
//     }
// db.collection('students').find().toArray(function(err,docs){
//         if(err){
//             throw err;
//         }
//         // 关闭数据
//         db.close();

//         console.log(docs)

module.exports.info = function (req, res) {
    var _id = mongodb.ObjectId(req.query._id);

    db.findOne('students', _id, function (err, doc) {
        //    if(err){
        //        throw err
        //    }
        res.render('info', { item: doc })
    })
    // var mc = mongodb.MongoClient;
    // // 2、连接字符串
    //     var url = DB_url;
    // // 2.3开始连接
    //     mc.connect(url,function(err,db){
    //         if(err){
    //             throw err;
    //             }
    //             db.collection(STUDENTS).findOne({_id:_id},function(err,doc){
    //                 if(err){
    //                     throw err
    //                 }
    //                 db.close();
    //                 console.log(doc)
    //                 res.render('info',{item:doc})
    //             })
    //         })
}
module.exports.showAdd = function (req, res) {

    db.findAll('cities', function (err, data_cities) {
        // console.log(data_cities)
        if (err) {
            throw err
        }


        db.findAll('majors', function (err, data_majors) {
            // console.log(data_majors)
            if (err) {
                throw err
            }

            res.render('add', {
                cities: data_cities,
                majors: data_majors
            })
        })
    })
}
// 提交add
module.exports.submitAdd = function (req, res) {


    //1. 获取对象
    //   console.log(req.body);
    var obj = {
        sno: req.body.sno,
        sname: req.body.sname,
        sgender: req.body.sgender == 'M' ? '男' : '女',
        sbirthday: req.body.sbirthday,
        sphone: req.body.sphone,
        saddr: req.body.saddr,
        smajor: req.body.smajor
    }
    db.insertOne('students',obj,function(err){
        if(err){
            throw err
        }
        res.redirect('/students')
    })
    // var mc = mongodb.MongoClient;
    // //2.2 连接字符串
    // var url = DB_url;
    // //2.3 开始连接
    // mc.connect(url, function (err, db) {
    //     if (err) {
    //         throw err;
    //     }
    //     //2.4 操作
    //     db.collection('students').insertOne(obj, function (err) {
    //         if (err) {
    //             throw err;
    //         }

    //         //2.5 关闭数据库
    //         db.close();
    //         res.redirect('/students')

    //     })
    // })
}
// 显示页面
module.exports.showEdit = function (req, res) {
    db.findAll('cities', function (err, data_cities) {
        // console.log(data_cities)
        if (err) {
            throw err
        }

        db.findAll('majors', function (err, data_majors) {
            // console.log(data_majors)
            if (err) {
                throw err
            }

            // 查询单条数据
            var _id = mongodb.ObjectId(req.query._id);
            console.log(_id)
            db.findOne('students', _id, function (err, doc) {
                if (err) {
                    throw err;
                }
                // 渲染
                res.render('edit', {
                    cities: data_cities,
                    majors: data_majors,
                    item: doc
                })
            })
        })
    })
}
// 更改页面
module.exports.submitEdit=function(req,res){
    // console.log(req.body)
    var  obj = {
        sno: req.body.sno,
        sname:req.body.sname,
        sgender:req.body.sgender == 'M' ? '男' : '女',
        sbirthday:req.body.sbirthday, // {$set:{sbirthday:'123'}}
        sphone:req.body.sphone,
        saddr:req.body.saddr,
        smajor:req.body.smajor
      }
var _id = mongodb.ObjectId(req.body._id)

    db.updateOne('students',_id,obj,function(err){
        if(err){
            throw err
        }
        res.redirect('students')
})
       //1. 连接对象
//   var mc = mongodb.MongoClient;
//   //2. 连接字符串
//   var url = DB_url;
//   //3. 开始连接
//   mc.connect(url,function (err,db) {
//     if (err) {
//       throw err;
//     }   
//     db.collection('students').updateOne({_id:_id},obj,function(err){
//         if(err){
//             throw err
//         }
//         db.close()
//         res.redirect('students')
//     })
// })
}
module.exports.delete=function(req,res){
    var _id = mongodb.ObjectId(req.query._id);
    
    db.deleteOne('students',_id,function(err){
        if(err){
            throw err;
        }
        res.redirect('/students');
    })
}