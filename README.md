### 使用教程

第一步 克隆项目到本地

    git clone https://github.com/noahlam/mpvue-tutorials.git

第二步 安装项目依赖

    // 前提肯定是要进入项目目录啦 cd mpvue-tutorials
    npm i

第三步 启动开发环境，并监控文件改动，实时编译

    npm run dev

第四步 打开你的微信开发者工具，新建一个小程序，项目目录指向`mpvue-tutorials/dist`,就可以看到效果了


第五步 在`src/pages`目录下添加或者改动页面，查看效果
如果是添加页面，需要在 `src/main.js` 里面添加对应的路由

### 发布项目
    npm run build
打包的文件，跟` npm run dev`一样，也是放在`mpvue-tutorials/dist`中，同时，发布的是需要注意以下几点
1. 如果之前有 `npm run dev` 那么在发布之前，请先停止dev。
2. 如果打包之后，控制台有报错，请关闭微信开发者工具的 es6代码转换，代码压缩。
