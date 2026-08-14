exports.mysql = {
  // 数据库的 IP 地址
  host: '127.0.0.1',
  // 登陆数据库的账号
  user: 'root',
  // 登陆数据库的密码
  password: 'admin123',
  // 操作哪个数据库的名称
  database: 'my_db_01'
}

exports.jwt = {
  // 加密、解密 Token 的密钥
  jwtSecretKey: 'hello kitty ^_^',
  // 有效期
  expiresIn: '8h'
}
