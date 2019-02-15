<p align="center"><img width="100" src="https://segmentfault.com/img/bVZwRf?w=516&h=457" /></p>

# React技术栈脚手架

**适用人群：该框架集成了react开发常用技术栈，适用于想要学习单向数据流框架搭建的新手、以及想要一个比较干净、简洁的框架从事前端项目的开发者。**

### 框架集成的配置

> webpack版本为4.26.1，并且对webpack相关的第三方插件进行了兼容处理

> 基于 [create-react-app][4] 进行改造，增加了redux、react-router、immutable等

> 使用react-loadable做异步路由

> babel最新配置

> 使用happypack优化js、css构建，速度明显提升

> UI框架使用的是世界第二大UI框架 antd

#### 客户端渲染

本项目是客户端渲染版本，登录账号 admin ， 密码 12345 

**1、 安装依赖包
```
npm install 或cnpm install 或 yarn
```

**2、运行demo。**
 ```nodemon
 npm start
 ```

**4、打包发布** 

```nodemon
npm run build
```

**5、你可以尝试serve来启动服务器。**

```nodemon
npm run serve
```
