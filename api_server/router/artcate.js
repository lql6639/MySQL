// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入文章分类的路由处理函数模块
const artcate_handler = require('../router_handler/artcate')

// 1. 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')

// 2. 导入需要的验证规则对象
const { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema } = require('../schema/artcate')

// 获取文章分类的列表数据
router.get('/cates', artcate_handler.getArticleCates)

// 新增文章分类
router.post('/addcates', expressJoi(add_cate_schema), artcate_handler.addArticleCates)

// 根据 id 删除文章分类
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artcate_handler.deleteCateById)

// 根据 id 获取文章分类的数据
router.get('/cates/:id', expressJoi(get_cate_schema), artcate_handler.getArticleById)

// 根据 id 更新文章分类
router.post('/updatecate', expressJoi(update_cate_schema), artcate_handler.updateCateById)

// 向外共享路由对象
module.exports = router
