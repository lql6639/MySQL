# MySQL

## 1、Homebrew

> 1、验证并安装 Xcode 命令行工具

```shell
xcode-select install
```

> 2、验证路径是否输出 /Library/Developer/CommandLineTools

```shell
xcode-select -p
```

> 3、若路径异常或返回错误，重置为默认路径

```shell
sudo xcode-select --reset
```

> 4、使用国内镜像源一键安装（网络受限场景），按提示选择镜像源

```shell
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```

> 5、安装结束时，终端提示是否执行初始化命令，让配置生效

```shell
source ~/.zprofile
```

> 6、验证安装

```shell
brew --version
```

> 输出 Homebrew 6.0.15 的版本号

```shell
brew doctor
```

> 若输出中无红色警告文字，仅含提示性建议，则表示基础环境就绪

```shell
brew search wget
```

> 若输出中无红色警告文字，仅含提示性建议，则表示基础环境就绪

## 2、MySQL

> 方法1、Mac 安装（Homebrew）

```shell
brew install mysql
```

> 启动 MySQL 服务

```shell
brew services start mysql
```

> 设置 root 密码，移除匿名用户，禁止 root 远程登录等

```shell
mysql_secure_installation
```

> 方法2、使用 MySQL 官方安装包

+ mysql

```url
https://dev.mysql.com/downloads/mysql/
```

> 验证安装

```shell
mysql -u root -p
```

> 输入密码后看到 mysql> 提示符即成功

+ mysql workbench

```url
https://dev.mysql.com/downloads/workbench/
```
