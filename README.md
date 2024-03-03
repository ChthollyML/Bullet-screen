# 使用教程
本项目搭建使用vite+vue3

首先使用需要先安装 node.js 和 npm

## 使用步骤
在程序根目录下执行
```
npm install
npm run dev
```

## 弹幕交互功能
需要在 `Bullet-screen\src\server` 目录下执行终端命令
```
node server.cjs
```
这样启动了一个`nodejs`后端来监听弹幕事件

## 弹幕测试
如果想要加载大量弹幕来演示防遮挡效果
在主页面`Bullet-screen\src\components\HelloWorld.vue`第160行进行调整
