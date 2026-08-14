// 导入 express 模块
const express = require('express')
// 创建 web 服务器
const app = express()

// write your code here...

// 导入 joi
const joi = require('joi')

// 导入 cors
const cors = require('cors')
// 调用 cors 配置中间件
app.use(cors())

// 配置解析表单数据的中间件

// 解析JSON格式的请求体 使用 req.body 获取客户端发送过来的JSON格式的数据
app.use(express.json())
// 解析URL编码的请求体 使用 req.body 获取客户端发送过来的URL编码格式的数据
app.use(express.urlencoded({ extended: true }))

// 全局向客户端响应处理失败的结果函数 res.cc()
app.use(function (req, res, next) {
  // 获取请求到达服务器的时间
  req.startTime = Date.now()
  // 默认将 status 的值设置为 400，方便处理失败的情况
  res.cc = function (err, status = 400, data, token) {
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err,
      // 请求方式
      method: req.method,
      // 请求地址
      url: req.originalUrl,
      // 数据
      data,
      // 头信息
      headers: req.headers,
      // Token
      token,
      // Refresh Token
      refresh_token: crypto.randomUUID(1024).toString('hash'),
      // 时间戳
      Time: req.startTime,
      // 时间
      Date: new Date().toString()
    })
  }
  // 拦截"完全没填"的任何请求
  if (req.body === undefined) req.body = {}
  next()
})

// 解析 Token 字符串
const { expressjwt: jwt } = require('express-jwt')
// 导入配置文件
const { jwt: jwt1 } = require('./config.js')
// 排除哪些接口不需要进行 Token 的身份认证
app.use(jwt({ secret: jwt1.jwtSecretKey, algorithms: ["HS256"], }).unless({ path: [/^\/api\//] }))

// 导入并注册用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)
// 导入并注册用户信息路由模块
const userinfoRouter = require('./router/userinfo')
// 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use('/my', userinfoRouter)
// 导入并注册文章分类路由模块
const artCateRouter = require('./router/artcate')
// 注意：以 /my/article 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use('/my/article', artCateRouter)
// 导入并使用文章路由模块
const articleRouter = require('./router/article')
// 为文章的路由挂载统一的访问前缀 /my/article
app.use('/my/article', articleRouter)

// 全局错误级别中间件，捕获验证失败的错误，并把验证失败的结果响应给客户端
app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 身份认证失败
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  // 未知错误
  res.cc(err)
})

// 启动服务器
app.listen(8088, function () {
  console.log('api server running at http://127.0.0.1:8088')
})
