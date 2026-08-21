// 导入 express
const express = require('express')
// 创建 web 服务器
const app = express()

// 导入 jsonwebtoken express-jwt
const jwt = require('jsonwebtoken')
// const expressJWT = require('express-jwt')
const { expressjwt: expressJWT } = require('express-jwt')

// 允许跨域资源共享
const cors = require('cors')
app.use(cors())

// 解析 post 表单数据的中间件
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

// 定义 secret 密钥
const secret = 'hello kitty ^_^'

// 注册将 JWT 字符串解析还原成 JSON 对象的中间件
// unless 指定哪些接口不需要访问权限
app.use(expressJWT({ secret: secret, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }))

// 托管静态资源文件
app.use(express.static('./public'))
// 解析 POST 提交的表单数据
app.use(express.urlencoded({ extended: false }))

// 登录接口
app.post('/api/login', (req, res) => {
  // 判断用户名和密码是否正确
  const { username, password } = req.body
  if (username !== 'admin' || password !== '888888') {
    return res.send({ status: 1, message: '登录失败' })
  }
  // 登录成功，生成 JWT 字符串
  const tokenStr = jwt.sign({ username }, secret, { expiresIn: '72h' })
  res.send({ status: 0, message: '登录成功', token: 'Bearer ' + tokenStr })
})

// 这是一个有权限的 API 接口
app.get('/admin/getinfo', (req, res) => {
  // 使用 req.auth 获取用户信息，并使用 data 属性将其发送给客户端
  res.send({ status: 0, message: '获取用户信息成功！', data: req.auth })
})

// 错误级别中间件，捕获解析 JWT 失败后产生的错误
app.use((err, req, res, next) => {
  // token 解析失败导致的错误
  if (err.name === 'UnauthorizedError') {
    return res.send({ status: 1, message: '无效的token' })
  }
  res.send({ status: 1, message: '未知的错误' })
})

// 启动服务器
app.listen(80, () => {
  console.log('Server is running on http://127.0.0.1')
})
