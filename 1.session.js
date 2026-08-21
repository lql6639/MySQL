// 导入 express
const express = require('express')
// 创建 web 服务器
const app = express()

const path = require('path')

// 导入 session
const session = require('express-session')

const MySQLStore = require('express-mysql-session')(session)

const options = {
  host: '127.0.0.1',    // 数据库的 IP 地址
  user: 'root',         // 登陆数据库的账号
  password: 'admin123', // 登陆数据库的密码
  database: 'session'   // 操作哪个数据库的名称
}

const sessionStore = new MySQLStore(options)

// 配置 session 中间件
app.use(session({
  name: 'sid',             // 设置 cookie 中保存 sid 的字段名称
  secret: 'hello kitty',   // 对 session id 相关的 cookie 进行签名
  resave: false,           // 是否每次请求都重新保存 session
  saveUninitialized: true, // 是否在存储内容之前创建一个 session
  store: sessionStore,     // 设置存储 Session 的位置
  cookie: {
    httpOnly: true,             // 防止客户端脚本通过 document.cookie 获取到 cookie
    maxAge: 1000 * 60 * 60 * 24 // 设置 cookie 的过期时间（ 24小时 ）
  }
}))

// 托管静态资源文件
app.use(express.static('./public'))
// 解析 POST 提交的表单数据
app.use(express.urlencoded({ extended: false }))

app.post('/api/login', (req, res) => {
  // 判断用户名和密码是否正确
  if (req.body.username !== 'admin' || req.body.password !== '888888') {
    return res.send({ status: 1, message: '登录失败' })
  }
  // 登录成功，保存登录状态
  req.session.user = req.body   // 将用户信息储存到 Session 中
  req.session.islogin = true    // 将用户的登录状态储存到 Session 中

  res.send({ status: 0, message: '登录成功' })
})

app.get('/api/username', (req, res) => {
  // 判断用户的登录状态
  if (!req.session.islogin) {
    return res.send({ status: 1, message: 'fail' })
  }
  // 用户已登录，获取用户信息
  res.send({ status: 0, message: 'success', username: req.session.user.username })
})

app.post('/api/logout', (req, res) => {
  // 清除登录状态
  req.session.destroy() // 销毁 Session 中的所有数据
  res.send({ status: 0, message: 'logout success' })
})

// 404 处理
app.use((_req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public/404.html'))
})

// 启动服务器
app.listen(80, () => {
  console.log('Server is running on http://127.0.0.1')
})
