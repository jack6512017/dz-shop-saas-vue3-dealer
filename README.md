# 介绍

该项目是dz-shop-saas-vue3的独立经销商端

官方文档地址 [DZ-Shop文档](https://docs.dazhoutech.cn/)

## 开发技术

本项目需要了解以下前端基础知识：

- [uni-app](https://www.dcloud.io/) 
- [vue3](https://cn.vuejs.org/)
- [pinia2](https://pinia.web3doc.top/)
- [vite4](http://www.vitejs.net/)
- [TypeScript](https://www.tslang.cn/)

完全基于 vue3 SFC  写法,不支持 vue2

## 客户端支持

完全支持
| H5 | 安卓 APP | IOS APP | 微信公众号 | 微信小程序
| --------- | --------- | --------- | --------- | --------- | 

同时也支持以下小程序，但是由于不是太过于主流，并未对登录授权、支付等做深度集成；且并未完成完整测试
| 支付宝小程序 | 字节跳动小程序 | QQ小程序 | 360小程序 | 快手小程序 | 飞书小程序 | 钉钉小程序 | 京东小程序
| --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | 

## 获取客户端代码

前往 [授权&下载中心](https://open.dazhoutech.cn/) 下载后台代码。

## 目录结构

```txt
├─ src
│   ├─ api                       接口
│   ├─ assets                    静态资源
│   ├─ components                组件
│   ├─ core
│   │   ├─ config                客户端配置
│   │   └─ utils                 核心功能类
│   ├─ enums                     枚举
│   ├─ hooks                     钩子
│   ├─ pages                     页面
│   ├─ settings                  设置
│   ├─ state                     状态管理
│   ├─ static                    静态文件
│   ├─ types                     类型文件
│   ├─ utils                     工具类
│   ├─ App.vue                   系统入口
│   ├─ main.ts                   入口类
│   ├─ manifest.json             uni-app配置
│   ├─ pages.json                页面配置
│   └─ uni.scss                  全局样式
├─ .env
├─ .env.development              开发环境配置
├─ .env.production               生产环境配置
├─ .eslintignore
├─ .eslintrc.js
├─ .gitignore
├─ .prettierignore
├─ .prettierrc.js
├─ favicon.ico
├─ index.html
├─ package.json
├─ README.md
├─ tsconfig.json
├─ unocss.config.js
└─ vite.config.ts
```

## 开发工具

### CLI模式

推荐使用[vscode](https://code.visualstudio.com/)，并安装以下工具来提高开发效率：

- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) - vue 开发必备
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - 脚本代码检查
- [JavaScript (ES6) code snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets) - ES6语法智能提示
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - 代码格式化
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) - css 格式化
- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv) - .env 文件 高亮

### IDE模式

使用[HbuilderX](https://www.dcloud.io/hbuilderx.html)，根据需要安装插件。


## 开发环境

本地环境需要安装 Node.js、pnpm。

### 安装Node.js

获取[Node.js](https://nodejs.org/en/)并安装。

安装完以后可以执行以下代码验证：

``` bash
# 出现相应npm版本即可
npm -v
# 出现相应node版本即可
node -v
```

如果你需要同时存在多个 node 版本，可以使用 [Nvm](https://github.com/nvm-sh/nvm) 或者其他工具进行 Node.js 进行版本管理。

### 安装pnmp

``` bash
# 全局安装pnpm
npm install -g pnpm
# 验证
pnpm -v # 出现对应版本号即代表安装成功
```

## 安装依赖

在项目根目录下，打开命令窗口，或者在VsCode项目终端下执行以下命令：

``` bash
# 安装依赖，耐心等待执行完成
pnpm i
```

## 运行项目

使用HbuilderX开发可直接运行或打包各端。

CLI模式开发可打开命令窗口，或者在VsCode项目终端下执行以下命令：

``` bash
pnpm dev:h5         #运行H5
pnpm build:h5       #打包H5
```

其它运行或打包命令在 package.json 中查看。
