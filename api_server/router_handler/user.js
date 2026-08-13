/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */

// 导入数据库操作模块
const db = require('../db')

// 加密
const bcrypt = require('bcryptjs')

// 生成 Token 字符串
const jwt = require('jsonwebtoken')
// 导入配置文件
const config = require('../config.js')

// 注册用户的处理函数
exports.regUser = (req, res) => {
  // 接收表单数据
  const userinfo = req.body

  // 通过schema判断数据是否合法

  // 定义 SQL 语句
  const sql = `select * from ev_users where username=?`

  // 执行 SQL 语句，查询用户名是否被占用
  db.query(sql, [userinfo.username], function (err, results) {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 用户名被占用
    if (results.length > 0) return res.cc('用户名被占用，请更换其它用户名！')

    // TODO: 用户名可用，继续后续流程...

    // 对密码进行加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 12)

    // 定义插入用户的 SQL 语句
    const sql = 'insert into ev_users set ?'

    // 要插入到数据库的用户信息对象
    const user = { username: userinfo.username, password: userinfo.password }

    // 执行 SQL 语句，插入新用户
    db.query(sql, user, function (err, results) {
      // 执行 SQL 语句失败
      if (err) return res.cc(err)
      // SQL 语句执行成功，但影响行数不为 1
      if (results.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试！')

      // 注册成功
      res.cc('注册成功！', 200, results, null)
    })
  })
}

// 登录的处理函数
exports.login = (req, res) => {
  // 接收表单数据
  const userinfo = req.body

  // 通过schema判断数据是否合法

  // 定义 SQL 语句
  const sql = `select * from ev_users where username=?`

  // 执行 SQL 语句，查询用户名是否存在
  db.query(sql, [userinfo.username], function (err, results) {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 执行 SQL 语句成功，但是查询到数据条数不等于 1
    if (results.length !== 1) return res.cc('用户名不存在，请注册！')

    // 用户被禁用
    if (results[0].status !== 0) return res.cc('用户被禁用！', 403)

    // TODO：判断用户输入的登录密码是否和数据库中的密码一致

    // 拿着用户输入的密码,和数据库中存储的密码进行对比
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)

    // 如果对比的结果等于 false, 则证明用户输入的密码错误
    if (!compareResult) return res.cc('密码错误！')

    // TODO：登录成功，生成 Token 字符串

    // 生成 Token 字符串时，一定要剔除 密码
    const user = { ...results[0], password: '' }

    // 生成 Token 字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })

    // 登陆成功
    res.cc('登陆成功！', 200, results[0], 'Bearer ' + tokenStr)
  })
}
