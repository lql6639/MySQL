// 导入 mysql 模块
const mysql = require('mysql2')

// 导入配置文件
const { mysql: mysql1 } = require('../config.js')

// 创建数据库连接
const db = mysql.createConnection(mysql1)

// 连接到数据库
db.query('SELECT 1', (err, results) => {
  if (err) {
    return console.log('数据库连接失败: ' + err.message)
  }
  console.log('已连接到数据库：' + '连接ID: ' + db.threadId + '，查询结果: ' + JSON.stringify(results))
})

// 关闭数据库连接
// db.end(err => {
//   if (err) {
//     return console.log('关闭数据库连接失败: ' + err.message)
//   }
//   console.log('数据库连接已关闭')
// })

// 将数据库连接对象共享出去
module.exports = db
