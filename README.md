# emi
[umi](https://github.com/umijs/umi/) + [electron]()

## 描述
  集成umi + electron 
 ## 使用
 ```
 #安装依赖
 npm install 

 # 安装app目录依赖
 cd app
 npm install

 #本地运行(启动前端项目和主进程)
 cd ../
 npm start
 npm run electron

 #打包
 npm run pack
 ```
 
 ### 如何在 renderer 端引用 electron、node 原生模块、以及 app 里的依赖？

 直接 import 就好，已处理 externals。

 ## 参考
 https://github.com/umijs/umi-example-electron

 https://github.com/electron/electron-quick-start

 https://github.com/zhangshuaidan/umi-electron
