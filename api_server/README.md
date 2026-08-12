## 1.对密码进行加密处理

+ 1.安装

```shell
pnpm install bcryptjs
```

+ 2.导入 bcryptjs

```js
const bcrypt = require('bcryptjs')
```

+ 3.调用  bcrypt.hashSync(明文密码, 随机盐的长度)方法，对用户的密码进行加密处理

```js
// 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
userinfo.password = bcrypt.hashSync(userinfo.password, 10)
```

## 2.优化表单数据验证

> 详情 <https://www.npmjs.com/package/@escook/express-joi>

+ 1.安装  @escook/express-joi  中间件，来实现自动对表单数据进行验证的功能

```shell
pnpm install @escook/express-joi
```

+ 2.安装  joi  包，为表单中携带的每个数据项，定义验证规则

```shell
pnpm install joi@17.4.0
```
