// 导入 mysql 模块
const mysql = require('mysql2')

// 创建数据库连接
const db = mysql.createPool({
  host: '127.0.0.1',      // 数据库的 IP 地址
  user: 'root',           // 登陆数据库的账号
  password: 'admin123',   // 登陆数据库的密码
  database: 'my_db_01' // 操作哪个数据库的名称
})

// 连接到数据库
db.query('SELECT 1', (err, results) => {
  if (err) {
    return console.log('数据库连接失败: ' + err.message)
  }
  console.log('已连接到数据库：' + '连接ID: ' + db.threadId + '，查询结果: ' + JSON.stringify(results))
})

// 关闭数据库连接
db.end(err => {
  if (err) {
    return console.log('关闭数据库连接失败: ' + err.message)
  }
  console.log('数据库连接已关闭')
})
