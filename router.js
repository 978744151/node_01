// 1.加载express

var express = require('express');

var handler=require('./handler')

// 2、获取router
var router = express.Router();



// 3、配置路由

router.get('/',handler.index);

router.get('/index',handler.index);

// 学生路径
router.get('/students',handler.students);

// 详情页
router.get('/info',handler.info);

// 添加页面
router.get('/add',handler.showAdd);

// 提交添加数据
router.post('/add',handler.submitAdd);

// 编辑页面
router.get('/edit',handler.showEdit)
// 提交编辑
router.post('/edit',handler.submitEdit)
// 删除

router.get('/delete',handler.delete)

// 4、导出路由

module.exports= router



