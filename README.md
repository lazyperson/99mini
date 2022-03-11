# 99mini 微信小程序

## 基于Taro3.x React + 微信云开发

- 运行前请先修改99minidevelop/project.config.json 和 99miniprogram/project.config.json中的appId
- 请先在 99minidevelop目录下安装依赖，然后 npm run dev:weapp，然后用微信开发工具打开99miniprogram

## 通过Taro脚手架搭建项目

本人用React技术栈较多，用React开发极快，所以本次进行快速开发小程序挑战，就采用了Taro 3.x的开发框架（一套代码支持运行在H5、RN、微信/京东/百度/支付宝/头条/钉钉/企业微信/飞书小程序）。 Taro是京东出品的开源多端解决方案，市场上比较类似的多端解决方案还有uni-app，大家根据个人爱好使用。
Taro 3.x开发文档参考 https://taro-docs.jd.com/taro/docs/

### 快速开始

#### 安装taro cli 脚手架
首先，你需要使用 npm 或者 yarn 全局安装 @tarojs/cli，或者直接使用 npx:
```
# 使用 npm 安装 CLI
$ npm install -g @tarojs/cli

# OR 使用 yarn 安装 CLI
$ yarn global add @tarojs/cli

# OR 安装了 cnpm，使用 cnpm 安装 CLI
$ cnpm install -g @tarojs/cli
```

值得一提的是，如果安装过程出现sass相关的安装错误，请在安装**mirror-config-china**后重试
```
npm install -g mirror-config-china
```
安装成功后，可以用npm info 或 taro -v查看版本信息

```
npm info @tarojs/cli
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/875fa02734f249de9cc8596040752023~tplv-k3u1fbpfcp-watermark.image?)
#### taro 初始化模板项目

```
taro init 99minidevelop
```

然后到  99minidevelop 这个目录下安装依赖即可。

## 微信小程序云开发模板

打开微信开发者工具，创建项目并勾选微信云开发，然后创建项目。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ec669db6c53477cb78501029b554b8f~tplv-k3u1fbpfcp-watermark.image?)
创建完毕的项目，打开后会默认展示云开发的新手教程，不熟悉云开发的童鞋可以自己看看。

点击“云开发”按钮，会打开云开发的后台部分，也就是存储云函数(nodejs server层) 和 数据库 及存储服务（类似oss）
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/74ef3776aacf4477a761822e48279ba0~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba019c5843ac4d42915a809abacd0548~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ef0084400394e2eaa4055170b83d6e9~tplv-k3u1fbpfcp-watermark.image?)

## 更改taro项目配置与微信云开发结合

### 本地的项目结构

```
- 99mini
  |- 99minidevelop    # taro项目开发项目
  |- 99miniprogram    # 微信小程序项目
    |- cloudfunctions # 云函数目录 
    |- miniprogram    # 微信小程序前端
```
### taro开发项目配置更改

1) 修改99minidevelop/config/index.js文件的outputRoot到99miniprogram/miniprogram
2) 根据个人爱好设置alias (目录或文件别名)
3) 配置mini的cssModules  (比较懒的情况下就开启全局cssModules转换，防止css类名重复)
```js
cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'global', // 转换模式，取值为 global/module
          generateScopedName: '[name]_[local]_[hash:base64:2]'
        }
}
```
### 运行启动taro项目
```
npm run dev:weapp
```

## 小程序产品初设

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c2168903a954c2e8adf4be8b305dc77~tplv-k3u1fbpfcp-watermark.image?)

#### 云函数层

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fcb76585872643528121ce001ec2655d~tplv-k3u1fbpfcp-watermark.image?)

#### 数据库设计

#### tags 表
| 字段 | 类型 | 含义 |
| --- | --- |--- |
| `_id` | string| 默认uuid |
| key | string | 有意义的标识 |
| name | string | 技术分类，eg： h5、docker、python |

#### resource 表
| 字段 | 类型 | 含义 |
| --- | --- |--- |
| `_id` | string| 默认uuid |
| create | string | 创建日期 |
| image | string | 资源封面图片url |
| level | string | 资源访问所需的最低用户等级，0免费 |
| name | string | 资源名称 |
| tagId | string | 资源所属技术分类 |

#### links 表
| 字段 | 类型 | 含义 |
| --- | --- |--- |
| `_id` | string| 默认uuid |
| code | string | 网盘提取码 |
| link_url | string | 网盘分享链接 |
| res_id | string | 资源id |


文章教程请访问本人掘金。 

![gh_925af3d90186_430.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29b4e30dd79648f2a78b834dfc2b02ed~tplv-k3u1fbpfcp-watermark.image?)

