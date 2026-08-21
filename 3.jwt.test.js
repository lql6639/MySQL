// 导入 jsonwebtoken
const jwt = require('jsonwebtoken')

// 数据
const data = { name: 'zhangshan', age: 18, gender: '男' }

// 定义 secret 密钥
const secret = 'hello kitty ^_^'

// 生成 token
const token = jwt.sign(data, secret, { expiresIn: '72h' })

// 校验 token
jwt.verify(token, secret, (err, decoded) => {
  if (err) {
    console.log('token 校验失败', err)
  } else {
    console.log('token 校验成功', decoded)
  }
})
