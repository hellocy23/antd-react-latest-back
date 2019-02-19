<p align="center"><img width="100" src="https://segmentfault.com/img/bVZwRf?w=516&h=457" /></p>

# React技术栈脚手架

**适用范围：这是一套中后台前端解决方案，该框架集成了react开发常用技术栈，并借鉴了antd-admin的框架代码和布局UI（[https://github.com/zuiidea/antd-admin](https://github.com/zuiidea/antd-admin)），但并未采用蚂蚁金服的umi前端框架，保持框架的灵活度。**

### 框架集成的配置

> webpack版本为4.26.1，并且对webpack相关的第三方插件进行了兼容处理

> 基于 [create-react-app][4] 进行改造，增加了redux、react-router、immutable等

> 使用react-loadable做异步路由

> babel最新配置

> 使用happypack优化js、css构建，速度明显提升

> UI框架使用的是antd design

> 使用mock.js本地调试接口

#### 客户端渲染

本项目是客户端渲染版本，登录账号 admin， 密码 12345

**1、 安装依赖包**
```
npm install 或cnpm install 或 yarn install
```

**2、运行demo**
 ```
 npm start
 ```

**3、打包发布** 

```
npm run build
```

**4、打包依赖关系分析** 

```
npm run analyze
```

**5、打开mock本地接口调试（需全局安装nodemon，自动重启）** 

```
npm run mock
```

**6、你可以尝试serve来启动服务器。**

```
npm run serve
```

**文件夹介绍**

目录结构：
```
├── config                  #webpack自定义配置
├── dist/                   # 默认build输出目录
├── mock                    #mock本地接口调试
├── public/                 # 静态资源文件目录
├── scripts/                # webpack启动文件
├── src/                    # 源码目录
│ ├── components/           # 组件目录
│ ├── layouts/              # 布局目录
│ ├── pages/                # 页面组件目录
│ ├── routes/               # 路由目录
│ ├── services/             # 数据接口目录
│ │ ├── api.js              # 接口配置
│ │ └── index.js            # 接口输出
│ ├── store/                # redux状态管理目录
│ │ ├── action/             # redux的控制中心，任何一个状态state的更新操作都需要dispatch一个action去修改
│ │ └── reducers            # redux的数据管理中心
│ ├── themes/               # 项目样式目录
│ │ ├── default.less        # 样式变量
│ │ ├── index.less          # 全局样式
│ │ ├── mixin.less          # 样式函数
│ │ └── vars.less           # 样式变量及函数
│ ├── utils/                # 工具函数目录
│ │ ├── config.js           # 项目配置
│ │ ├── constant.js         # 静态常量
│ │ ├── flexible.js         # 屏幕适配
│ │ ├── index.js            # 工具函数
│ │ ├── request.js          # 异步请求函数(axios)
│ │ └── theme.js            # 项目需要在js中使用到样式变量
│ ├── app.js                # 顶层组件
│ ├── app.less              # 全局样式
│ ├── index.less            # react入口文件
├── .babelrc                # babel配置文件
├── .gitignore              # Git忽略文件配置
├── .travis.yml             # Travis配置
├── postcss.config.js       # css配置文件
├── package.json            #node相关环境的配置文件
```

#### 修改前端本地服务器端口号

在scripts/start.js中
```
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3011;
```

#### 开启代理服务器

在config/webpackDevServer.config.js中
```
//你可以修改target，使其指向你的目标服务器。
app.use(
    '/api/v1/*',
    proxyUrl({
        target: 'http://localhost:3000',
        secure: false
    })
)
```